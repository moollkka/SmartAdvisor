
"""
Script de configuration pour SmartAdvisor
"""
import os
import sys

print("Configuration de SmartAdvisor...")
folders = ['data', 'models', 'app/services', 'app/routes']
for folder in folders:
    os.makedirs(folder, exist_ok=True)
    print(f"Dossier créé: {folder}")
requirements = """Flask==2.3.3
Flask-CORS==4.0.0
Flask-SQLAlchemy==3.0.5
Flask-JWT-Extended==4.5.2
pandas==2.0.3
numpy==1.24.3
scikit-learn==1.3.0
python-dotenv==1.0.0
Werkzeug==2.3.7
joblib==1.3.2
"""

with open('requirements.txt', 'w', encoding='utf-8') as f:
    f.write(requirements)
print("requirements.txt créé")
run_py = """from app import create_app
app = create_app()
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
"""
with open('run.py', 'w', encoding='utf-8') as f:
    f.write(run_py)
print("run.py créé")
print("\nConfiguration terminée!")
print("\nProchaines étapes:")
print("1. pip install -r requirements.txt")
print("2. python setup_data.py")
print("3. python run.py")