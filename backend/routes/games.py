from flask import Blueprint, request, jsonify
from sqlalchemy import func
from models import db, Game, GamePlayer, Score, Player

games_bp = Blueprint('games', __name__)

# Valid game types
GAME_TYPES = ['five_crowns', '500_rum', 'gin_rummy']
FIVE_CROWNS_ROUNDS = 11


def get_wild_card(round_num):
    """Get the wild card for a Five Crowns round.
    Round 1 (3 cards) -> Round 11 (13 cards)
    """
    cards = round_num + 2
    if cards <= 10:
        return str(cards)
    mapping = {11: 'Jack', 12: 'Queen', 13: 'King'}
    return mapping.get(cards, 'Unknown')


def check_game_over(game):
    """
    Check if a game should end based on its rules.
    Returns True if game is over, False otherwise.
    
    Five Crowns: Game ends after Round 11
    500 Rum / Gin Rummy: Game ends when any player reaches target_score
    """
    if game.game_type == 'five_crowns':
        # Check if round 11 scores have been submitted
        max_round = db.session.query(func.max(Score.round_number)).filter(
            Score.game_id == game.id
        ).scalar()
        return max_round is not None and max_round >= FIVE_CROWNS_ROUNDS

    elif game.game_type in ['500_rum', 'gin_rummy']:
        if not game.target_score:
            return False
        
        # Get total scores for each player
        totals = db.session.query(
            Score.player_id,
            func.sum(Score.points).label('total')
        ).filter(
            Score.game_id == game.id
        ).group_by(Score.player_id).all()

        # Check if any player has reached the target
        for player_id, total in totals:
            if total >= game.target_score:
                return True

    return False


def get_game_state(game):
    """Get the full state of a game including players, scores, and totals."""
    # Get players in seat order
    game_players = GamePlayer.query.filter_by(game_id=game.id).order_by(GamePlayer.seat_order).all()
    players = [{'id': gp.player.id, 'name': gp.player.name, 'seat_order': gp.seat_order} 
               for gp in game_players]

    # Get all scores organized by round
    scores = Score.query.filter_by(game_id=game.id).order_by(Score.round_number).all()
    
    # Organize scores by round
    rounds = {}
    for score in scores:
        if score.round_number not in rounds:
            rounds[score.round_number] = {}
        rounds[score.round_number][score.player_id] = score.points

    # Calculate totals
    totals = {}
    for gp in game_players:
        totals[gp.player_id] = sum(
            s.points for s in scores if s.player_id == gp.player_id
        )

    # Determine current round
    current_round = max(rounds.keys()) + 1 if rounds else 1

    # Build response
    response = {
        'id': game.id,
        'game_type': game.game_type,
        'target_score': game.target_score,
        'is_active': game.is_active,
        'date_played': game.date_played.isoformat(),
        'players': players,
        'rounds': rounds,
        'totals': totals,
        'current_round': current_round
    }

    # Add wild card info for Five Crowns
    if game.game_type == 'five_crowns' and game.is_active:
        response['wild_card'] = get_wild_card(current_round)
        response['cards_dealt'] = current_round + 2

    return response


@games_bp.route('/games', methods=['POST'])
def create_game():
    """Initialize a new game."""
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Request body is required'}), 400

    game_type = data.get('game_type')
    if game_type not in GAME_TYPES:
        return jsonify({'error': f'Invalid game_type. Must be one of: {GAME_TYPES}'}), 400

    player_ids = data.get('player_ids', [])
    if len(player_ids) < 2 or len(player_ids) > 6:
        return jsonify({'error': 'Must have 2-6 players'}), 400

    # Verify all players exist
    players = Player.query.filter(Player.id.in_(player_ids)).all()
    if len(players) != len(player_ids):
        return jsonify({'error': 'One or more invalid player IDs'}), 400

    # Get target score for Rummy games
    target_score = None
    if game_type in ['500_rum', 'gin_rummy']:
        target_score = data.get('target_score', 500)

    # Create game
    game = Game(game_type=game_type, target_score=target_score)
    db.session.add(game)
    db.session.flush()  # Get the game ID

    # Add players to game
    for idx, pid in enumerate(player_ids):
        gp = GamePlayer(game_id=game.id, player_id=pid, seat_order=idx)
        db.session.add(gp)

    db.session.commit()

    return jsonify(get_game_state(game)), 201


@games_bp.route('/games/<int:game_id>', methods=['GET'])
def get_game(game_id):
    """Get full game state (players, current scores, active status)."""
    game = Game.query.get_or_404(game_id)
    return jsonify(get_game_state(game))


@games_bp.route('/games/<int:game_id>/score', methods=['POST'])
def submit_score(game_id):
    """
    Submit round scores.
    Body: { "round": 1, "scores": { "1": 10, "2": 0 } }
    """
    game = Game.query.get_or_404(game_id)

    if not game.is_active:
        return jsonify({'error': 'Game is already finished'}), 400

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required'}), 400

    round_number = data.get('round')
    scores_data = data.get('scores', {})

    if round_number is None:
        return jsonify({'error': 'Round number is required'}), 400

    # Get all players in this game
    game_player_ids = [gp.player_id for gp in GamePlayer.query.filter_by(game_id=game_id).all()]

    # Validate all players have scores
    submitted_ids = set(int(pid) for pid in scores_data.keys())
    if set(game_player_ids) != submitted_ids:
        return jsonify({'error': 'Must submit scores for all players in the game'}), 400

    # Check for duplicate round submission
    existing = Score.query.filter_by(game_id=game_id, round_number=round_number).first()
    if existing:
        return jsonify({'error': f'Scores for round {round_number} already submitted'}), 400

    # Five Crowns: validate round number
    if game.game_type == 'five_crowns':
        if round_number < 1 or round_number > FIVE_CROWNS_ROUNDS:
            return jsonify({'error': f'Five Crowns rounds must be 1-{FIVE_CROWNS_ROUNDS}'}), 400

    # Add scores
    for player_id, points in scores_data.items():
        score = Score(
            game_id=game_id,
            player_id=int(player_id),
            round_number=round_number,
            points=int(points)
        )
        db.session.add(score)

    # Check if game is over
    db.session.flush()
    if check_game_over(game):
        game.is_active = False

    db.session.commit()

    return jsonify(get_game_state(game))


@games_bp.route('/games', methods=['GET'])
def list_games():
    """List all games, optionally filtered by active status."""
    active_only = request.args.get('active', '').lower() == 'true'
    
    query = Game.query.order_by(Game.date_played.desc())
    if active_only:
        query = query.filter_by(is_active=True)
    
    games = query.limit(50).all()
    return jsonify([g.to_dict(include_players=True) for g in games])


@games_bp.route('/stats/leaderboard', methods=['GET'])
def leaderboard():
    """
    Returns calculated wins/losses per player.
    Wins are calculated dynamically - not stored.
    """
    # Get all completed games
    completed_games = Game.query.filter_by(is_active=False).all()

    # Track wins and games played per player
    stats = {}

    for game in completed_games:
        # Get all player totals for this game
        totals = db.session.query(
            Score.player_id,
            func.sum(Score.points).label('total')
        ).filter(
            Score.game_id == game.id
        ).group_by(Score.player_id).all()

        if not totals:
            continue

        # Determine winner based on game type
        if game.game_type == 'five_crowns':
            # Lowest score wins
            winner_id = min(totals, key=lambda x: x[1])[0]
        else:
            # Highest score wins (500 Rum, Gin Rummy)
            winner_id = max(totals, key=lambda x: x[1])[0]

        # Update stats
        for player_id, total in totals:
            if player_id not in stats:
                stats[player_id] = {'wins': 0, 'games_played': 0}
            stats[player_id]['games_played'] += 1
            if player_id == winner_id:
                stats[player_id]['wins'] += 1

    # Build response with player names
    result = []
    for player_id, data in stats.items():
        player = Player.query.get(player_id)
        if player:
            result.append({
                'player_id': player_id,
                'name': player.name,
                'wins': data['wins'],
                'losses': data['games_played'] - data['wins'],
                'games_played': data['games_played'],
                'win_rate': round(data['wins'] / data['games_played'] * 100, 1) if data['games_played'] > 0 else 0
            })

    # Sort by wins descending
    result.sort(key=lambda x: (-x['wins'], -x['win_rate']))

    return jsonify(result)
