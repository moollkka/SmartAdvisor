from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import or_
from app.extensions import db
from app.models.models import Module, Rating, History
modules_bp = Blueprint('modules', __name__)
@modules_bp.route('/', methods=['GET'])
def get_modules():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        search = request.args.get('q', '')
        query = Module.query
        if search:
            query = query.filter(
                or_(
                    Module.title.ilike(f'%{search}%'),
                    Module.code.ilike(f'%{search}%'),
                    Module.description.ilike(f'%{search}%')
                )
            )     
        modules = query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'modules': [m.to_dict() for m in modules.items],
            'total': modules.total,
            'pages': modules.pages,
            'current_page': modules.page
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@modules_bp.route('/<int:module_id>', methods=['GET'])
def get_module(module_id):
    try:
        module = Module.query.get_or_404(module_id)
        return jsonify(module.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@modules_bp.route('/rate', methods=['POST'])
@jwt_required()
def rate_module():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        module_id = data.get('module_id')
        rating_value = data.get('rating')
        comment = data.get('comment', '')
        
        if not module_id or not rating_value:
            return jsonify({'error': 'Missing module_id or rating'}), 400
        existing_rating = Rating.query.filter_by(
            etudiant_id=current_user_id, 
            module_id=module_id
        ).first()
        if existing_rating:
            existing_rating.rating = rating_value
            existing_rating.comment = comment
            message = "Rating updated"
        else:
            new_rating = Rating(
                etudiant_id=current_user_id,
                module_id=module_id,
                rating=rating_value,
                comment=comment
            )
            db.session.add(new_rating)
            message = "Rating added"
        db.session.commit()
        return jsonify({'message': message}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error rating module: {e}")
        return jsonify({'error': str(e)}), 500
@modules_bp.route('/<int:module_id>/ratings', methods=['GET'])
def get_module_ratings(module_id):
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        ratings = Rating.query.filter_by(module_id=module_id)\
            .order_by(Rating.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'ratings': [rating.to_dict() for rating in ratings.items],
            'total': ratings.total,
            'pages': ratings.pages,
            'current_page': ratings.page
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@modules_bp.route('/fields', methods=['GET'])
def get_fields():
    try:
        fields = db.session.query(Module.field).distinct().all()
        fields = [field[0] for field in fields if field[0]]
        
        return jsonify({
            'fields': fields
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@modules_bp.route('/levels', methods=['GET'])
def get_levels():
    try:
        levels = db.session.query(Module.level).distinct().all()
        levels = [level[0] for level in levels if level[0]]
        return jsonify({
            'levels': levels
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500