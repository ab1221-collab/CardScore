import { useState } from 'react';
import { createPlayer } from '../api';

export default function PlayerSelect({ players, selectedIds, onChange, onPlayerAdded }) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  const togglePlayer = (playerId) => {
    if (selectedIds.includes(playerId)) {
      onChange(selectedIds.filter(id => id !== playerId));
    } else if (selectedIds.length < 6) {
      onChange([...selectedIds, playerId]);
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    setError('');
    setIsAdding(true);

    try {
      const player = await createPlayer(newPlayerName.trim());
      onPlayerAdded(player);
      setNewPlayerName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-base font-medium text-gray-700">
        Select Players (2-6)
      </label>

      {/* Player chips - mobile optimized */}
      <div className="flex flex-wrap gap-2">
        {players.map((player) => {
          const isSelected = selectedIds.includes(player.id);
          return (
            <button
              key={player.id}
              type="button"
              onClick={() => togglePlayer(player.id)}
              className={`px-4 py-3 rounded-full text-base font-medium transition-colors min-h-[44px] ${
                isSelected
                  ? 'bg-blue-600 text-white active:bg-blue-700'
                  : 'bg-gray-200 text-gray-700 active:bg-gray-300'
              }`}
            >
              {player.name}
              {isSelected && (
                <span className="ml-2 text-blue-200 font-bold">
                  #{selectedIds.indexOf(player.id) + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selection count */}
      <p className="text-base text-gray-500">
        {selectedIds.length} of 6 players selected
        {selectedIds.length < 2 && ' (minimum 2)'}
      </p>

      {/* Add new player form - mobile optimized */}
      <form onSubmit={handleAddPlayer} className="flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="New player name"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[48px]"
        />
        <button
          type="submit"
          disabled={isAdding || !newPlayerName.trim()}
          className="px-5 py-3 bg-green-600 text-white rounded-xl font-medium min-h-[48px] min-w-[72px] active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAdding ? '...' : 'Add'}
        </button>
      </form>

      {error && (
        <p className="text-base text-red-600">{error}</p>
      )}
    </div>
  );
}
