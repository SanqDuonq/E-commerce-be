export interface IConfig {
    PORT: string | number;
    MongoURI: string;
    CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;
    CLOUDINARY_NAME?: string;
    ACCESS_TOKEN?: string;
    NODE_ENV?: string;
    EMAIL_USER?: string;
    EMAIL_PASS?: string;
    UPSTASH_REDIS_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
}