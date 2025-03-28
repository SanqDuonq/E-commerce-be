import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import { VariantModel } from "./variant.model";
import { ReviewModel } from "./review.model";

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
    discount: {
        type: String,
        default: null
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
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    variants: {
        type: [VariantModel]
    },
    shape: {
        type: [String],
    },
    reviews: {
        type: [ReviewModel]
    }
}, {collection: 'Product', timestamps: true})

const Product = mongoose.model('Product',ProductModel);
export default Product;

