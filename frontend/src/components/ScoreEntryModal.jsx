import { useState, useEffect } from 'react';

export default function ScoreEntryModal({ isOpen, onClose, onSubmit, players, roundNumber }) {
  const [inputScores, setInputScores] = useState({});

  // Reset scores when modal opens
  useEffect(() => {
    if (isOpen) {
      setInputScores({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Convert string values to numbers and validate
    const scores = {};
    let isValid = true;

    players.forEach(player => {
      const value = inputScores[player.id];
      if (value === undefined || value === '') {
        scores[player.id] = 0;
      } else {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0) {
          isValid = false;
        } else {
          scores[player.id] = numValue;
        }
      }
    });

    if (!isValid) {
      alert('Please enter valid scores (non-negative numbers)');
      return;
    }

    onSubmit(scores);
    setInputScores({});
    onClose();
  };

  const handleInputChange = (playerId, value) => {
    // Only allow numeric input
    if (value === '' || /^\d+$/.test(value)) {
      setInputScores({ ...inputScores, [playerId]: value });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-xl shadow-2xl p-6 pb-8 animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Round {roundNumber} Scores</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 active:text-gray-700 font-medium min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
          >
            Cancel
          </button>
        </div>

        {/* Input List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pb-4">
          {players.map(player => (
            <div key={player.id} className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 flex-1 truncate text-lg">
                {player.name}
              </label>
              <input 
                type="tel" 
                inputMode="numeric"
                pattern="[0-9]*" 
                placeholder="0"
                value={inputScores[player.id] || ''}
                onChange={(e) => handleInputChange(player.id, e.target.value)}
                className="w-28 h-12 text-center text-xl font-medium border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 active:bg-blue-700 text-white font-bold h-14 rounded-xl shadow-lg text-lg min-h-[56px] transition-colors"
          >
            Save Scores
          </button>
        </div>
      </div>
    </div>
  );
}
