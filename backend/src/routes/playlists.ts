import express, { Request, Response } from 'express';
import { query } from '../config/database';
import { AuthRequest, authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get user playlists
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM playlists WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get playlist by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const playlistResult = await query('SELECT * FROM playlists WHERE id = $1', [id]);
    if (playlistResult.rows.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const tracksResult = await query(
      `SELECT t.* FROM tracks t
       JOIN playlist_tracks pt ON t.id = pt.track_id
       WHERE pt.playlist_id = $1
       ORDER BY pt.added_at DESC`,
      [id]
    );

    res.json({
      ...playlistResult.rows[0],
      tracks: tracksResult.rows
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create playlist
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, is_public } = req.body;
    const playlistId = require('crypto').randomUUID();

    const result = await query(
      'INSERT INTO playlists (id, user_id, name, description, is_public) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [playlistId, req.user.userId, name, description, is_public || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update playlist
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, is_public } = req.body;

    // Check ownership
    const playlistCheck = await query('SELECT user_id FROM playlists WHERE id = $1', [id]);
    if (playlistCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    if (playlistCheck.rows[0].user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const result = await query(
      'UPDATE playlists SET name = $1, description = $2, is_public = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [name, description, is_public, id]
    );
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete playlist
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check ownership
    const playlistCheck = await query('SELECT user_id FROM playlists WHERE id = $1', [id]);
    if (playlistCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    if (playlistCheck.rows[0].user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await query('DELETE FROM playlist_tracks WHERE playlist_id = $1', [id]);
    await query('DELETE FROM playlists WHERE id = $1', [id]);
    res.json({ message: 'Playlist deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add track to playlist
router.post('/:id/tracks', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { track_id } = req.body;

    // Check ownership
    const playlistCheck = await query('SELECT user_id FROM playlists WHERE id = $1', [id]);
    if (playlistCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    if (playlistCheck.rows[0].user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const playlistTrackId = require('crypto').randomUUID();
    await query(
      'INSERT INTO playlist_tracks (id, playlist_id, track_id) VALUES ($1, $2, $3)',
      [playlistTrackId, id, track_id]
    );
    res.status(201).json({ message: 'Track added to playlist' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Remove track from playlist
router.delete('/:id/tracks/:trackId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id, trackId } = req.params;

    // Check ownership
    const playlistCheck = await query('SELECT user_id FROM playlists WHERE id = $1', [id]);
    if (playlistCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    if (playlistCheck.rows[0].user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await query('DELETE FROM playlist_tracks WHERE playlist_id = $1 AND track_id = $2', [id, trackId]);
    res.json({ message: 'Track removed from playlist' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;