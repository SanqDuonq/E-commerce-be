import { redis } from "../databases/redis";
import Cart from "../models/cart.model";

class CartRepository {
    async getCartFromCache(userId: string) {
        const redisCart = await redis.get(`cart:${userId}`);
        return redisCart ? JSON.parse(redisCart) : null
    }

    async setCartToCache(userId: string, cart: any) {
        if (cart && cart.items.length > 0) {
            await redis.set(`cart:${userId}`, JSON.stringify(cart), "EX", 3600);
        } else {
            await redis.del(`cart:${userId}`); 
        }
    }

    async getCartFromDB(userId: string) {
        return await Cart.findOne({userId})
    }

    async saveCartToDB(userId: string, cart: any) {
        return await Cart.findOneAndUpdate({userId},  { $set: { items: cart.items } }, {upsert: true, new: true})
    }

    async deleteCart(userId: string) {
        await redis.del(`cart:${userId}`);
        await Cart.deleteOne({userId});
    }

    async removeCart(userId: string, productId: string) {
        let cart = await this.getCartFromCache(userId);
        if (!cart) {
            cart = await this.getCartFromDB(userId);
        }
        if (!cart) return null;

        cart.items = cart.items.filter((item: any) => String(item.productId) !== String(productId));

        await this.saveCartToDB(userId, cart);
        await this.setCartToCache(userId, cart);

        return cart;
    }

    async updateCart(userId: string, productId: string, quantity: number) {
        let cart = await this.getCartFromCache(userId);
        if (!cart) {
            cart = await this.getCartFromDB(userId);
        }
        if (!cart) return null;
    
        if (quantity === 0) {
            return await this.removeCart(userId, productId);
        }
    
        const item = cart.items.find((item: any) => String(item.productId) === String(productId));
        if (item) {
            item.quantity = quantity;
        } else {
            return null;
        }
    
        await this.saveCartToDB(userId, cart);
        await this.setCartToCache(userId, cart);
    
        return cart;
    }
    

}

export default new CartRepository();