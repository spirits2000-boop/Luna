import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { playlistsService } from '../services/playlistsService';

interface Playlist {
  id: string;
  name: string;
  description?: string;
  is_public: boolean;
}

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await playlistsService.getPlaylists();
        setPlaylists(response.data);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await playlistsService.createPlaylist(
        newPlaylist.name,
        newPlaylist.description,
        false
      );
      setPlaylists([...playlists, response.data]);
      setNewPlaylist({ name: '', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 mt-8">Loading playlists...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">My Playlists</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition"
        >
          <FaPlus /> New Playlist
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreatePlaylist}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <input
            type="text"
            placeholder="Playlist name"
            value={newPlaylist.name}
            onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={newPlaylist.description}
            onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gradient-to-br from-purple-600 to-purple-900 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-white font-bold text-xl mb-2">{playlist.name}</h3>
            {playlist.description && (
              <p className="text-gray-300 text-sm mb-4">{playlist.description}</p>
            )}
            <p className="text-gray-400 text-xs">
              {playlist.is_public ? 'Public' : 'Private'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;