from app.extensions import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
class Student(db.Model):
    __tablename__ = 'students'
    etudiant_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    nom = db.Column(db.String(50))
    prenom = db.Column(db.String(50))
    age = db.Column(db.Integer)
    specialite = db.Column(db.String(100))
    niveau = db.Column(db.String(50))
    moyenne = db.Column(db.Float)
    preferences = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    ratings = db.relationship('Rating', backref='student', lazy=True)
    history = db.relationship('History', backref='student', lazy=True)
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    def to_dict(self):
        return {
            'etudiant_id': self.etudiant_id,
            'email': self.email,
            'nom': self.nom,
            'prenom': self.prenom,
            'age': self.age,
            'specialite': self.specialite,
            'niveau': self.niveau,
            'moyenne': self.moyenne,
            'preferences': self.preferences
        }
class Module(db.Model):
    __tablename__ = 'modules'
    module_id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20))
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    specialite = db.Column(db.String(100))
    niveau = db.Column(db.String(50))
    credits = db.Column(db.Integer)
    difficulty = db.Column(db.String(20))
    type = db.Column(db.String(20))
    prerequis = db.Column(db.Text)
    ratings = db.relationship('Rating', backref='module', lazy=True)
    def to_dict(self):
        return {
            'module_id': self.module_id,
            'code': self.code,
            'title': self.title,
            'description': self.description,
            'specialite': self.specialite,
            'niveau': self.niveau,
            'credits': self.credits,
            'difficulty': self.difficulty,
            'type': self.type,
            'prerequis': self.prerequis
        }
class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    etudiant_id = db.Column(db.Integer, db.ForeignKey('students.etudiant_id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.module_id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    def to_dict(self):
        return {
            'id': self.id,
            'etudiant_id': self.etudiant_id,
            'module_id': self.module_id,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
class History(db.Model):
    __tablename__ = 'history'
    id = db.Column(db.Integer, primary_key=True)
    etudiant_id = db.Column(db.Integer, db.ForeignKey('students.etudiant_id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.module_id'), nullable=False)
    action = db.Column(db.String(50)) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    def to_dict(self):
        return {
            'id': self.id,
            'etudiant_id': self.etudiant_id,
            'module_id': self.module_id,
            'action': self.action,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }