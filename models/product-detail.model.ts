import mongoose, { Schema } from "mongoose";
import { IProductDetail } from "../interfaces/product.interface";

const ProductDetailModel:Schema<IProductDetail> = new Schema({
    description: {
        type: String,
        required: true
    },
    variant: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant'
        }
    ]
},{collection: 'ProductDetail'});

const ProductDetail = mongoose.model('ProductDetail',ProductDetailModel);
export default ProductDetail;
