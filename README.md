# CardScore 🃏

A mobile-first web app for tracking scores in card games: **Five Crowns**, **500 Rum**, and **Gin Rummy**.

## Features

- Track scores for 2-6 players
- Automatic game-over detection
- Five Crowns wild card display
- Leaderboard with win/loss stats
- Game history
- Mobile-optimized UI

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Python Flask + SQLAlchemy
- **Database:** PostgreSQL (prod) / SQLite (dev)
- **Hosting:** Railway

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
flask run --port 5001
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173

## Game Rules

### Five Crowns
- 11 fixed rounds
- Wild card changes each round (3s → Kings)
- **Lowest score wins**

### 500 Rum / Gin Rummy
- Play to customizable target score
- **First to reach target wins**

## Project Structure

```
CardScore/
├── backend/
│   ├── app.py              # Flask app
│   ├── models.py           # Database models
│   ├── routes/
│   │   ├── players.py      # Player CRUD
│   │   └── games.py        # Game logic & scoring
│   ├── migrations/         # Database migrations
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api.js          # API client
│   │   ├── pages/          # Route components
│   │   └── components/     # Reusable UI
│   └── package.json
├── DEPLOY.md               # Deployment guide
└── README.md
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/players` | GET, POST | List/create players |
| `/api/games` | GET, POST | List/create games |
| `/api/games/:id` | GET | Get game state |
| `/api/games/:id/score` | POST | Submit round scores |
| `/api/stats/leaderboard` | GET | Win/loss rankings |

## Deployment

See [DEPLOY.md](DEPLOY.md) for Railway deployment instructions.

## License

MIT
