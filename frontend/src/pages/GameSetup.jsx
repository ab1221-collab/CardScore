import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPlayers, createGame } from '../api';
import PlayerSelect from '../components/PlayerSelect';

const GAME_TYPES = [
  { value: 'five_crowns', label: 'Five Crowns', needsTarget: false },
  { value: '500_rum', label: '500 Rum', needsTarget: true },
  { value: 'gin_rummy', label: 'Gin Rummy', needsTarget: true },
];

export default function GameSetup() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [gameType, setGameType] = useState('five_crowns');
  const [targetScore, setTargetScore] = useState(500);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const selectedGameType = GAME_TYPES.find(g => g.value === gameType);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (err) {
      setError('Failed to load players');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerAdded = (player) => {
    setPlayers([...players, player]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPlayerIds.length < 2) {
      setError('Select at least 2 players');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const target = selectedGameType.needsTarget ? targetScore : null;
      const game = await createGame(gameType, selectedPlayerIds, target);
      navigate(`/game/${game.id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading players...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 pb-8">
      <div className="max-w-lg mx-auto">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center p-2 -ml-2 text-gray-500 min-h-[44px] min-w-[44px] mb-4"
        >
          ← Home
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🃏 New Game
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-5 space-y-6">
          {/* Game Type Selection */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">
              Game Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {GAME_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setGameType(type.value)}
                  className={`py-4 px-4 rounded-xl text-base font-medium transition-colors min-h-[56px] ${
                    gameType === type.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target Score (conditional) */}
          {selectedGameType.needsTarget && (
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Target Score
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={targetScore}
                onChange={(e) => setTargetScore(parseInt(e.target.value) || 500)}
                min="100"
                step="50"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[48px]"
              />
              <p className="text-base text-gray-500 mt-2">
                First player to reach this score wins
              </p>
            </div>
          )}

          {/* Player Selection */}
          <PlayerSelect
            players={players}
            selectedIds={selectedPlayerIds}
            onChange={setSelectedPlayerIds}
            onPlayerAdded={handlePlayerAdded}
          />

          {/* Error message */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-base">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting || selectedPlayerIds.length < 2}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium text-lg min-h-[56px] active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Starting Game...' : 'Start Game'}
          </button>
        </form>
      </div>
    </div>
  );
}
