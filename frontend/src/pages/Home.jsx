import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

function Home() {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/scholarships/stats');
        setStats(data.stats);
      } catch (error) {
        setStats(null);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-fuchsia-700 via-rose-600 to-amber-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Find Your Perfect Scholarship</h1>
            <p className="text-xl mb-8 text-rose-100">
              Empowering girls through education. Discover scholarships tailored just for you.
            </p>
            <div className="flex justify-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="bg-white text-rose-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-rose-50 transition">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="bg-white text-rose-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-rose-50 transition">
                    Get Started
                  </Link>
                  <Link to="/scholarships" className="bg-fuchsia-800 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-fuchsia-900 transition border-2 border-white">
                    Browse Scholarships
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SheScholar?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
            <p className="text-gray-600">Get personalized scholarship recommendations based on your profile</p>
          </div>
          <div className="text-center">
            <div className="bg-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              {stats?.total ? `${stats.total}+ Scholarships` : 'Scholarships'}
            </h3>
            <p className="text-gray-600">Access to government and private scholarships across India</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⏰</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Deadline Tracking</h3>
            <p className="text-gray-600">Never miss a deadline with our application tracker</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
