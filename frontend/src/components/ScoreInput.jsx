import { useState } from 'react';

export default function ScoreInput({ players, currentRound, onSubmit, disabled }) {
  const [scores, setScores] = useState(
    players.reduce((acc, p) => ({ ...acc, [p.id]: '' }), {})
  );
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (playerId, value) => {
    // Allow empty, negative numbers, or valid integers
    if (value === '' || value === '-' || /^-?\d+$/.test(value)) {
      setScores({ ...scores, [playerId]: value });
    }
  };

  const allFilled = players.every(
    (p) => scores[p.id] !== '' && scores[p.id] !== '-'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled || submitting) return;

    setSubmitting(true);
    
    // Convert scores to integers
    const intScores = {};
    for (const [id, val] of Object.entries(scores)) {
      intScores[id] = parseInt(val, 10);
    }

    try {
      await onSubmit(currentRound, intScores);
      // Reset form for next round
      setScores(players.reduce((acc, p) => ({ ...acc, [p.id]: '' }), {}));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 rounded-xl p-4">
      <h3 className="text-base font-semibold text-blue-800 mb-4">
        Round {currentRound} Scores
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {players.map((player) => (
          <div key={player.id}>
            <label className="block text-sm text-gray-700 mb-1 font-medium truncate">
              {player.name}
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={scores[player.id]}
              onChange={(e) => handleChange(player.id, e.target.value)}
              disabled={disabled || submitting}
              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-center text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 min-h-[48px]"
              placeholder="0"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={!allFilled || disabled || submitting}
        className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium text-lg min-h-[56px] active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? 'Submitting...' : `Submit Round ${currentRound}`}
      </button>
    </form>
  );
}
