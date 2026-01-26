import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../api';

const GAME_TYPE_LABELS = {
  five_crowns: 'Five Crowns',
  '500_rum': '500 Rum',
  gin_rummy: 'Gin Rummy',
};

const GAME_TYPE_EMOJI = {
  five_crowns: '👑',
  '500_rum': '5️⃣',
  gin_rummy: '🃏',
};

export default function History() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const data = await getGames();
      setGames(data);
    } catch (err) {
      setError('Failed to load game history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/" 
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700 min-h-[44px] min-w-[44px] flex items-center"
          >
            ← Home
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📜 Game History
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {games.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">No games played yet.</p>
            <Link
              to="/new"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium min-h-[44px]"
            >
              Start a Game
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {games.map((game) => (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="block bg-white rounded-xl shadow-md p-4 active:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Game type and status */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">
                        {GAME_TYPE_EMOJI[game.game_type]}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {GAME_TYPE_LABELS[game.game_type]}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        game.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {game.is_active ? 'Active' : 'Done'}
                      </span>
                    </div>

                    {/* Players */}
                    <p className="text-sm text-gray-600 truncate">
                      {game.players.map(p => p.name).join(', ')}
                    </p>
                  </div>

                  {/* Date and arrow */}
                  <div className="text-right ml-4 flex items-center">
                    <span className="text-sm text-gray-400">
                      {formatDate(game.date_played)}
                    </span>
                    <span className="ml-2 text-gray-400">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* New game button at bottom */}
        <div className="mt-6">
          <Link
            to="/new"
            className="block w-full py-4 bg-blue-600 text-white rounded-xl font-medium text-center min-h-[56px] flex items-center justify-center active:bg-blue-700 transition-colors"
          >
            + New Game
          </Link>
        </div>
      </div>
    </div>
  );
}
