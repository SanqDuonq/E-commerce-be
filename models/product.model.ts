import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const ProductModel:Schema<IProduct> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    badge: {
        type: String,
        enum: ['Best Seller', 'Limited Edition', null],
        default: null
    },
    status: {
        type: String,
        enum: ['New', null],
        default: null
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productDetail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ProductDetail'
    }
}, {collection: 'Product', timestamps: true})

const Product = mongoose.model('Product',ProductModel);
export default Product;

