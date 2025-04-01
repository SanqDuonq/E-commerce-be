import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import prodRoutes from './routes/product.route';
import imgRoutes from './routes/upload.route';
import cartRoutes from './routes/cart.route';
import cateRoutes from './routes/category.route';
import NotFoundRoute from './middlewares/not-found.middleware';
import connectCloudinary from './utils/cloudinary';
import errorHandler from './utils/error-handle';
import './utils/passport';
import connectRedis from './databases/redis';
import passport from 'passport';
import connectMongoDB from './databases/mongo';
import { configManager } from './singleton/singleton.config';
dotenv.config();

const app = express();
const port = configManager.get('PORT');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(passport.initialize());
app.use('/api/auth',authRoutes);
app.use('/api/cate',cateRoutes);
app.use('/api/prod',prodRoutes);
app.use('/api/img',imgRoutes);
app.use('/api/cart',cartRoutes);

app.use(errorHandler);
app.use(NotFoundRoute);


app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
    connectMongoDB();
    connectRedis();
    connectCloudinary();
})