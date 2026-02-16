from app import create_app, db
from app.models.models import Module, Student, Rating
from werkzeug.security import generate_password_hash
import random
app = create_app()
def seed():
    with app.app_context():
        print("Nettoyage forcé de la base de données (suppression de toutes les tables)...")
        db.drop_all()
        db.create_all()
        print("Tables recréées.")

        print("Injection de nouvelles données...")
        modules_data = [
            {"code": "INF101", "title": "Introduction à l'Informatique", "spec": "Informatique", "lvl": "L1"},
            {"code": "INF102", "title": "Algorithmique", "spec": "Informatique", "lvl": "L1"},
            {"code": "MATH101", "title": "Analyse 1", "spec": "Mathématiques", "lvl": "L1"},
            {"code": "PHY101", "title": "Mécanique", "spec": "Physique", "lvl": "L1"},
            {"code": "INF201", "title": "Bases de Données", "spec": "Informatique", "lvl": "L2"},
            {"code": "INF202", "title": "Systèmes d'Exploitation", "spec": "Informatique", "lvl": "L2"},
            {"code": "INF301", "title": "Intelligence Artificielle", "spec": "Informatique", "lvl": "L3"},
            {"code": "INF302", "title": "Développement Web", "spec": "Informatique", "lvl": "L3"},
            {"code": "MATH201", "title": "Probabilités", "spec": "Mathématiques", "lvl": "L2"},
            {"code": "ECO101", "title": "Macroéconomie", "spec": "Économie", "lvl": "L1"},
        ]
        for m in modules_data:
            new_mod = Module(
                code=m['code'],
                title=m['title'],
                description=f"Cours de {m['title']}",
                specialite=m['spec'],
                niveau=m['lvl'],
                credits=random.randint(3, 6),
                difficulty='Moyen'
            )
            db.session.add(new_mod)
        db.session.commit()
        print(f"Ajouter {len(modules_data)} modules.")
        for i in range(10):
            s = Student(
                email=f"student{i}@test.com",
                password_hash=generate_password_hash("password"),
                nom=f"Nom{i}", 
                prenom=f"Prenom{i}",
                specialite="Informatique",
                moyenne=random.uniform(10, 18),
                age=20
            )
            db.session.add(s)
        db.session.commit()
        print("Ajout de faux etduiant. ")
        students = Student.query.all()
        modules = Module.query.all()

        count = 0
        for s in students:
            for _ in range(4):
                r = Rating(
                    etudiant_id=s.etudiant_id, 
                    module_id=random.choice(modules).module_id, 
                    rating=random.randint(3,5)
                )
                db.session.add(r)
                count += 1
        db.session.commit()
        
        print(f"Ajout {count} évaluations.")
        print("Base de données initialisée avec succès !")

if __name__ == '__main__':
    seed()