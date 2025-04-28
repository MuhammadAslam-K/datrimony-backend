
# Datrimony Backend Server

A Node.js/Express/MongoDB backend for the Datrimony matchmaking application.

## Architecture

This project follows clean architecture principles:

- **config** : Configuration (Database connection, environment setup, third-party services setup)
- **controllers** : Handle network request and response, map input/output between service and client
- **middlewares** : Custom Express middlewares (authentication, error handling, validation, logging, etc.)
- **models** : MongoDB schema definitions using Mongoose
- **repositories** : Abstract database operations (MongoDB queries like create, find, update, delete)
- **routers** : Define API endpoints and routes, connect them to controllers
- **services** : Business logic layer, orchestrating repositories and other operations
- **utils** : Utility/helper functions (e.g., OTP generation, email sending, encryption utilities)
- **validation** : Data validation schemas (e.g., Joi or Zod schemas for incoming API requests)

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