// import Redis from "ioredis";
// import { ICart } from "../interfaces/cart.interface";

// class CartRepository {
//     private readonly cartKey = (userId: string) => `cart:${userId}`;

//     async getCart(userId: string): Promise<string | null> {
//         return await Redis.get(this.cartKey(userId));
//     }

//     async saveCart(cart: ICart): Promise<void> {
        
//         await redis.set(this.cartKey(cart.userId), JSON.stringify(cart), { ex: 86400 });
//     }

//     async clearCart(userId: string): Promise<void> {
//         await redis.del(this.cartKey(userId));
//     }
// }

// export default new CartRepository();