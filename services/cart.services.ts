import cartRepository from "../repository/cart.repository";

class CartServices {
    async getCart(userId: string) {
        let cart = await cartRepository.getCartFromCache(userId);
        if (!cart) {
            cart = await cartRepository.getCartFromDB(userId) || {userId, items: []}
            await cartRepository.setCartToCache(userId,cart);
        }
        return cart;
    }

    async addToCart(userId: string, productId: string, quantity: number) {
        let cart = await this.getCart(userId);
        const existingItem = cart.items.find((item: any) => String(item.productId) === String(productId));
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({productId, quantity})
        }
        await cartRepository.setCartToCache(userId, cart);
        await cartRepository.saveCartToDB(userId, cart);
        return cart;
    }

    async updateCart(userId: string, productId: string, quantity: number) {
        return await cartRepository.updateCart(userId, productId, quantity);
    }

    async removeCart(userId: string, productId: string) {
        return await cartRepository.removeCart(userId, productId)
    }

    async clearCart(userId: string) {
        return await cartRepository.deleteCart(userId);
    }
}

export default new CartServices();