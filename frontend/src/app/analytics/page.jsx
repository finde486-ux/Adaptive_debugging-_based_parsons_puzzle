import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

const AnalyticsPage = () => {
  const [overview, setOverview] = useState(null);
  const [concepts, setConcepts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ovRes, conRes] = await Promise.all([
          api.get('/analytics/overview'),
          api.get('/analytics/concepts')
        ]);
        setOverview(ovRes.data);
        setConcepts(conRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!overview) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Your Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-sm uppercase tracking-wider opacity-80">Total XP</div>
          <div className="text-4xl font-black">{overview.totalXP}</div>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">
          <div className="text-sm uppercase tracking-wider opacity-80">Current Streak</div>
          <div className="text-4xl font-black">{overview.currentStreak} days</div>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-sm uppercase tracking-wider opacity-80">Puzzles Solved</div>
          <div className="text-4xl font-black">{overview.puzzlesSolved}</div>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-sm uppercase tracking-wider opacity-80">Badges</div>
          <div className="text-4xl font-black">{overview.badgesCount}</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Concept Mastery</h2>
      <div className="bg-white rounded-xl shadow p-6 border">
        {concepts.map((c, i) => (
          <div key={i} className="mb-6 last:mb-0">
            <div className="flex justify-between mb-2 items-end">
              <div>
                <span className="font-bold text-lg">{c.concept}</span>
                <span className="ml-2 text-sm text-gray-500">Level {c.level}</span>
              </div>
              <span className="font-mono">{Math.round(c.mastery * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${c.mastery * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
