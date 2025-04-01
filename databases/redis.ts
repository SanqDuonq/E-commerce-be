import Redis from 'ioredis';
import dotenv from 'dotenv';
import { configManager } from '../singleton/singleton.config';
dotenv.config();

export const redis = new Redis(configManager.get('UPSTASH_REDIS_URL'));

const connectRedis = async () => {
    try {
        await redis.ping();
        console.log(`Connected successful redis ${redis.options.host}`);
    } catch (error) {
        console.log(`Connected failed redis ${error}`);
    }
}

export default connectRedis;