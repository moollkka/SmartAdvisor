import os
from app import create_app
config_name = os.getenv('FLASK_CONFIG') or 'default'
app = create_app()
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Serveur fonctionnant sur le port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)