const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Debug: Log the API URL being used
console.log('CardScore API URL:', API_BASE);

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  console.log('API Request:', options.method || 'GET', url);
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    console.log('API Response:', response.status, url);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  } catch (err) {
    console.error('API Error:', err.message, url);
    throw err;
  }
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

export const submitScore = (gameId, round, scores, wentOut = {}) =>
  request(`/games/${gameId}/score`, {
    method: 'POST',
    body: JSON.stringify({ round, scores, went_out: wentOut }),
  });

export const deleteGame = (id) =>
  request(`/games/${id}`, { method: 'DELETE' });

// Stats endpoints
export const getLeaderboard = () => request('/stats/leaderboard');
