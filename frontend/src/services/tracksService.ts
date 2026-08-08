import api from './api';

export const tracksService = {
  getTracks: (limit = 50, offset = 0) =>
    api.get('/tracks', { params: { limit, offset } }),

  getTrack: (id: string) => api.get(`/tracks/${id}`),

  searchTracks: (query: string) =>
    api.get('/tracks/search/query', { params: { q: query } }),

  getTracksByArtist: (artist: string) =>
    api.get(`/tracks/artist/${artist}`),
};