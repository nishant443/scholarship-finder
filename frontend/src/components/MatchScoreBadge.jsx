import React from 'react';

function MatchScoreBadge({ score }) {
  const getColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getTextColor = (score) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-yellow-700';
    return 'text-orange-700';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${getColor(score)} text-white px-3 py-1 rounded-full text-sm font-bold shadow-md`}>
        {score}% Match
      </div>
      <div className="relative w-full mt-1">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${getColor(score)} h-1.5 rounded-full transition-all duration-300`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MatchScoreBadge;
