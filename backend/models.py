from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    game_players = db.relationship('GamePlayer', back_populates='player', lazy='dynamic')
    scores = db.relationship('Score', back_populates='player', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.isoformat()
        }


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    game_type = db.Column(db.String(50), nullable=False)  # five_crowns, 500_rum, gin_rummy
    target_score = db.Column(db.Integer, nullable=True)  # Used for Rummy/Gin only
    going_out_bonus = db.Column(db.Integer, nullable=True)  # Bonus points for going out (500 Rum)
    is_active = db.Column(db.Boolean, default=True)
    date_played = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    game_players = db.relationship('GamePlayer', back_populates='game', lazy='dynamic')
    scores = db.relationship('Score', back_populates='game', lazy='dynamic')

    def to_dict(self, include_players=False, include_scores=False):
        data = {
            'id': self.id,
            'game_type': self.game_type,
            'target_score': self.target_score,
            'going_out_bonus': self.going_out_bonus,
            'is_active': self.is_active,
            'date_played': self.date_played.isoformat()
        }
        if include_players:
            data['players'] = [gp.player.to_dict() for gp in self.game_players.order_by(GamePlayer.seat_order)]
        if include_scores:
            data['scores'] = [s.to_dict() for s in self.scores]
        return data


class GamePlayer(db.Model):
    """Association table mapping players to a specific game instance."""
    __tablename__ = 'game_players'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False)
    seat_order = db.Column(db.Integer, default=0)  # 0-5 for turn order

    # Relationships
    game = db.relationship('Game', back_populates='game_players')
    player = db.relationship('Player', back_populates='game_players')

    __table_args__ = (
        db.UniqueConstraint('game_id', 'player_id', name='unique_game_player'),
    )


class Score(db.Model):
    __tablename__ = 'scores'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False)
    round_number = db.Column(db.Integer, nullable=False)
    points = db.Column(db.Integer, nullable=False)
    went_out = db.Column(db.Boolean, default=False)

    # Relationships
    game = db.relationship('Game', back_populates='scores')
    player = db.relationship('Player', back_populates='scores')

    __table_args__ = (
        db.UniqueConstraint('game_id', 'player_id', 'round_number', name='unique_round_score'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'player_id': self.player_id,
            'round_number': self.round_number,
            'points': self.points,
            'went_out': self.went_out
        }
