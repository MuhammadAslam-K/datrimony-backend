
# Datrimony Backend Server

A clean architecture Node.js/Express/MongoDB backend for the Datrimony matchmaking application.

## Architecture

This project follows clean architecture principles:

- **Domain Layer**: Contains enterprise business rules and entities (models)
- **Use Case Layer**: Contains application business rules
- **Interface Layer**: Contains adapters, controllers, and routes 
- **Infrastructure Layer**: Contains frameworks and tools (Database, File Systems, etc.)

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update environment variables
4. Start development server:
   ```
   npm run dev
   ```

## Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run dev` - Start development server with hot reloading
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `node scripts/seed.js` - Seed the database with initial data

## API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/verify-email` - Verify email address 
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Matchmakers
- `GET /api/matchmakers` - Get all matchmakers
- `GET /api/matchmakers/:id` - Get matchmaker by ID
- `POST /api/matchmakers/:id/assign-user` - Assign user to matchmaker
- `POST /api/matchmakers/:id/remove-user` - Remove user from matchmaker
- `POST /api/matchmakers` - Create new matchmaker
- `PUT /api/matchmakers/:id` - Update matchmaker

## WebSocket Server

A separate WebSocket server runs for real-time chat functionality.

- Run with: `node chat-server.js`
- Default port: 4000
- Events:
  - `join_room`: Join a chat room
  - `send_message`: Send message to room
  - `typing`: Broadcast typing indicator
  - `disconnect`: Handle user disconnection

## Environment Variables

Required environment variables:

- `PORT`: API server port (default: 5000)
- `CHAT_PORT`: WebSocket server port (default: 4000)
- `NODE_ENV`: Environment (development, production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `JWT_EXPIRATION`: Token expiration time
- `FRONTEND_URL`: Frontend URL for CORS
