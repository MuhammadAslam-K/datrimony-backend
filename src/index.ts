
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectToDatabase } from '@config/database/mongoose';
import apiRoutes from '@routes/index';
import { logger } from '@utils/logger';
import { setupSocketServer } from '@config/websocket/socketServer';
import { connectRedis } from '@config/database/redis';

// Express app setup
const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Datrimony backend is running' });
});


(async () => {
  try {
    // Connect MongoDB
    await connectToDatabase();
    logger.info('Connected to MongoDB database ✅');

    // Connect Redis
    // await connectRedis();
    // logger.info('Connected to Redis server ✅');

    // Start HTTP server
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      logger.info(`API server running on port ${PORT}`);
    });

    // Setup Socket.io server
    const CHAT_PORT = parseInt(process.env.CHAT_PORT || '4000');
    setupSocketServer(CHAT_PORT);

  } catch (error) {
    logger.error('Startup failure:', error);
    process.exit(1);
  }
})();

export { app };