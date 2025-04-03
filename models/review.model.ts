import mongoose, { Schema } from "mongoose";
import { IReview } from "../interfaces/product.interface";

export const ReviewModel:Schema<IReview> = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String
    }
}, {collection: 'Review', timestamps: true})

const Review = mongoose.model('Review', ReviewModel);
export default Review;