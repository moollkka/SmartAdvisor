import csv
import os
from app import create_app
from app.models.models import db, Student
from werkzeug.security import generate_password_hash
app = create_app()
def import_students():
    with app.app_context():
        csv_path = os.path.join(os.path.dirname(__file__), 'data', 'etudiants.csv')
        with open(csv_path, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                student = Student.query.filter_by(email=row['email']).first()
                if not student:
                    student = Student(
                        email=row['email'],
                        nom=row['nom'],
                        prenom=row['prenom'],
                        age=int(row['age']) if row['age'] else None,
                        specialite=row['specialite'],
                        preferences=row['preferences'],
                        moyenne=float(row['moyenne']) if row['moyenne'] else 0.0,
                        password_hash=generate_password_hash(row['password'])
                    )
                    db.session.add(student)
                    print(f"Ajouter etudiants: {student.email}")
        
        db.session.commit()
        print("Tous les étudiants ont été importés avec succès.!")

if __name__ == '__main__':
    import_students()
