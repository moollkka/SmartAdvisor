import pandas as pd
import os
from config import Config
class DatasetLoader:
    def __init__(self):
        print(f"Loading data from: {Config.DATA_DIR}")
    def load_students(self):
        try:
            print(f"Loading students from: {Config.STUDENTS_DATA_PATH}")
            if not os.path.exists(Config.STUDENTS_DATA_PATH):
                print(f"ERROR: File not found: {Config.STUDENTS_DATA_PATH}")
                return pd.DataFrame(columns=['etudiant_id', 'prenom', 'nom', 'age', 'specialite', 'preferences', 'moyenne', 'email', 'password'])
            df = pd.read_csv(Config.STUDENTS_DATA_PATH)
            print(f"Loaded {len(df)} students with columns: {df.columns.tolist()}")
            return df
        except Exception as e:
            print(f"Erreur chargement etudiants: {e}")
            return pd.DataFrame()
    def load_modules(self):
        try:
            print(f"Loading modules from: {Config.MODULES_DATA_PATH}")
            if not os.path.exists(Config.MODULES_DATA_PATH):
                print(f"ERROR: File not found: {Config.MODULES_DATA_PATH}")
                return pd.DataFrame(columns=['module_id', 'title', 'type'])
            df = pd.read_csv(Config.MODULES_DATA_PATH)
            print(f"Loaded {len(df)} modules with columns: {df.columns.tolist()}")
            return df
        except Exception as e:
            print(f"Erreur chargement modules: {e}")
            return pd.DataFrame()
    def load_ratings(self):
        try:
            print(f"Loading ratings from: {Config.RATINGS_DATA_PATH}")
            if not os.path.exists(Config.RATINGS_DATA_PATH):
                print(f"ERROR: File not found: {Config.RATINGS_DATA_PATH}")
                return pd.DataFrame(columns=['etudiant_id', 'module_id', 'rating'])
            df = pd.read_csv(Config.RATINGS_DATA_PATH)
            print(f"Loaded {len(df)} ratings with columns: {df.columns.tolist()}")
            return df
        except Exception as e:
            print(f"Erreur chargement evaluations: {e}")
            return pd.DataFrame()