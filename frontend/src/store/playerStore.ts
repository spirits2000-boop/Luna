import { create } from 'zustand';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  file_url: string;
  cover_url?: string;
  genre?: string;
}

interface PlayerStore {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  currentIndex: number;
  volume: number;
  setCurrentTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  setQueue: (tracks: Track[]) => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,
  volume: 80,
  setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setQueue: (tracks) => set({ queue: tracks }),
  next: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.queue.length - 1),
      currentTrack: state.queue[state.currentIndex + 1] || state.currentTrack,
    })),
  previous: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
      currentTrack: state.queue[state.currentIndex - 1] || state.currentTrack,
    })),
  setVolume: (volume) => set({ volume }),
}));