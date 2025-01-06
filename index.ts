import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectMongoDB from './databases/mongoDB';
import authRoutes from './routes/auth.route';
import NotFoundRoute from './middlewares/not-found-route';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/auth',authRoutes);
app.use(NotFoundRoute);

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
    connectMongoDB();
})