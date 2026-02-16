import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

print("Initialisation du backend SmartAdvisor...")
print("=" * 50)
print("1. Création de la base de données...")
try:
    from app import create_app, db
    app = create_app()
    with app.app_context():
        db.create_all()
        print("Base de données créée avec succès")
        from sqlalchemy import inspect
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
        print(f"Tables disponibles: {', '.join(tables)}")
except Exception as e:
    print(f"Erreur création base de données: {e}")
    sys.exit(1)
print("\n2. Vérification des fichiers CSV...")
data_dir = os.path.join(os.path.dirname(__file__), 'data')
csv_files = ['etudiants.csv', 'modules.csv', 'ratings.csv']
for file in csv_files:
    file_path = os.path.join(data_dir, file)
    if os.path.exists(file_path):
        print(f"{file} trouvé")
        try:
            import pandas as pd
            df = pd.read_csv(file_path)
            print(f"Lignes: {len(df)}, Colonnes: {list(df.columns)}")
        except:
            print(f"Aperçu non disponible")
    else:
        print(f"{file} non trouvé")
print("\n3. Initialisation du modèle ML...")
try:
    from app.services.ml_service import MLService
    service = MLService()
    print("Service ML initialisé")
    recommendations = service.get_recommendations(1, 3)
    if recommendations:
        print(f"Test recommandations: {len(recommendations)} recommandations générées")
        for rec in recommendations[:2]:
            print(f"- {rec['code']}: {rec['title']} ({rec['predicted_rating']}/5)")
    else:
        print("Aucunerecommandation générée")
except Exception as e:
    print(f"Erreur initialisation ML: {e}")
print("\n4. Test de l'API...")
print("   Pour tester l'API:")
print("   - Lancez le serveur: python run.py")
print("   - Accédez à: http://localhost:5000/api/auth/health")
print("   - Endpoints disponibles:")
print("     * POST   /api/auth/register")
print("     * POST   /api/auth/login")
print("     * GET    /api/auth/me (protégé)")
print("     * GET    /api/recommendations (protégé)")
print("     * GET    /api/modules")
print("\n" + "=" * 50)
print("Initialisation terminée avec succès!")
print("\nPour démarrer le serveur:")
print("   python run.py")
print("\nPour le frontend:")
print("   cd ../frontend")
print("   npm install")
print("   npm start")