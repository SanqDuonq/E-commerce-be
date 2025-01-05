declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number,
        MongoURI: string,
        CLOUDINARY_API_KEY: string,
        CLOUDINARY_API_SECRET: string,
        CLOUDINARY_NAME: string
    }
}