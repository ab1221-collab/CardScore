# CardScore Deployment Guide (Railway)

This guide walks you through deploying CardScore to Railway.

## Prerequisites

- [Railway account](https://railway.app)
- [Railway CLI](https://docs.railway.app/develop/cli) (optional but recommended)
- Git repository pushed to GitHub

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│     Backend     │────▶│   PostgreSQL    │
│   (React/Vite)  │     │    (Flask)      │     │    Database     │
│   Static Site   │     │   Gunicorn      │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **New Project** → **Empty Project**
3. Name it `cardscore`

## Step 2: Add PostgreSQL Database

1. In your project, click **+ New** → **Database** → **Add PostgreSQL**
2. Railway will provision a PostgreSQL instance
3. Click on the database, go to **Variables** tab
4. Copy the `DATABASE_URL` value (you'll need this)

## Step 3: Deploy Backend

### Option A: Via GitHub (Recommended)

1. Push your code to GitHub
2. In Railway project, click **+ New** → **GitHub Repo**
3. Select your repository
4. Configure root directory: `backend`
5. Set environment variables:
   - `DATABASE_URL` = (paste from Step 2)
   - `SECRET_KEY` = (generate a random string)
   - `FLASK_ENV` = `production`

### Option B: Via CLI

```bash
cd backend
railway login
railway link
railway up
```

### After Deployment

1. Go to backend service → **Settings** → **Networking**
2. Click **Generate Domain** to get a public URL
3. Copy this URL (e.g., `https://cardscore-backend.railway.app`)

### Run Database Migration

In Railway dashboard, go to backend service → **Settings** → **Run Command**:
```bash
flask db upgrade
```

Or use CLI:
```bash
railway run flask db upgrade
```

## Step 4: Deploy Frontend

1. In Railway project, click **+ New** → **GitHub Repo** (same repo)
2. Configure root directory: `frontend`
3. Set environment variable:
   - `VITE_API_URL` = `https://your-backend-url.railway.app/api`
4. Generate a domain for the frontend service

## Step 5: Verify Deployment

1. Visit your frontend URL
2. Test creating a player
3. Start a new game
4. Verify scores are being saved

## Environment Variables Summary

### Backend
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `SECRET_KEY` | Flask secret key | Random 32+ char string |
| `FLASK_ENV` | Environment mode | `production` |

### Frontend
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.example.railway.app/api` |

## Troubleshooting

### Backend not starting
- Check logs in Railway dashboard
- Verify `DATABASE_URL` is set correctly
- Ensure `gunicorn` is in requirements.txt

### Database connection errors
- Railway PostgreSQL uses `postgres://` but SQLAlchemy needs `postgresql://`
- The app.py already handles this conversion automatically

### Frontend can't reach backend
- Check CORS is enabled (it is in app.py)
- Verify `VITE_API_URL` includes `/api` suffix
- Check backend is actually running (visit `/api/health`)

### Migrations not running
```bash
# Run manually via Railway CLI
railway run flask db upgrade
```

## Local Development

```bash
# Backend
cd backend
source venv/bin/activate
flask run --port 5001

# Frontend (new terminal)
cd frontend
npm run dev
```

## Useful Commands

```bash
# View logs
railway logs

# Open shell in service
railway shell

# Run one-off command
railway run <command>

# Check service status
railway status
```
