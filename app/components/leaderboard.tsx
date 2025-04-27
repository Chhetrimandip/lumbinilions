import React from 'react';

// Properly type the props
interface LeaderboardProps {
  leaderboard: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    score: number;
    time: number;
  }>;
  questionCount?: number; // Make this optional
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard, questionCount = 5 }) => {
  // Format time for display
  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  return (
    <div>
      {leaderboard && leaderboard.length > 0 && (
        <div className="mt-10 bg-neutral-900/60 rounded-lg p-4">
          <h3 className="text-xl font-['Bebas_Neue'] text-amber-500 mb-4">TOP PLAYERS</h3>
          <div className="overflow-hidden rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-4 py-2 text-sm text-amber-400">#</th>
                  <th className="px-4 py-2 text-sm text-amber-400">Name</th>
                  <th className="px-4 py-2 text-sm text-amber-400">Score</th>
                  <th className="px-4 py-2 text-sm text-amber-400">Time</th>
                </tr>
              </thead>
              <tbody>
                {/* Display the data without re-sorting */}
                {leaderboard.slice(0, 5).map((player, index) => (
                  <tr key={player.id} className={index % 2 === 0 ? 'bg-neutral-800/40' : 'bg-neutral-800/20'}>
                    <td className="px-4 py-2 text-sm text-gray-300">{index + 1}</td>
                    <td className="px-4 py-2 text-sm text-white">{player.name}</td>
                    <td className="px-4 py-2 text-sm text-green-400">{player.score}/{questionCount}</td>
                    <td className="px-4 py-2 text-sm text-amber-300">{formatTime(player.time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;