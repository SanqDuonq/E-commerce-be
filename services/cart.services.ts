// import { ICart, ICartItem } from "../interfaces/cart.interface";
// import cartRepository from "../repository/cart.repository";

// class CartServices {
//     private async checkExistProduct(cart: ICart, productId: string, quantity: number) {
//         const existProduct = cart.items.find((item: ICartItem) => item.productId === productId);
//         existProduct ? existProduct.quantity = quantity : cart.items.push({ productId, quantity });
//         return cart;
//     }

//     async addToCart(userId: string, items: ICartItem) {
        
//     }

//     async getCart(userId: string) {
//         const cart = await cartRepository.getCart(userId);
//         return cart ? JSON.parse(cart) : {userId, items: []}
//         return await cartRepository.getCart(userId);
//     }

// }

// export default new CartServices();
