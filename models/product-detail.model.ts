import mongoose, { Schema } from "mongoose";
import { IProductDetail } from "../interfaces/product.interface";

interface IProductDetailDocument extends IProductDetail, Document {}

const ProductDetailModel = new Schema<IProductDetailDocument>({
    description: {
        type: String,
        required: true
    },
    variant: [
        {
            options: [
                {
                    image: { type: [String], required: true },
                    color: { type: String, required: true },
                    stock: { type: Number, required: true },
                    price: { type: Number, required: true },
                    size: { type: String, required: true },
                    material: { type: String, required: true },
                },
            ],
            shape: {
                type: [String],
                required: true,
                default: []
            }
        }
    ]
},{collection: 'ProductDetail'});

const ProductDetail = mongoose.model('ProductDetail',ProductDetailModel);
export default ProductDetail;
