import dotenv from "dotenv";
import { IConfig } from "../interfaces/singleton.interface";
dotenv.config();

class ConfigManager {
	private static instance: ConfigManager;

	private readonly settings: IConfig;

	private constructor() {
		this.settings = {
			PORT: process.env.PORT!,
			MongoURI: process.env.MongoURI!,
			CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
			CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
			CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
			ACCESS_TOKEN: process.env.ACCESS_TOKEN,
			NODE_ENV: process.env.NODE_ENV,
			EMAIL_USER: process.env.EMAIL_USER,
			EMAIL_PASS: process.env.EMAIL_PASS,
			UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL!,
			GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
			GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
			GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
			GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
		};
	}

    public static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    public get<Data extends keyof IConfig>(key: Data): IConfig[Data] {
        return this.settings[key];
    }
}

export const configManager = ConfigManager.getInstance();
