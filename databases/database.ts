import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class Database {
    private static instance: Database;

    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connectMongoDB() {
        try {
            const connect = await mongoose.connect(process.env.MongoURI!);
            console.log(`Connected successful mongoDB ${connect.connection.host}`);
        } catch (error) {
            console.log(`Connected failed mongoDB ${error}`)
        }
    }
}

export default Database;