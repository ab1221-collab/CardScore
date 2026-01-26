import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameSetup from './pages/GameSetup';
import Game from './pages/Game';
import History from './pages/History';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<GameSetup />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/games" element={<History />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
