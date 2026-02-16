from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.models import History
history_bp = Blueprint('history', __name__)
@history_bp.route('/', methods=['GET'])
@jwt_required()
def get_history():
    try:
        student_id = get_jwt_identity()
        action = request.args.get('action')
        days = request.args.get('days', type=int)
        query = History.query.filter_by(student_id=student_id)
        if action:
            query = query.filter(History.action == action)
        if days:
            from datetime import datetime, timedelta
            date_threshold = datetime.utcnow() - timedelta(days=days)
            query = query.filter(History.created_at >= date_threshold)
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        history = query.order_by(History.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'history': [h.to_dict() for h in history.items],
            'total': history.total,
            'pages': history.pages,
            'current_page': history.page
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@history_bp.route('/recent', methods=['GET'])
@jwt_required()
def get_recent_history():
    try:
        student_id = get_jwt_identity()
        from datetime import datetime, timedelta
        date_threshold = datetime.utcnow() - timedelta(days=7)
        recent_history = History.query.filter_by(student_id=student_id)\
            .filter(History.created_at >= date_threshold)\
            .order_by(History.created_at.desc())\
            .limit(10)\
            .all()
        return jsonify({
            'recent_history': [h.to_dict() for h in recent_history]
        }), 200        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@history_bp.route('/<int:history_id>', methods=['DELETE'])
@jwt_required()
def delete_history_item(history_id):
    try:
        student_id = get_jwt_identity()
        history_item = History.query.filter_by(
            id=history_id,
            student_id=student_id
        ).first()
        if not history_item:
            return jsonify({'error': 'History item not found'}), 404
        db.session.delete(history_item)
        db.session.commit()
        return jsonify({
            'message': 'History item deleted successfully'
        }), 200        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
@history_bp.route('/clear', methods=['DELETE'])
@jwt_required()
def clear_history():
    try:
        student_id = get_jwt_identity()
        deleted_count = History.query.filter_by(student_id=student_id).delete()
        db.session.commit()
        return jsonify({
            'message': f'Cleared {deleted_count} history items'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500