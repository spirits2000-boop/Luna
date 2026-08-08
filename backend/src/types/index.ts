export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  file_url: string;
  cover_url?: string;
  genre?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Playlist {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  cover_url?: string;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface PlaylistTrack {
  id: string;
  playlist_id: string;
  track_id: string;
  added_at: Date;
}

export interface Favorite {
  id: string;
  user_id: string;
  track_id: string;
  created_at: Date;
}