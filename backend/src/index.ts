import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { pool } from './config/database';
import authRoutes from './routes/auth';
import tracksRoutes from './routes/tracks';
import playlistsRoutes from './routes/playlists';
import favoritesRoutes from './routes/favorites';
import usersRoutes from './routes/users';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tracks', tracksRoutes);
app.use('/api/playlists', playlistsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Luna Backend is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌙 Luna Backend is running on http://localhost:${PORT}`);
});

export default app;