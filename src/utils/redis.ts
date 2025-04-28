import { redisClient } from '@config/database/redis';

export const redisSet = async (key: string | number, value: any, expireInSec?: number) => {
    console.log('redisSet', key, value, expireInSec);

    const stringKey = String(key);  // 🛠 Make sure key is a string
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

    await redisClient.set(stringKey, stringValue);

    if (expireInSec) {
        await redisClient.expire(stringKey, expireInSec);
    }
};


export const redisGet = async (key: string) => {
    console.log('redisGet', key);
    const stringKey = String(key)

    const value = await redisClient.get(stringKey);
    return value ? JSON.parse(value) : null;
};

export const redisDelete = async (key: string) => {
    await redisClient.del(key);
};

export const redisUpdate = async (key: string, value: any) => {
    await redisSet(key, value);
};
