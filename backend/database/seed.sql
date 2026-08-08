-- Insert sample users
INSERT INTO users (id, username, email, password, avatar, bio) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'john_doe', 'john@example.com', '$2a$10$KIX.KZCpJIo/eUzP9qKBtuqOlQrPsKPfhxsE0w9cJUhqDtJEzL2w2', 'https://via.placeholder.com/150', 'Music lover'),
  ('550e8400-e29b-41d4-a716-446655440002', 'jane_smith', 'jane@example.com', '$2a$10$KIX.KZCpJIo/eUzP9qKBtuqOlQrPsKPfhxsE0w9cJUhqDtJEzL2w2', 'https://via.placeholder.com/150', 'DJ and producer'),
  ('550e8400-e29b-41d4-a716-446655440003', 'alex_beats', 'alex@example.com', '$2a$10$KIX.KZCpJIo/eUzP9qKBtuqOlQrPsKPfhxsE0w9cJUhqDtJEzL2w2', 'https://via.placeholder.com/150', 'Beats collector')
ON CONFLICT DO NOTHING;

-- Insert sample tracks
INSERT INTO tracks (id, title, artist, album, duration, file_url, cover_url, genre, plays_count) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', 'Midnight Dreams', 'Luna Echo', 'Night Vibes', 240, 'https://example.com/track1.mp3', 'https://via.placeholder.com/300', 'Electronic', 1250),
  ('550e8400-e29b-41d4-a716-446655440011', 'Electric Soul', 'The Vibes', 'Soulful Beats', 210, 'https://example.com/track2.mp3', 'https://via.placeholder.com/300', 'Soul', 890),
  ('550e8400-e29b-41d4-a716-446655440012', 'Summer Breeze', 'Chill Beats', 'Relaxation', 195, 'https://example.com/track3.mp3', 'https://via.placeholder.com/300', 'Chill', 2100),
  ('550e8400-e29b-41d4-a716-446655440013', 'Night Sky', 'Luna Echo', 'Night Vibes', 220, 'https://example.com/track4.mp3', 'https://via.placeholder.com/300', 'Electronic', 1540),
  ('550e8400-e29b-41d4-a716-446655440014', 'Urban Jungle', 'Hip Hop Masters', 'City Sounds', 200, 'https://example.com/track5.mp3', 'https://via.placeholder.com/300', 'Hip Hop', 3200)
ON CONFLICT DO NOTHING;

-- Insert sample playlists
INSERT INTO playlists (id, user_id, name, description, is_public) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440001', 'My Favorites', 'My favorite tracks', true),
  ('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440002', 'Chill Vibes', 'Relaxing music', true),
  ('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440003', 'Workout Mix', 'Energy for gym', false)
ON CONFLICT DO NOTHING;

-- Insert sample playlist tracks
INSERT INTO playlist_tracks (id, playlist_id, track_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010'),
  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440011'),
  ('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440012'),
  ('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440013')
ON CONFLICT DO NOTHING;
