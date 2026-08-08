import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMusic, FaHome, FaMusic as FaPlaylist, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-700 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <FaMusic className="text-green-500 text-2xl" />
        <h1 className="text-2xl font-bold text-white">Luna</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate('/home')}
              className="w-full text-left flex items-center gap-3 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <FaHome /> Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/tracks')}
              className="w-full text-left flex items-center gap-3 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <FaMusic /> Tracks
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/playlists')}
              className="w-full text-left flex items-center gap-3 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <FaPlaylist /> Playlists
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/favorites')}
              className="w-full text-left flex items-center gap-3 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <FaHeart /> Favorites
            </button>
          </li>
        </ul>
      </nav>

      <div className="border-t border-gray-700 pt-4">
        <div className="text-white text-sm mb-4">
          <p className="font-semibold">{user?.username || 'Guest'}</p>
          <p className="text-gray-400 text-xs">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;