from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.ml_service import MLService
from app.models.models import Module, Rating
from app.extensions import db
from sqlalchemy import func, desc
recommendations_bp = Blueprint('recommendations', __name__)
ml_service = MLService()
@recommendations_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_recommendations():
    try:
        student_id = get_jwt_identity()
        n_recommendations = request.args.get('n', default=5, type=int)
        recommendations = ml_service.get_recommendations(
            student_id=int(student_id),
            n_recommendations=n_recommendations
        )
        return jsonify({
            'recommendations': recommendations,
            'count': len(recommendations)
        }), 200
    except Exception as e:
        print(f"Error getting recommendations: {e}")
        return jsonify({'error': str(e)}), 500
@recommendations_bp.route('/similar/<int:module_id>', methods=['GET'], strict_slashes=False)
def get_similar_modules(module_id):
    try:
        n_recommendations = request.args.get('n', default=5, type=int)
        if hasattr(ml_service, 'get_similar_modules'):
            similar_modules = ml_service.get_similar_modules(
                module_id,
                n_recommendations=n_recommendations
            )
        else:
            target_module = Module.query.get(module_id)
            if not target_module:
                return jsonify({'error': 'Module not found'}), 404    
            modules = Module.query.filter(
                Module.specialite == target_module.specialite,
                Module.module_id != module_id
            ).limit(n_recommendations).all()
            similar_modules = [m.to_dict() for m in modules]
        return jsonify({
            'similar_modules': similar_modules,
            'count': len(similar_modules)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@recommendations_bp.route('/personalized', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_personalized_recommendations():
    try:
        student_id = get_jwt_identity()
        filters = {
            'field': request.args.get('field'),
            'level': request.args.get('level')
        }
        base_recs = ml_service.get_recommendations(student_id=int(student_id))
        filtered = []
        for rec in base_recs:
            if filters['field'] and filters['field'] not in rec.get('specialite', ''):
                continue
            if filters['level'] and filters['level'] not in rec.get('niveau', ''):
                continue
            filtered.append(rec)
        return jsonify({
            'recommendations': filtered if (filters['field'] or filters['level']) else base_recs,
            'count': len(filtered)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@recommendations_bp.route('/popular', methods=['GET'], strict_slashes=False)
def get_popular_modules():
    try:
        results = db.session.query(
            Module,
            func.count(Rating.id).label('rating_count'),
            func.avg(Rating.rating).label('avg_rating')
        ).join(Rating)\
         .group_by(Module.module_id)\
         .order_by(desc('rating_count'))\
         .limit(10)\
         .all()
        modules_with_ratings = []
        for module, count, avg in results:
            mod_dict = module.to_dict()
            mod_dict['average_rating'] = round(avg, 1) if avg else 0
            mod_dict['rating_count'] = count
            modules_with_ratings.append(mod_dict)
        return jsonify({
            'popular_modules': modules_with_ratings
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500