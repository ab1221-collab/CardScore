import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGame, submitScore } from '../api';
import ScoreEntryModal from '../components/ScoreEntryModal';

const GAME_TYPE_LABELS = {
  five_crowns: 'Five Crowns',
  '500_rum': '500 Rum',
  gin_rummy: 'Gin Rummy',
};

// Helper for Five Crowns logic
const getFiveCrownsDetails = (roundNum) => {
  const cards = roundNum + 2;
  let wild;
  if (cards <= 10) {
    wild = cards;
  } else {
    wild = { 11: 'J', 12: 'Q', 13: 'K' }[cards];
  }
  return { cards, wild };
};

// Chevron icons (inline SVG to avoid dependencies)
const ChevronDown = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUp = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const Trophy = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 1a1 1 0 011 1v1h3a1 1 0 011 1v3a4 4 0 01-2.5 3.7V12a1 1 0 01-.293.707l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5A1 1 0 017 12v-1.3A4 4 0 014.5 7V4a1 1 0 011-1h3V2a1 1 0 011-1zM6 4.5v2.5a2.5 2.5 0 105 0V4.5H6z" clipRule="evenodd" />
    <path d="M10 18a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zM6 17a1 1 0 100 2h3a1 1 0 100-2H6z" />
  </svg>
);

export default function Game() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedPlayerId, setExpandedPlayerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleEnterScores = () => {
    setIsModalOpen(true);
  };

  const handleScoreSubmit = async (scores) => {
    // Convert all score values to integers
    const intScores = {};
    for (const [playerId, score] of Object.entries(scores)) {
      intScores[playerId] = parseInt(score, 10) || 0;
    }

    console.log('Submitting scores for round', game.current_round, intScores);
    
    try {
      const updatedGame = await submitScore(id, game.current_round, intScores);
      setGame(updatedGame);
      setError('');
      setIsModalOpen(false);
      
      // Check if game just ended
      if (!updatedGame.is_active) {
        // Determine winner based on game type
        const sortedPlayers = updatedGame.players
          .map(p => ({ ...p, total: updatedGame.totals[p.id] || 0 }))
          .sort((a, b) => updatedGame.game_type === 'five_crowns' 
            ? a.total - b.total 
            : b.total - a.total);
        
        const winner = sortedPlayers[0];
        alert(`🏆 Game Over!\n\n${winner.name} wins with ${winner.total} points!`);
      }
    } catch (err) {
      setError(err.message || 'Failed to save scores');
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

  const { game_type, is_active, players, rounds, totals, current_round, target_score } = game;
  const roundNumbers = Object.keys(rounds).map(Number).sort((a, b) => a - b);
  const fcDetails = game_type === 'five_crowns' ? getFiveCrownsDetails(current_round) : null;

  // Build player data with history
  const playersWithData = players.map(player => ({
    ...player,
    totalScore: totals[player.id] || 0,
    history: roundNumbers.map(roundNum => ({
      round: roundNum,
      score: rounds[roundNum]?.[player.id] ?? 0,
      wild: game_type === 'five_crowns' ? getFiveCrownsDetails(roundNum).wild : null
    }))
  }));

  // Sort players based on game type
  const sortedPlayers = [...playersWithData].sort((a, b) => {
    if (game_type === 'five_crowns') {
      return a.totalScore - b.totalScore; // Low score wins
    }
    return b.totalScore - a.totalScore; // High score wins
  });

  // Determine winner for completed games
  let winner = null;
  if (!is_active && sortedPlayers.length > 0) {
    winner = sortedPlayers[0];
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* 1. STICKY HEADER */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
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
        
        <h1 className="text-xl font-bold text-gray-800">{GAME_TYPE_LABELS[game_type]}</h1>
        
        {/* Five Crowns Specific Header Bar */}
        {game_type === 'five_crowns' ? (
          <div className="flex justify-between mt-2 text-sm bg-blue-50 p-3 rounded-lg text-blue-800 font-medium">
            <span>Round {current_round}/11</span>
            <span className="font-bold px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Wild: {fcDetails.wild}s</span>
            <span>Deal: {fcDetails.cards}</span>
          </div>
        ) : (
          target_score && (
            <div className="mt-2 text-sm text-gray-500 font-medium bg-gray-50 p-3 rounded-lg">
              Target: <span className="font-bold text-gray-800">{target_score} points</span>
            </div>
          )
        )}
      </div>

      {/* Winner Banner (for completed games) */}
      {!is_active && winner && (
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-5 text-center">
          <p className="text-yellow-900 text-sm font-medium mb-1">🏆 Winner</p>
          <p className="text-2xl font-bold text-white">{winner.name}</p>
          <p className="text-yellow-100 mt-1 text-lg">
            {winner.totalScore} points
          </p>
        </div>
      )}

      {/* 2. PLAYER LIST (ACCORDION) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32">
        {sortedPlayers.length === 0 ? (
          <div className="bg-white rounded-xl shadow border border-gray-100 p-8 text-center">
            <p className="text-gray-500">No scores yet. Add the first round!</p>
          </div>
        ) : (
          sortedPlayers.map((player, index) => (
            <div 
              key={player.id} 
              className={`bg-white rounded-xl shadow border border-gray-100 overflow-hidden transition-all ${
                expandedPlayerId === player.id ? 'ring-2 ring-blue-100' : ''
              }`}
              onClick={() => setExpandedPlayerId(expandedPlayerId === player.id ? null : player.id)}
            >
              {/* Header Row */}
              <div className="p-4 flex items-center justify-between active:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  {/* Rank Badge */}
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm 
                    ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                      index === 1 ? 'bg-gray-200 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-500'}`}>
                    {index === 0 ? <Trophy /> : index + 1}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{player.name}</div>
                    {player.history.length > 0 && (
                      <div className="text-xs text-gray-400">
                        {player.history.length} round{player.history.length !== 1 ? 's' : ''} played
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-black text-gray-800">{player.totalScore}</div>
                  {expandedPlayerId === player.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              {/* Expanded History Body */}
              {expandedPlayerId === player.id && player.history.length > 0 && (
                <div className="bg-gray-50 border-t border-gray-100 p-4">
                  <div className="space-y-2">
                    {player.history.map(h => (
                      <div key={h.round} className="flex justify-between text-sm py-1">
                        <span className="text-gray-500">
                          Round {h.round}
                          {game_type === 'five_crowns' && (
                            <span className="ml-2 inline-block px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                              {h.wild}s
                            </span>
                          )}
                        </span>
                        <span className={`font-medium ${
                          h.score === 0 ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {h.score === 0 ? '✓ 0' : `+${h.score}`}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                      <span className="text-gray-600">Total</span>
                      <span className="text-gray-900">{player.totalScore}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty state for expanded player with no history */}
              {expandedPlayerId === player.id && player.history.length === 0 && (
                <div className="bg-gray-50 border-t border-gray-100 p-4 text-center text-gray-500 text-sm">
                  No rounds played yet
                </div>
              )}
            </div>
          ))
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-base">
            {error}
          </div>
        )}
      </div>

      {/* 3. FIXED BOTTOM BUTTON */}
      {is_active ? (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
          <button 
            onClick={handleEnterScores}
            className="w-full bg-blue-600 active:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg text-lg flex justify-center items-center min-h-[56px]"
          >
            Enter Round {current_round} Scores
          </button>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
          <Link
            to="/new"
            className="w-full bg-blue-600 active:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg text-lg flex justify-center items-center min-h-[56px]"
          >
            Start New Game
          </Link>
        </div>
      )}

      {/* Score Entry Modal */}
      <ScoreEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleScoreSubmit}
        players={players}
        roundNumber={current_round}
      />
    </div>
  );
}
