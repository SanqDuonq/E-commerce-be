import { redis } from "../databases/redis"
import { ICart } from "../interfaces/cart.interface";

class CartRepository {
    private readonly cartKey = (userId: string) => `cart:${userId}`

    async getCart(userId: string) {
        const data = await redis.get(this.cartKey(userId));    
        const parsedData = typeof data === "string" ? JSON.parse(data) : { userId, items: [] };
        return parsedData;
    }

    async saveCart(cart: ICart) {
        await redis.set(`cart:${cart.userId}`, JSON.stringify(cart), {ex: 86400}) //* 24h
    }

    async clearCart(userId: string) {
        await redis.del(`cart:${userId}`);
    }
}

export default new CartRepository();