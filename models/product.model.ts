import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const ProductModel:Schema<IProduct> = new Schema({
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
    ],
    popular: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
    
}, {collection: 'Product'})

const Product = mongoose.model('Product',ProductModel);
export default Product;

