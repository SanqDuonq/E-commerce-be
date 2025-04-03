import mongoose, { Schema } from "mongoose";
import { ICart } from "../interfaces/cart.interface";

const cartModel = new Schema<ICart>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
}, {collection: 'Cart', timestamps: true})

const Cart = mongoose.model('Cart', cartModel);
export default Cart;