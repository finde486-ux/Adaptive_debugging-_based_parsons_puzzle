import React, { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import api from '../../lib/api';

const HomePage = () => {
  const { user, setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [setUser, setLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">DebugQuest Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome back, {user.displayName}!</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded shadow">
              <h2 className="font-bold">XP</h2>
              <p>{user.xp}</p>
            </div>
            <div className="p-4 border rounded shadow">
              <h2 className="font-bold">Streak</h2>
              <p>{user.streak?.current} days</p>
            </div>
            <div className="p-4 border rounded shadow">
              <h2 className="font-bold">Overall Level</h2>
              <p>Level {user.languages?.[0]?.overallLevel || 1}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Please log in to see your progress.</p>
          <a href="http://localhost:3001/auth/google" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Log in with Google
          </a>
        </div>
      )}
    </div>
  );
};

export default HomePage;
