import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const ProductModel:Schema<IProduct> = new Schema({
    name: {
        type: String,
        required: true,
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
        enum: ['News', null],
        default: null
    },
    productDetail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ProductDetail'
    }
}, {collection: 'Product'})

const Product = mongoose.model('Product',ProductModel);
export default Product;

