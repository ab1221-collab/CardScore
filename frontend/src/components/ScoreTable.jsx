export default function ScoreTable({ game }) {
  const { players, rounds, totals, game_type } = game;
  const roundNumbers = Object.keys(rounds).map(Number).sort((a, b) => a - b);

  // Get wild card for Five Crowns rounds
  const getWildCard = (roundNum) => {
    const cards = roundNum + 2;
    if (cards <= 10) return cards;
    const mapping = { 11: 'J', 12: 'Q', 13: 'K' };
    return mapping[cards] || '?';
  };

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full border-collapse min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b sticky left-0 bg-gray-100 z-10">
              {game_type === 'five_crowns' ? 'Rnd' : 'Round'}
            </th>
            {players.map((player) => (
              <th
                key={player.id}
                className="p-3 text-center text-sm font-semibold text-gray-800 border-b min-w-[70px]"
              >
                <span className="truncate block max-w-[70px]">{player.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roundNumbers.map((roundNum) => (
            <tr key={roundNum} className="border-b active:bg-gray-50">
              <td className="p-3 text-sm text-gray-600 sticky left-0 bg-white z-10">
                {game_type === 'five_crowns' ? (
                  <span className="flex items-center gap-1">
                    <span>{roundNum}</span>
                    <span className="inline-block px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                      {getWildCard(roundNum)}
                    </span>
                  </span>
                ) : (
                  roundNum
                )}
              </td>
              {players.map((player) => (
                <td
                  key={player.id}
                  className="p-3 text-center text-base font-medium text-gray-800"
                >
                  {rounds[roundNum]?.[player.id] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
          {roundNumbers.length === 0 && (
            <tr>
              <td
                colSpan={players.length + 1}
                className="p-8 text-center text-gray-500 text-base"
              >
                No scores yet. Add the first round!
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="bg-gray-800 text-white">
            <td className="p-3 text-sm font-semibold sticky left-0 bg-gray-800 z-10">Total</td>
            {players.map((player) => (
              <td
                key={player.id}
                className="p-3 text-center text-xl font-bold"
              >
                {totals[player.id] || 0}}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
