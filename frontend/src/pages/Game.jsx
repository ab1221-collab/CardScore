import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGame, submitScore } from '../api';
import ScoreTable from '../components/ScoreTable';
import ScoreInput from '../components/ScoreInput';

const GAME_TYPE_LABELS = {
  five_crowns: 'Five Crowns',
  '500_rum': '500 Rum',
  gin_rummy: 'Gin Rummy',
};

export default function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadGame();
  }, [id]);

  const loadGame = async () => {
    try {
      const data = await getGame(id);
      setGame(data);
      setError('');
    } catch (err) {
      setError('Failed to load game');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitScore = async (round, scores) => {
    try {
      const updatedGame = await submitScore(id, round, scores);
      setGame(updatedGame);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  if (error && !game) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-base">{error}</p>
          <Link to="/" className="text-blue-600 text-base min-h-[44px] inline-flex items-center">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const { game_type, is_active, players, current_round, wild_card, cards_dealt, target_score, totals } = game;

  // Determine winner for completed games
  let winner = null;
  if (!is_active && players.length > 0) {
    if (game_type === 'five_crowns') {
      // Lowest score wins
      winner = players.reduce((min, p) => 
        (totals[p.id] || 0) < (totals[min.id] || 0) ? p : min
      , players[0]);
    } else {
      // Highest score wins
      winner = players.reduce((max, p) => 
        (totals[p.id] || 0) > (totals[max.id] || 0) ? p : max
      , players[0]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="p-2 -ml-2 text-gray-500 min-h-[44px] min-w-[44px] flex items-center">
            ← Home
          </Link>
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            is_active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {is_active ? 'In Progress' : 'Completed'}
          </span>
        </div>

        {/* Game Info Card */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            {GAME_TYPE_LABELS[game_type]}
          </h1>
          
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {game_type === 'five_crowns' && is_active && (
              <>
                <span className="flex items-center gap-1">
                  Round <strong className="ml-1">{current_round}</strong>/11
                </span>
                <span className="flex items-center gap-1">
                  Wild: <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded font-semibold">{wild_card}s</span>
                </span>
                <span className="flex items-center gap-1">
                  Cards: <strong className="ml-1">{cards_dealt}</strong>
                </span>
              </>
            )}
            {target_score && (
              <span className="flex items-center gap-1">
                Target: <strong className="ml-1">{target_score}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Winner Banner */}
        {!is_active && winner && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-5 mb-4 text-center">
            <p className="text-yellow-900 text-sm font-medium mb-1">🏆 Winner</p>
            <p className="text-2xl font-bold text-white">{winner.name}</p>
            <p className="text-yellow-100 mt-1 text-lg">
              {totals[winner.id]} points
            </p>
          </div>
        )}

        {/* Score Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <ScoreTable game={game} />
        </div>

        {/* Score Input (only for active games) */}
        {is_active && (
          <ScoreInput
            players={players}
            currentRound={current_round}
            onSubmit={handleSubmitScore}
            disabled={false}
          />
        )}

        {/* Error message */}
        {error && (
          <div className="mt-4 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-base">
            {error}
          </div>
        )}

        {/* New Game button for completed games */}
        {!is_active && (
          <div className="mt-6">
            <Link
              to="/new"
              className="block w-full py-4 bg-blue-600 text-white rounded-xl font-medium text-lg text-center min-h-[56px] flex items-center justify-center active:bg-blue-700 transition-colors"
            >
              Start New Game
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
