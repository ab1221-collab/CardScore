import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv

from models import db

load_dotenv()

migrate = Migrate()


def create_app():
    app = Flask(__name__)

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'DATABASE_URL',
        'sqlite:///cardscore.db'
    )
    # Handle Heroku/Railway postgres:// vs postgresql://
    if app.config['SQLALCHEMY_DATABASE_URI'].startswith('postgres://'):
        app.config['SQLALCHEMY_DATABASE_URI'] = app.config['SQLALCHEMY_DATABASE_URI'].replace(
            'postgres://', 'postgresql://', 1
        )
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Register blueprints
    from routes.players import players_bp
    from routes.games import games_bp

    app.register_blueprint(players_bp, url_prefix='/api')
    app.register_blueprint(games_bp, url_prefix='/api')

    # Health check endpoint
    @app.route('/api/health')
    def health():
        return {'status': 'ok'}

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
