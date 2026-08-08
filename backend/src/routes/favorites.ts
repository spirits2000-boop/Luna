import express, { Request, Response } from 'express';
import { query } from '../config/database';
import { AuthRequest, authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get user favorites
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT t.* FROM tracks t
       JOIN favorites f ON t.id = f.track_id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add to favorites
router.post('/:trackId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { trackId } = req.params;
    const favoriteId = require('crypto').randomUUID();

    // Check if already favorited
    const existing = await query(
      'SELECT * FROM favorites WHERE user_id = $1 AND track_id = $2',
      [req.user.userId, trackId]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Track already in favorites' });
    }

    await query(
      'INSERT INTO favorites (id, user_id, track_id) VALUES ($1, $2, $3)',
      [favoriteId, req.user.userId, trackId]
    );
    res.status(201).json({ message: 'Added to favorites' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from favorites
router.delete('/:trackId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { trackId } = req.params;
    await query(
      'DELETE FROM favorites WHERE user_id = $1 AND track_id = $2',
      [req.user.userId, trackId]
    );
    res.json({ message: 'Removed from favorites' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;