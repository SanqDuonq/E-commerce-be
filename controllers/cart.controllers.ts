import { Request, Response} from 'express';
import asyncError from '../middlewares/error.middleware';
import cartServices from '../services/cart.services';
import returnRes from '../utils/response';

class CartController {
    add = asyncError(async (req: Request, res: Response) => {
        const userId = req.user;
        const {productId, quantity} = req.body;
        const cart = await cartServices.addToCart(userId!,productId,quantity);
        returnRes(res, 200, 'Add to cart successful', cart);
    })      
    
    get = asyncError(async (req: Request, res: Response) => {
        const userId =  req.user;
        const cart = await cartServices.getCart(userId!);
        returnRes(res, 200, 'Get cart successful', cart);
    })

    update = asyncError(async (req: Request, res: Response) => {
        const userId = req.user;
        const {quantity, productId} = req.body;
        const data = await cartServices.updateCart(userId!, productId, quantity);
        returnRes(res, 200, 'Update cart successful', data);  
    })

    remove = asyncError(async (req: Request, res: Response) => {
        const userId = req.user;
        const {productId} = req.body;
        const data = await cartServices.removeCart(userId!,productId);
        returnRes(res, 200, 'Remove cart successful', data);
    })

    clear = asyncError(async (req: Request, res: Response) => {
        const {userId} = req.body;
        await cartServices.clearCart(userId);
        returnRes(res, 200, 'Clear cart successful')
    })
}

export default new CartController();