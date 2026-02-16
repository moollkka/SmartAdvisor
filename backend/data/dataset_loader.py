import pandas as pd
import os
from config import Config

class DatasetLoader:
    def __init__(self):
        print(f"Chargement des données depuis: {Config.DATA_DIR}")
    def load_students(self):
        """Charge les données des étudiants"""
        try:
            print(f"Chargement étudiants depuis: {Config.STUDENTS_DATA_PATH}")
            if not os.path.exists(Config.STUDENTS_DATA_PATH):
                print(f"ERREUR: Fichier non trouvé: {Config.STUDENTS_DATA_PATH}")
                return pd.DataFrame()
            df = pd.read_csv(Config.STUDENTS_DATA_PATH)
            print(f"Étudiants chargés: {len(df)} lignes, colonnes: {list(df.columns)}")
            if 'etudiant_id' in df.columns:
                df = df.rename(columns={'etudiant_id': 'id_etudiant'})
            if 'specialite' in df.columns:
                df = df.rename(columns={'specialite': 'specialisation'})
            if 'moyenne' in df.columns:
                df = df.rename(columns={'moyenne': 'moyenne_generale'})
            return df
        except Exception as e:
            print(f"Erreur chargement étudiants: {e}")
            return pd.DataFrame()

    def load_modules(self):
        """Charge les données des modules"""
        try:
            print(f"Chargement modules depuis: {Config.MODULES_DATA_PATH}")
            if not os.path.exists(Config.MODULES_DATA_PATH):
                print(f"ERREUR: Fichier non trouvé: {Config.MODULES_DATA_PATH}")
                return pd.DataFrame()
            df = pd.read_csv(Config.MODULES_DATA_PATH)
            print(f"Modules chargés: {len(df)} lignes, colonnes: {list(df.columns)}")
            if 'module_id' in df.columns:
                df = df.rename(columns={'module_id': 'id_module'})
            if 'title' in df.columns:
                df = df.rename(columns={'title': 'nom_module'})
            if 'type' in df.columns:
                df = df.rename(columns={'type': 'type_module'})
            return df
        except Exception as e:
            print(f"Erreur chargement modules: {e}")
            return pd.DataFrame()
    def load_ratings(self):
        """Charge les évaluations"""
        try:
            print(f"Chargement évaluations depuis: {Config.RATINGS_DATA_PATH}")
            if not os.path.exists(Config.RATINGS_DATA_PATH):
                print(f"ERREUR: Fichier non trouvé: {Config.RATINGS_DATA_PATH}")
                return pd.DataFrame()
            df = pd.read_csv(Config.RATINGS_DATA_PATH)
            print(f"Évaluations chargées: {len(df)} lignes, colonnes: {list(df.columns)}")
            if 'etudiant_id' in df.columns:
                df = df.rename(columns={'etudiant_id': 'id_etudiant'})
            if 'module_id' in df.columns:
                df = df.rename(columns={'module_id': 'id_module'})
            if 'rating' in df.columns:
                df = df.rename(columns={'rating': 'note'})    
            return df
        except Exception as e:
            print(f"Erreur chargement évaluations: {e}")
            return pd.DataFrame()
    def load_all_data(self):
        """Charge toutes les données"""
        students = self.load_students()
        modules = self.load_modules()
        ratings = self.load_ratings()
        return students, modules, ratings
    def validate_data(self):
        """Valide l'intégrité des données"""
        students, modules, ratings = self.load_all_data()
        print("\nVALIDATION DES DONNÉES:")
        print(f"  Étudiants: {len(students)}")
        print(f"  Modules: {len(modules)}")
        print(f"  Évaluations: {len(ratings)}")
        if len(students) == 0:
            print("Aucun étudiant trouvé")
        if len(modules) == 0:
            print("Aucun module trouvé")
        if len(ratings) == 0:
            print("Aucune évaluation trouvé")
        return len(students) > 0 and len(modules) > 0