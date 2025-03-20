import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

export const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN
})

async function connectRedis() {
    try {
        const pingRes = await redis.ping();
        console.log(`Connected successful redis ${pingRes}`)
    } catch (error) {
        console.log(`Connected failed redis ${error}`)
    }
}

export default connectRedis;