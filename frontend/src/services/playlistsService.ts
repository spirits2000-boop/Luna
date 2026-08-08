import api from './api';

export const playlistsService = {
  getPlaylists: () => api.get('/playlists'),

  getPlaylist: (id: string) => api.get(`/playlists/${id}`),

  createPlaylist: (name: string, description: string, is_public: boolean) =>
    api.post('/playlists', { name, description, is_public }),

  updatePlaylist: (id: string, name: string, description: string, is_public: boolean) =>
    api.put(`/playlists/${id}`, { name, description, is_public }),

  deletePlaylist: (id: string) => api.delete(`/playlists/${id}`),

  addTrackToPlaylist: (playlistId: string, trackId: string) =>
    api.post(`/playlists/${playlistId}/tracks`, { track_id: trackId }),

  removeTrackFromPlaylist: (playlistId: string, trackId: string) =>
    api.delete(`/playlists/${playlistId}/tracks/${trackId}`),
};