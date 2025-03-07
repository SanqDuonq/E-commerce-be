import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.route';
import prodRoutes from './routes/product.route';
import imgRoutes from './routes/upload.route';
import cartRoutes from './routes/cart.route';
import cateRoutes from './routes/category.route';
import NotFoundRoute from './middlewares/not-found.middleware';
import connectCloudinary from './utils/cloudinary';
import Database from './databases/database';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use('/api/auth',authRoutes);
app.use('/api/cate',cateRoutes);
app.use('/api/prod',prodRoutes);
app.use('/api/img',imgRoutes);
app.use('/api/cart',cartRoutes);


app.use(NotFoundRoute);

const database = Database.getInstance();

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
    database.connectMongoDB();    
    connectCloudinary();
})