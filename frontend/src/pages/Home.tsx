import React from 'react';
import { FaMusic } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="flex flex-col items-center justify-center h-screen">
        <FaMusic className="text-green-500 text-6xl mb-4" />
        <h1 className="text-5xl font-bold text-white mb-4">🌙 Luna</h1>
        <p className="text-xl text-gray-400 mb-8">Your Music, Your Way</p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/tracks')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Explore Music
          </button>
          <button
            onClick={() => navigate('/playlists')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            My Playlists
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;