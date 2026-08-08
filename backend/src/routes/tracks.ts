import express, { Request, Response } from 'express';
import { query } from '../config/database';
import { AuthRequest, authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get all tracks
router.get('/', async (req: Request, res: Response) => {
  try {
    const { limit = 50, offset = 0, genre } = req.query;
    let sql = 'SELECT * FROM tracks';
    const params: any[] = [];

    if (genre) {
      sql += ' WHERE genre = $1';
      params.push(genre);
    }

    sql += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get track by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM tracks WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Search tracks
router.get('/search/query', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchTerm = `%${q}%`;
    const result = await query(
      `SELECT * FROM tracks WHERE title ILIKE $1 OR artist ILIKE $1 OR album ILIKE $1 LIMIT 50`,
      [searchTerm]
    );
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get track by artist
router.get('/artist/:artist', async (req: Request, res: Response) => {
  try {
    const { artist } = req.params;
    const result = await query('SELECT * FROM tracks WHERE artist ILIKE $1', [`%${artist}%`]);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create track (admin only)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, artist, album, duration, file_url, cover_url, genre } = req.body;
    const trackId = require('crypto').randomUUID();

    const result = await query(
      'INSERT INTO tracks (id, title, artist, album, duration, file_url, cover_url, genre) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [trackId, title, artist, album, duration, file_url, cover_url, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;