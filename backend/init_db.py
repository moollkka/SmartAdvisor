import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app import create_app, db
app = create_app()
with app.app_context():
    db.create_all()
    print("Base de données créée avec succès!")
    from sqlalchemy import inspect
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    print(f"Tables créées: {tables}")