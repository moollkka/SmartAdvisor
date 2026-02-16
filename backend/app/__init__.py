from flask import Flask
from flask_cors import CORS
from app.extensions import db, jwt
import os
# Note: MLService is imported inside the route/service when needed to avoid circular imports
# from app.services.ml_service import MLService 

def create_app(config_class=None):
    """Factory function to create Flask app"""
    app = Flask(__name__)

    # 1. Load Configuration properly
    if config_class:
        app.config.from_object(config_class)
    else:
        # Fallback to default if no config provided
        from config import config
        app.config.from_object(config['default'])

    # 2. Initialize Extensions
    # Allow CORS from env or default specific ports
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
    
    db.init_app(app)
    jwt.init_app(app)

    # 3. Register Blueprints
    from app.routes.auth import auth_bp
    from app.routes.students import students_bp
    from app.routes.modules import modules_bp
    from app.routes.recommendations import recommendations_bp
    from app.routes.history import history_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(students_bp, url_prefix='/api/students')
    app.register_blueprint(modules_bp, url_prefix='/api/modules')
    app.register_blueprint(recommendations_bp, url_prefix='/api/recommendations')
    app.register_blueprint(history_bp, url_prefix='/api/history')

    # 4. Create tables (Simple check)
    with app.app_context():
        # Only create if logic dictates (usually handled by migrations in prod)
        db.create_all()

    return app