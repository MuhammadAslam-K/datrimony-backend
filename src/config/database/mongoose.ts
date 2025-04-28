
import mongoose from 'mongoose';
import { logger } from '@utils/logger';

// MongoDB connection options
const options = {
  autoIndex: true,
  serverSelectionTimeoutMS: 5000,
};

/**
 * Connects to MongoDB database using environment variables
 */
export const connectToDatabase = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/datrimony';
    await mongoose.connect(uri, options);
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
};

/**
 * Disconnects from MongoDB database
 */
export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
};

// Gracefully close MongoDB connection when process is terminated
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to app termination');
  process.exit(0);
});
