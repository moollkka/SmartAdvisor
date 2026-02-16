from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db
from app.models.models import Student
import re

auth_bp = Blueprint('auth', __name__)

def validate_email(email):
    """Valide le format de l'email"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        required_fields = ['email', 'password', 'nom', 'prenom']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Le champ {field} est requis'}), 400
        if not validate_email(data['email']):
            return jsonify({'error': 'Format d\'email invalide'}), 400
        existing_student = Student.query.filter_by(email=data['email']).first()
        if existing_student:
            return jsonify({'error': 'Un utilisateur avec cet email existe déjà'}), 409
        student = Student(
            email=data['email'],
            nom=data['nom'],
            prenom=data['prenom'],
            age=data.get('age'),
            specialite=data.get('specialite', 'Informatique'),
            niveau=data.get('niveau', 'L3'),
            moyenne=data.get('moyenne', 0),
            preferences=data.get('preferences', '')
        )
        student.set_password(data['password'])
        db.session.add(student)
        db.session.commit()
        access_token = create_access_token(identity=str(student.etudiant_id))
        return jsonify({
            'message': 'Inscription réussie',
            'token': access_token,
            'user': student.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if 'email' not in data or 'password' not in data:
            return jsonify({'error': 'Email et mot de passe requis'}), 400
        print(f"\n=== Login Attempt ===")
        print(f"Email: {data['email']}")
        student = Student.query.filter_by(email=data['email']).first()
        if not student:
            print("User not found in database")
            return jsonify({'error': 'Identifiants incorrects'}), 401
        print(f"User found - ID: {student.etudiant_id}, Email: {student.email}")
        print(f"Stored password hash: {student.password_hash}")
        print(f"Password check result: {student.check_password(data['password'])}")
        if not student.check_password(data['password']):
            print("Password verification failed")
            return jsonify({'error': 'Identifiants incorrects'}), 401
        print("Login successful")
        access_token = create_access_token(identity=str(student.etudiant_id))
        return jsonify({
            'message': 'Connexion réussie',
            'token': access_token,
            'user': student.to_dict()
        }), 200  
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        student_id = get_jwt_identity()
        student = Student.query.get(student_id)
        if not student:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404
        return jsonify({'user': student.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': 'Déconnexion réussie'}), 200
@auth_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200