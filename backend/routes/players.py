from flask import Blueprint, request, jsonify
from models import db, Player

players_bp = Blueprint('players', __name__)


@players_bp.route('/players', methods=['GET'])
def get_players():
    """List all players."""
    players = Player.query.order_by(Player.name).all()
    return jsonify([p.to_dict() for p in players])


@players_bp.route('/players', methods=['POST'])
def create_player():
    """Create a new player profile."""
    data = request.get_json()

    if not data or 'name' not in data:
        return jsonify({'error': 'Name is required'}), 400

    name = data['name'].strip()
    if not name:
        return jsonify({'error': 'Name cannot be empty'}), 400

    # Check for duplicate
    existing = Player.query.filter(Player.name.ilike(name)).first()
    if existing:
        return jsonify({'error': 'Player with this name already exists'}), 409

    player = Player(name=name)
    db.session.add(player)
    db.session.commit()

    return jsonify(player.to_dict()), 201


@players_bp.route('/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    """Get a single player by ID."""
    player = Player.query.get_or_404(player_id)
    return jsonify(player.to_dict())


@players_bp.route('/players/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    """Delete a player (only if they have no game history)."""
    player = Player.query.get_or_404(player_id)

    # Check if player has any games
    if player.game_players.count() > 0:
        return jsonify({'error': 'Cannot delete player with game history'}), 400

    db.session.delete(player)
    db.session.commit()

    return jsonify({'message': 'Player deleted'}), 200
