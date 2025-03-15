import mongoose, { Schema } from "mongoose";
import { IProductVariant } from "../interfaces/product.interface";

const ProductVariantModel: Schema<IProductVariant> = new Schema({
	options: [
		{
			image: { type: String, required: true },
			color: { type: String, required: true },
			stock: { type: Number, required: true },
            price: { type: Number, required: true },
			size: { type: String, required: true },
			material: { type: String, required: true },
		},
	],
	shape: [
		{
			type: String,
			required: true,
		},
	],
});

const ProductVariant = mongoose.model('ProductVariant',ProductVariantModel);
export default ProductVariant;