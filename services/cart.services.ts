import { ICart, ICartItem } from "../interfaces/cart.interface";
import cartRepository from "../repository/cart.repository";

class CartServices {
    private async checkExistProduct(cart: ICart, productId: string, quantity: number) {
        const existProduct = cart.items.find((item: ICartItem) => item.productId === productId);
        existProduct ? existProduct.quantity = quantity : cart.items.push({ productId, quantity });
        return cart;
    }

    async addToCart(userId: string, productId: string, quantity: number = 1) {
        const cart = await cartRepository.getCart(userId);
        const updateCart = await this.checkExistProduct(cart, productId, quantity);
        await cartRepository.saveCart(updateCart);
        return cart;
    }
}

export default new CartServices();
