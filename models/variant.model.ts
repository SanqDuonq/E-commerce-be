import mongoose, { Schema } from "mongoose";
import { IVariant } from "../interfaces/product.interface";

export const VariantModel = new Schema<IVariant>({
    image: {
        type: [String],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true   
    },
    material: {
        type: String,
        required: true
    }
}, {collection: 'Variant', timestamps: true, _id: false});

const Variants = mongoose.model('Variant', VariantModel);
export default Variants;

