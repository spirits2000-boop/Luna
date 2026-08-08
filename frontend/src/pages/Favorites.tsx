import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { favoritesService } from '../services/favoritesService';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover_url?: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await favoritesService.getFavorites();
        setFavorites(response.data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 mt-8">Loading favorites...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <FaHeart className="text-red-500 text-3xl" />
        <h1 className="text-3xl font-bold text-white">Favorite Tracks</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-400 mt-12">
          <p className="text-lg">No favorite tracks yet</p>
          <p className="text-sm mt-2">Add tracks to your favorites to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((track) => (
            <div key={track.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
              {track.cover_url && (
                <img
                  src={track.cover_url}
                  alt={track.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-white font-bold mb-2">{track.title}</h3>
              <p className="text-gray-400 text-sm">{track.artist}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;