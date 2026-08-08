import React from 'react';
import { usePlayerStore } from '../store/playerStore';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from 'react-icons/fa';

const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    play,
    pause,
    next,
    previous,
    setVolume,
  } = usePlayerStore();

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 text-center text-gray-400">
        No track selected
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-white font-bold">{currentTrack.title}</h3>
            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-center">
            <button
              onClick={previous}
              className="text-white hover:text-green-500 transition"
            >
              <FaBackward />
            </button>
            <button
              onClick={() => (isPlaying ? pause() : play())}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={next}
              className="text-white hover:text-green-500 transition"
            >
              <FaForward />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <FaVolumeUp className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-gray-400 text-sm">{volume}%</span>
          </div>
        </div>

        <div className="mt-2 bg-gray-700 rounded-full h-1">
          <div
            className="bg-green-500 h-1 rounded-full"
            style={{ width: '45%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;