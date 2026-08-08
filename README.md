# Luna - Music Streaming Platform

🎵 A modern, full-stack music streaming application built with React, Express, and PostgreSQL.

## Features

✨ **Core Features:**
- User authentication (Register, Login)
- Browse and search music tracks
- Create and manage playlists
- Add/remove favorites
- Music player with playback controls
- Volume control
- Track queue management
- User profiles and public playlists

🎨 **Tech Stack:**
- **Frontend:** React 18, TypeScript, Tailwind CSS, Zustand (State Management)
- **Backend:** Express.js, TypeScript, PostgreSQL
- **Tools:** Docker, Docker Compose

## Project Structure

```
Luna/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API services
│   │   ├── store/           # Zustand state management
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                  # Express Backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & error middleware
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   ├── config/          # Configuration
│   │   ├── types/           # TypeScript types
│   │   └── index.ts         # Entry point
│   ├── database/
│   │   ├── schema.sql       # Database schema
│   │   └── seed.sql         # Sample data
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml       # Docker compose configuration
├── README.md
└── .gitignore
```

## Installation

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (if running without Docker)

### Using Docker (Recommended)

1. **Clone the repository:**
```bash
git clone https://github.com/spirits2000-boop/Luna.git
cd Luna
```

2. **Start services with Docker Compose:**
```bash
docker-compose up -d
```

This will start:
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`
- PostgreSQL Database

3. **Initialize the database:**
```bash
docker exec luna_backend npm run db:seed
```

### Manual Installation

#### Backend Setup

1. **Navigate to backend:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Update `.env` with your database credentials**

5. **Initialize database:**
```bash
psql -U postgres -f database/schema.sql
psql -U postgres -f database/seed.sql
```

6. **Start the backend:**
```bash
npm run dev
```

Backend will be available at `http://localhost:5000`

#### Frontend Setup

1. **Navigate to frontend:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
echo "REACT_APP_API_URL=http://localhost:5000" > .env
```

4. **Start the frontend:**
```bash
npm start
```

Frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tracks
- `GET /api/tracks` - Get all tracks
- `GET /api/tracks/:id` - Get track by ID
- `GET /api/tracks/search/query?q=` - Search tracks
- `GET /api/tracks/artist/:artist` - Get tracks by artist

### Playlists
- `GET /api/playlists` - Get user's playlists (protected)
- `GET /api/playlists/:id` - Get playlist with tracks
- `POST /api/playlists` - Create playlist (protected)
- `PUT /api/playlists/:id` - Update playlist (protected)
- `DELETE /api/playlists/:id` - Delete playlist (protected)
- `POST /api/playlists/:id/tracks` - Add track to playlist (protected)
- `DELETE /api/playlists/:id/tracks/:trackId` - Remove track from playlist (protected)

### Favorites
- `GET /api/favorites` - Get user's favorites (protected)
- `POST /api/favorites/:trackId` - Add to favorites (protected)
- `DELETE /api/favorites/:trackId` - Remove from favorites (protected)

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/playlists` - Get public playlists

## Default Test Credentials

```
Username: john_doe
Email: john@example.com
Password: password123
```

## Available Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build TypeScript
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://luna_user:luna_password@localhost:5432/luna_db
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts
- `tracks` - Music tracks
- `playlists` - User playlists
- `playlist_tracks` - Tracks in playlists
- `favorites` - User favorite tracks
- `play_history` - Track play history

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please open an issue on GitHub.

---

🌙 **Luna** - Your Music, Your Way