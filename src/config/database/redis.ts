import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://localhost:6379', // If Docker, use the correct host if needed
});

redisClient.on('error', (err: any) => console.error('Redis Client Error', err));

const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log('Connected to Redis ✅');
    }
};

export { redisClient, connectRedis };
