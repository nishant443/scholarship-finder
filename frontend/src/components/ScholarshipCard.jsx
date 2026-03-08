import React from 'react';
import { Link } from 'react-router-dom';
import MatchScoreBadge from './MatchScoreBadge';

function ScholarshipCard({ scholarship, showMatchScore = false }) {
  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const daysLeft = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Today!';
    if (daysLeft === 1) return 'Tomorrow!';
    if (daysLeft < 7) return `${daysLeft} days left`;
    
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const deadlineDays = Math.ceil((new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const isUrgent = deadlineDays >= 0 && deadlineDays <= 7;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1 pr-4">
            {scholarship.name}
          </h3>
          {showMatchScore && scholarship.matchScore && (
            <MatchScoreBadge score={scholarship.matchScore} />
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {scholarship.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Amount:</span>
            <span className="font-semibold text-green-600">{scholarship.amount}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Deadline:</span>
            <span className={`font-medium ${isUrgent ? 'text-red-600' : 'text-gray-700'}`}>
              {formatDeadline(scholarship.deadline)}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-24">Provider:</span>
            <span className="text-gray-700">{scholarship.provider}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {scholarship.eligibility?.education?.slice(0, 2).map((edu, idx) => (
            <span key={idx} className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full">
              {edu}
            </span>
          ))}
          {scholarship.eligibility?.field?.slice(0, 1).map((field, idx) => (
            <span key={idx} className="bg-fuchsia-100 text-fuchsia-700 text-xs px-2 py-1 rounded-full">
              {field}
            </span>
          ))}
          {scholarship.eligibility?.gender?.includes('Female') && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
              For Girls
            </span>
          )}
        </div>

        <Link
          to={`/scholarships/${scholarship._id}`}
          className="block w-full text-center bg-rose-600 text-white py-2 rounded-lg font-medium hover:bg-rose-700 transition"
        >
          View Details →
        </Link>
      </div>

      {isUrgent && (
        <div className="bg-red-50 border-t border-red-100 px-6 py-2">
          <p className="text-red-700 text-xs font-medium text-center">
            ⏰ Deadline approaching!
          </p>
        </div>
      )}
    </div>
  );
}

export default ScholarshipCard;
