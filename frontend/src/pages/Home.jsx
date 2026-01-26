import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 safe-area-inset">
      <div className="text-center w-full max-w-sm">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
          🃏 CardScore
        </h1>
        <p className="text-gray-600 mb-8 text-base">
          Track scores for Five Crowns, 500 Rum, and Gin Rummy
        </p>

        <div className="space-y-3">
          <Link
            to="/new"
            className="block w-full py-4 bg-blue-600 text-white rounded-xl font-medium text-lg min-h-[56px] flex items-center justify-center active:bg-blue-700 transition-colors"
          >
            New Game
          </Link>
          
          <Link
            to="/games"
            className="block w-full py-4 bg-white text-gray-700 rounded-xl font-medium text-lg min-h-[56px] flex items-center justify-center shadow-sm active:bg-gray-50 transition-colors"
          >
            Game History
          </Link>
          
          <Link
            to="/leaderboard"
            className="block w-full py-4 bg-white text-gray-700 rounded-xl font-medium text-lg min-h-[56px] flex items-center justify-center shadow-sm active:bg-gray-50 transition-colors"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
