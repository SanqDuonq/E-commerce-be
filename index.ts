import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectMongoDB from './databases/mongoDB';
import authRoutes from './routes/auth.route';
import prodRoutes from './routes/product.route';
import cateRoutes from './routes/category.route';
import NotFoundRoute from './middlewares/not-found.middleware';
import connectCloudinary from './utils/cloudinary';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/auth',authRoutes);
app.use('/api/cate',cateRoutes);
app.use('/api/prod',prodRoutes);

app.use(NotFoundRoute);

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
    connectMongoDB();
    connectCloudinary();
})