import React, { useEffect, useState } from 'react';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { tracksService } from '../services/tracksService';
import { favoritesService } from '../services/favoritesService';
import { usePlayerStore } from '../store/playerStore';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover_url?: string;
}

const Tracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const setCurrentTrack = usePlayerStore((state) => state.setCurrentTrack);
  const setQueue = usePlayerStore((state) => state.setQueue);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await tracksService.getTracks();
        setTracks(response.data);
        setQueue(response.data);
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
  };

  const handleFavorite = async (trackId: string) => {
    try {
      if (favorites.has(trackId)) {
        await favoritesService.removeFromFavorites(trackId);
        const newFavorites = new Set(favorites);
        newFavorites.delete(trackId);
        setFavorites(newFavorites);
      } else {
        await favoritesService.addToFavorites(trackId);
        setFavorites(new Set([...favorites, trackId]));
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 mt-8">Loading tracks...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Popular Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
            {track.cover_url && (
              <img
                src={track.cover_url}
                alt={track.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-white font-bold mb-2">{track.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{track.artist}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePlay(track)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition"
              >
                <FaPlay size={14} />
                Play
              </button>
              <button
                onClick={() => handleFavorite(track.id)}
                className={`px-4 py-2 rounded font-bold transition ${
                  favorites.has(track.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracks;