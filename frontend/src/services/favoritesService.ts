import api from './api';

export const favoritesService = {
  getFavorites: () => api.get('/favorites'),

  addToFavorites: (trackId: string) =>
    api.post(`/favorites/${trackId}`),

  removeFromFavorites: (trackId: string) =>
    api.delete(`/favorites/${trackId}`),
};