import { useState } from 'react';
import { createPlayer } from '../api';

export default function PlayerSelect({ players, selectedIds, onChange, onPlayerAdded }) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  // Split players into frequent (top 4) and others
  const frequentPlayers = players.slice(0, 4);
  const otherPlayers = players.slice(4);

  // Get selected players that are in "others" (for display)
  const selectedOtherIds = selectedIds.filter(
    id => otherPlayers.some(p => p.id === id)
  );

  const togglePlayer = (playerId) => {
    if (selectedIds.includes(playerId)) {
      onChange(selectedIds.filter(id => id !== playerId));
    } else if (selectedIds.length < 6) {
      onChange([...selectedIds, playerId]);
    }
  };

  const handleDropdownSelect = (e) => {
    const playerId = parseInt(e.target.value, 10);
    if (playerId && !selectedIds.includes(playerId) && selectedIds.length < 6) {
      onChange([...selectedIds, playerId]);
    }
    e.target.value = ''; // Reset dropdown
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    console.log('handleAddPlayer called, name:', newPlayerName);
    if (!newPlayerName.trim()) return;

    setError('');
    setIsAdding(true);

    try {
      console.log('Calling createPlayer API...');
      const player = await createPlayer(newPlayerName.trim());
      console.log('Player created successfully:', player);
      onPlayerAdded(player);
      setNewPlayerName('');
    } catch (err) {
      console.error('Error creating player:', err);
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

      {/* Frequent player chips - mobile optimized */}
      <div className="flex flex-wrap gap-2">
        {frequentPlayers.map((player) => {
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

      {/* Dropdown for other players */}
      {otherPlayers.length > 0 && (
        <div>
          <select
            onChange={handleDropdownSelect}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[48px]"
            defaultValue=""
          >
            <option value="" disabled>
              + Add from other players ({otherPlayers.length})
            </option>
            {otherPlayers
              .filter(p => !selectedIds.includes(p.id))
              .map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name} ({player.games_played || 0} games)
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Selected players from dropdown shown as removable chips */}
      {selectedOtherIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedOtherIds.map((id) => {
            const player = otherPlayers.find(p => p.id === id);
            if (!player) return null;
            return (
              <button
                key={player.id}
                type="button"
                onClick={() => togglePlayer(player.id)}
                className="px-4 py-3 rounded-full text-base font-medium bg-blue-600 text-white active:bg-blue-700 min-h-[44px]"
              >
                {player.name}
                <span className="ml-2 text-blue-200 font-bold">
                  #{selectedIds.indexOf(player.id) + 1}
                </span>
                <span className="ml-2 text-blue-200">✕</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Selection count */}
      <p className="text-base text-gray-500">
        {selectedIds.length} of 6 players selected
        {selectedIds.length < 2 && ' (minimum 2)'}
      </p>

      {/* Add new player - mobile optimized */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer(e)}
          placeholder="New player name"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[48px]"
        />
        <button
          type="button"
          onClick={handleAddPlayer}
          disabled={isAdding || !newPlayerName.trim()}
          className="px-5 py-3 bg-green-600 text-white rounded-xl font-medium min-h-[48px] min-w-[72px] active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAdding ? '...' : 'Add'}
        </button>
      </div>

      {error && (
        <p className="text-base text-red-600">{error}</p>
      )}
    </div>
  );
}
