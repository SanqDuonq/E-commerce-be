import mongoose from 'mongoose'
async function connectMongoDB() {
    try {
        const connect = await mongoose.connect(process.env.MongoURI!);
        console.log(`Connected mongoDB success: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Connected mongoDB fail: ${error}`);
    }
}

export default connectMongoDB;