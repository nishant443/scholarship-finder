import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ScholarshipCard from '../components/ScholarshipCard';

function Dashboard() {
  const { user } = useAuth();
  const [matchedScholarships, setMatchedScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [matchedRes, appsRes] = await Promise.all([
        api.get('/scholarships/matched/me'),
        api.get('/applications')
      ]);
      setMatchedScholarships(matchedRes.data.scholarships.slice(0, 6));
      setApplications(appsRes.data.applications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
      <p className="text-gray-600 mb-8">Here are your personalized scholarship matches</p>

      {!user?.profile?.education && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="font-medium">Complete your profile to get better matches!</p>
          <Link to="/profile" className="text-indigo-600 underline">Update Profile →</Link>
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Top Matches For You</h2>
        {matchedScholarships.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedScholarships.map(scholarship => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} showMatchScore />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No matches found. Complete your profile to see scholarships.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Your Saved Scholarships ({applications.length})</h2>
        {applications.length > 0 ? (
          <div className="space-y-3">
            {applications.map(app => (
              <div key={app._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{app.scholarship.name}</h3>
                  <p className="text-sm text-gray-500">
                    Deadline: {new Date(app.scholarship.deadline).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  app.status === 'applied' ? 'bg-green-100 text-green-700' :
                  app.status === 'saved' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No saved scholarships yet.</p>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
