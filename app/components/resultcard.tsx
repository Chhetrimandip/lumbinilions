import React, { FC } from 'react';
import Image from 'next/image';

interface ResultProp {
  result: {
    teamLogo: string;
    team2: string;
    victory: boolean;
    margin: number;
  };
}

const Resultcard: FC<{ result: ResultProp['result'] }> = ({ result }) => {
  return (
    <div className="overflow-hidden bg-[#0c1924] hover:bg-[#162636] transition-all duration-300 rounded-lg shadow-lg border border-amber-900/20">
      <div className="flex flex-col sm:flex-row items-center w-full">
        {/* Lumbini Lions Section */}
        <div className="flex-1 flex flex-col items-center py-4 px-6">
          <div className="mb-2">
            <Image
              src="/logo.png"
              alt="Lumbini Lions Logo"
              width={120}
              height={120}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg"
            />
          </div>
          <span className="text-amber-500 font-bold text-sm sm:text-base text-center">LUMBINI LIONS</span>
        </div>
        
        {/* Match Result Section */}
        <div className="py-4 px-6 flex flex-col items-center bg-black/20 w-full sm:w-auto">
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xl sm:text-2xl font-bold ${result.victory ? 'text-green-500' : 'text-red-500'}`}>
              {result.victory ? 'Won' : 'Lost'}
            </span>
            <span className="text-xs text-gray-400 mx-1">by</span>
            <span className="text-xl sm:text-2xl font-bold text-amber-500">{result.margin}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">runs/wickets</div>
        </div>
        
        {/* Opponent Section */}
        <div className="flex-1 flex flex-col items-center py-4 px-6">
          <div className="mb-2">
            <Image
              src={result.teamLogo}
              alt={`${result.team2} Logo`}
              width={120}
              height={120}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg"
            />
          </div>
          <span className="text-white font-bold text-sm sm:text-base text-center">{result.team2.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default Resultcard;