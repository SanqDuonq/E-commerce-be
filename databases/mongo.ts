import mongoose from 'mongoose';
import { configManager } from '../singleton/singleton.config';

const connectMongoDB = async () => {
    try {
        const connect = await mongoose.connect(configManager.get('MongoURI'));
        console.log(`Connected successful mongoDB ${connect.connection.host}`);
    } catch (error) {
        console.log(`Connected failed mongoDB ${error}`)
    }
}

export default connectMongoDB;


