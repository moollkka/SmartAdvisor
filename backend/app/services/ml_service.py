import os
import traceback
from datetime import datetime
from flask import current_app
from app.extensions import db
from app.models.models import Student, Module, Rating
from sqlalchemy import text

# Try to import ML libraries, or fall back to Lite mode
try:
    import pandas as pd
    import numpy as np
    from sklearn.neighbors import NearestNeighbors
    from sklearn.preprocessing import StandardScaler
    import joblib
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False
    print("Warning: ML libraries not found. Running in Lite Mode (no ML features).")

class MLService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MLService, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            self.models_dir = os.path.join(self.base_dir, 'models')
            self.model_path = os.path.join(self.models_dir, 'knn_model.joblib')
            os.makedirs(self.models_dir, exist_ok=True)
            self.model = None
            self.scaler = None
            self.features = None
            self.initialized = True
            
            if ML_AVAILABLE:
                self.scaler = StandardScaler()

    def load_data_from_db(self):
        if not ML_AVAILABLE:
            return None, None, None
        try:
            if not current_app:
                return None, None, None
            with db.engine.connect() as connection:
                students_df = pd.read_sql(text("SELECT * FROM students"), connection)
                ratings_df = pd.read_sql(text("SELECT * FROM ratings"), connection)
                modules_df = pd.read_sql(text("SELECT * FROM modules"), connection)
            return students_df, ratings_df, modules_df
        except Exception as e:
            print(f"Erreur de chargement de la base de données: {e}")
            return None, None, None

    def prepare_features(self, students_df):
        if not ML_AVAILABLE or students_df is None or students_df.empty:
            return None            
        df = students_df.copy()
        numeric_features = []
        if 'age' in df.columns:
            df['age'] = pd.to_numeric(df['age'], errors='coerce').fillna(20)
            numeric_features.append('age')
        if 'moyenne' in df.columns:
            df['moyenne'] = pd.to_numeric(df['moyenne'], errors='coerce').fillna(10)
            numeric_features.append('moyenne')
        features = df[numeric_features]
        if 'specialite' in df.columns:
            specialties = pd.get_dummies(df['specialite'], prefix='spec')
            specialties = specialties.fillna(0)
            features = pd.concat([features, specialties], axis=1)
        if 'etudiant_id' in df.columns:
            features.index = df['etudiant_id']
        features.columns = features.columns.astype(str)
        return features

    def train_model(self):
        if not ML_AVAILABLE:
            print("Mode Lite activé : Pas d'entraînement ML.")
            return False
            
        if not current_app:
            return False
        print("Entraînement du modèle ML...")
        students_df, ratings_df, modules_df = self.load_data_from_db()
        if students_df is None or len(students_df) < 2:
            print("Données insuffisantes pour entraîner le modèle.")
            return False
        features = self.prepare_features(students_df)
        self.features = features
        features_scaled = self.scaler.fit_transform(features)
        n_neighbors = min(len(features), 5)
        self.model = NearestNeighbors(n_neighbors=n_neighbors, metric='cosine', algorithm='brute')
        self.model.fit(features_scaled)
        try:
            joblib.dump({
                'model': self.model,
                'scaler': self.scaler,
                'features': features,
                'timestamp': datetime.now()
            }, self.model_path)
            print("Modèle entraîné et enregistré avec succès.")
        except Exception as e:
            print(f"Impossible d'enregistrer le modèle sur le disque (problème d'autorisations ?): {e}")
        return True

    def _ensure_model_loaded(self):
        if not ML_AVAILABLE:
            return

        if self.model is None:
            if os.path.exists(self.model_path):
                try:
                    data = joblib.load(self.model_path)
                    self.model = data['model']
                    self.scaler = data['scaler']
                    self.features = data['features']
                    if not all(isinstance(x, str) for x in self.features.columns):
                        print("Fichier de modèle corrompu détecté (types de colonnes mixtes). Réentraînement en cours...")
                        raise ValueError("Modèle corrompu")
                except Exception as e:
                    print(f"Échec du chargement du modèle({e}). Recyclage...")
                    self.train_model()
            else:
                self.train_model()

    def get_recommendations(self, student_id, n_recommendations=5):
        # Always use fallback if ML is not available
        if not ML_AVAILABLE:
            return self._get_fallback_recommendations(n_recommendations)

        self._ensure_model_loaded()
            
        if self.model is None or self.features is None:
            return self._get_fallback_recommendations(n_recommendations)
        if student_id not in self.features.index:
            return self._get_fallback_recommendations(n_recommendations)   
        try:
            student_features = self.features.loc[[student_id]] 
            scaled_features = self.scaler.transform(student_features)
            distances, indices = self.model.kneighbors(scaled_features)
            similar_student_ids = self.features.iloc[indices[0]].index.tolist()
            if student_id in similar_student_ids:
                similar_student_ids.remove(student_id)
            
            if not similar_student_ids:
                return self._get_fallback_recommendations(n_recommendations)
            recommendations = db.session.query(
                Module, 
                db.func.avg(Rating.rating).label('avg_rating')
            ).join(Rating).filter(
                Rating.etudiant_id.in_(similar_student_ids),
                Rating.rating >= 3,
                Module.module_id.notin_(
                    db.session.query(Rating.module_id).filter_by(etudiant_id=student_id)
                )
            ).group_by(Module.module_id)\
             .order_by(db.desc('avg_rating'))\
             .limit(n_recommendations).all()
            if not recommendations:
                return self._get_fallback_recommendations(n_recommendations)
            return [{
                'module_id': m.Module.module_id,
                'title': m.Module.title,
                'code': m.Module.code,
                'note_prédite': round(m.avg_rating, 2),
                'match_reason': 'Basé sur des étudiants similaires'
            } for m in recommendations]  
        except Exception as e:
            print(f"Erreur lors de l'exécution de get_recommendations : {e}")
            return self._get_fallback_recommendations(n_recommendations)

    def _get_fallback_recommendations(self, n_recommendations):
        print("Using fallback recommendations (SQL only).")
        try:
            popular = db.session.query(
                Module, 
                db.func.avg(Rating.rating).label('avg_rating')
            ).join(Rating)\
             .group_by(Module.module_id)\
             .order_by(db.desc('avg_rating'))\
             .limit(n_recommendations).all()
            if popular:
                return [{
                    'module_id': m.Module.module_id,
                    'title': m.Module.title,
                    'code': m.Module.code,
                    'note_prédite': round(m.avg_rating, 2),
                    'match_reason': 'Populaire auprès des étudiants'
                } for m in popular]
            
            print("Aucune évaluation trouvée. Retour de modules aléatoires.")
            random_modules = Module.query.limit(n_recommendations).all()
            return [{
                'module_id': m.module_id,
                'title': m.title,
                'code': m.code,
                'note_prédite': 0,
                'match_reason': 'Nouveau cours'
            } for m in random_modules]
        except Exception as e:
            print(f"Error in fallback recommendations: {e}")
            return []