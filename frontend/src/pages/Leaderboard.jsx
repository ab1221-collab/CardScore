import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLeaderboard } from '../api';

export default function Leaderboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setStats(data);
    } catch (err) {
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
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
          🏆 Leaderboard
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {stats.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">No completed games yet.</p>
            <Link
              to="/new"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium min-h-[44px]"
            >
              Start a Game
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {stats.map((player, index) => (
              <div
                key={player.player_id}
                className={`flex items-center p-4 ${
                  index !== stats.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Rank */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-300 text-orange-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {index + 1}
                </div>

                {/* Name and stats */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {player.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {player.games_played} game{player.games_played !== 1 ? 's' : ''} played
                  </p>
                </div>

                {/* Win stats */}
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-gray-800">
                    {player.wins}W - {player.losses}L
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    {player.win_rate}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
