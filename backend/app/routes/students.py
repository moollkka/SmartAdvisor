from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.models import Student, Rating, History
from app.extensions import db
students_bp = Blueprint('students', __name__)
@students_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        student_id = get_jwt_identity()
        student = Student.query.get(student_id)
        if not student:
            return jsonify({'error': 'etudiant est absent'}), 404
        return jsonify(student.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@students_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        student_id = get_jwt_identity()
        student = Student.query.get(student_id)
        if not student:
            return jsonify({'error': 'etudiant est absent'}), 404  
        data = request.get_json()
        if 'specialite' in data:
            student.specialite = data['specialite']
        if 'moyenne' in data:
            try:
                student.moyenne = float(data['moyenne'])
            except:
                pass 
        if 'age' in data:
            try:
                student.age = int(data['age'])
            except:
                pass
        db.session.commit()
        
        return jsonify({
            'message': 'Profil mis à jour avec succès',
            'user': student.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        print(f"Erreur de mise à jour du profil: {e}")
        return jsonify({'error': str(e)}), 500
@students_bp.route('/ratings', methods=['GET'])
@jwt_required()
def get_student_ratings():
    try:
        student_id = get_jwt_identity()
        ratings = Rating.query.filter_by(etudiant_id=student_id).all()
        return jsonify({
            'ratings': [rating.to_dict() for rating in ratings]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@students_bp.route('/history', methods=['GET'])
@jwt_required()
def get_student_history():
    try:
        student_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        history = History.query.filter_by(etudiant_id=student_id)\
            .order_by(History.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'history': [h.to_dict() for h in history.items],
            'total': history.total,
            'pages': history.pages,
            'current_page': history.page
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500