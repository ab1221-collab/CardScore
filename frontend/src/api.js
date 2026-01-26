const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Player endpoints
export const getPlayers = () => request('/players');

export const createPlayer = (name) => 
  request('/players', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });

export const deletePlayer = (id) => 
  request(`/players/${id}`, { method: 'DELETE' });

// Game endpoints
export const getGames = (activeOnly = false) => 
  request(`/games${activeOnly ? '?active=true' : ''}`);

export const getGame = (id) => request(`/games/${id}`);

export const createGame = (gameType, playerIds, targetScore = null) =>
  request('/games', {
    method: 'POST',
    body: JSON.stringify({
      game_type: gameType,
      player_ids: playerIds,
      target_score: targetScore,
    }),
  });

export const submitScore = (gameId, round, scores) =>
  request(`/games/${gameId}/score`, {
    method: 'POST',
    body: JSON.stringify({ round, scores }),
  });

// Stats endpoints
export const getLeaderboard = () => request('/stats/leaderboard');
