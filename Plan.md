# Project: Card Game Scorekeeper (Five Crowns, 500 Rum, Gin Rummy)

## 1. Project Overview
**Goal:** Build a web application to track scores for card games with up to 6 players. The app will persist data for historical analytics.
**Stack:** - **Backend:** Python (Flask)
- **Frontend:** React (Vite + Tailwind CSS)
- **Database:** PostgreSQL (Production) / SQLite (Dev)
- **Hosting:** Railway

---

## 2. Domain Logic & Rules

### A. Five Crowns
- **Structure:** Fixed 11 Rounds.
- **Sequence:**
  - Round 1: 3 cards dealt (3s wild)
  - Round 2: 4 cards dealt (4s wild)
  - ...
  - Round 11: 13 cards dealt (Kings wild)
- **Scoring:** Lowest score wins.
- **Game Over:** Automatically triggers after Round 11 scores are submitted.

### B. 500 Rum & Gin Rummy
- **Structure:** Variable length.
- **Target Score:** Customizable at setup (Default: 500).
- **Scoring:** Points accumulate. First player to cross `target_score` triggers "Game Over".
- **Logic:** Check total scores after every round submission.

---

## 3. Database Schema
**Principle:** Do not store "wins" or "losses". Calculate them dynamically to ensure data integrity.

### Table: `players`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | Integer (PK) | |
| `name` | String | Unique, Indexed |
| `created_at` | DateTime | |

### Table: `games`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | Integer (PK) | |
| `game_type` | String | Enum: `five_crowns`, `500_rum`, `gin_rummy` |
| `target_score` | Integer | Nullable (Used for Rummy/Gin only) |
| `is_active` | Boolean | Default `True` |
| `date_played` | DateTime | |

### Table: `game_players` (Association Table)
*Maps players to a specific game instance to handle 2-6 player variability.*
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | Integer (PK) | |
| `game_id` | Integer (FK) | |
| `player_id` | Integer (FK) | |
| `seat_order` | Integer | 0-5 (Used for turn order if needed) |

### Table: `scores`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | Integer (PK) | |
| `game_id` | Integer (FK) | |
| `player_id` | Integer (FK) | |
| `round_number` | Integer | |
| `points` | Integer | Round score (can be negative in some variants, usually positive) |

---

## 4. API Specification (Flask)

### Player Management
- `GET /api/players` - List all players.
- `POST /api/players` - Create new player profile.

### Game Management
- `POST /api/games` - Initialize game.
  - Body: `{ "game_type": "gin_rummy", "player_ids": [1, 2], "target_score": 500 }`
- `GET /api/games/{id}` - Get full game state (players, current scores, active status).
- `POST /api/games/{id}/score` - Submit round scores.
  - Body: `{ "round": 1, "scores": { "player_id_1": 10, "player_id_2": 0 } }`
  - **Logic:** This endpoint must check Game Over conditions and update `is_active` to `False` if triggers are met.

### Analytics
- `GET /api/stats/leaderboard` - Returns calculated wins/losses per player.

---

## 5. Implementation Steps

### Phase 1: Environment Setup
- [ ] Initialize Git repository.
- [ ] Create `backend/` and `frontend/` directories.
- [ ] **Backend:** Set up `venv`, install `flask`, `flask-sqlalchemy`, `psycopg2-binary`, `flask-cors`.
- [ ] **Frontend:** Initialize Vite project (`npm create vite@latest frontend -- --template react`).
- [ ] Install Tailwind CSS.

### Phase 2: Backend Core
- [ ] **Models:** Define SQLAlchemy models in `backend/models.py`.
- [ ] **Migrations:** Initialize Flask-Migrate.
- [ ] **Routes:** Create `backend/routes/players.py` and `backend/routes/games.py`.
- [ ] **Logic:** Implement the `check_game_over(game_id)` utility function.

### Phase 3: Frontend - Game Setup
- [ ] Create `PlayerSelect` component (Multi-select dropdown).
- [ ] Create `GameSetup` form.
  - Conditional rendering: If Rummy/Gin is selected, show "Target Score" input.

### Phase 4: Frontend - Active Game (The Scoreboard)
- [ ] Create `ScoreTable` component.
  - Columns: Players.
  - Rows: Rounds.
  - Footer: Total Score.
- [ ] **Five Crowns Logic:** Add a visual indicator for the current Wild Card based on round number (Round 1 = 3s, Round 11 = Kings).
- [ ] **Input Handling:** Form to add a row of scores. Validate that all players have a score entered before submitting.

### Phase 5: Analytics & Polish
- [ ] Implement Leaderboard View (Calculate wins on the fly).
- [ ] Add "History" view to see past games.
- [ ] styling and mobile responsiveness check.

### Phase 6: Deployment (Railway)
- [ ] Create `Procfile` for Backend (`web: gunicorn app:app`).
- [ ] Create `vercel.json` or Railway static site config for Frontend.
- [ ] Provision PostgreSQL on Railway.
- [ ] Set environment variables (`DATABASE_URL`).

---

## 6. Development Reference: Five Crowns Wild Card Logic
*Use this helper logic in the frontend or backend helper to display the current wild card.*

```python
def get_wild_card(round_num):
    # Round 1 (3 cards) -> Round 11 (13 cards)
    cards = round_num + 2
    if cards <= 10: return str(cards)
    mapping = {11: 'Jack', 12: 'Queen', 13: 'King'}
    return mapping.get(cards, 'Unknown')