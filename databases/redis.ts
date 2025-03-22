import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_URL!);

const connectRedis = async () => {
    try {
        await redis.ping();
        console.log(`Connected successful redis ${redis.options.host}`);
    } catch (error) {
        console.log(`Connected failed redis ${error}`);
    }
}

export default connectRedis;