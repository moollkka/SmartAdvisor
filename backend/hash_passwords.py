from app import create_app
from app.models.models import db, Student
from werkzeug.security import generate_password_hash
app = create_app()
with app.app_context():
    students = Student.query.all()
    for student in students:
        if student.password_hash and not student.password_hash.startswith('pbkdf2:'):
            student.password_hash = generate_password_hash(student.password_hash)
    db.session.commit()
    print("Tous les mots de passe ont été hachés avec succès.")