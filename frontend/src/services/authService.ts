import api from './api';

export const authService = {
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),

  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  getCurrentUser: () => api.get('/auth/me'),
};