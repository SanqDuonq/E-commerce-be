import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productModel:Schema<IProduct> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    color: [
        {
            type: String
        }
    ]
}, {collection: 'product'})

const Product = mongoose.model('Product',productModel);
export default Product;

