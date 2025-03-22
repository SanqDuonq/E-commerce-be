// import { Request, Response} from 'express'
// import asyncError from '../middlewares/error.middleware';
// import cartServices from '../services/cart.services';
// import returnRes from '../utils/response';

// class CartController {
//     // add = asyncError(async(req: Request, res: Response) => {
//     //     const {userId, items} = req.body;
//     //     const data = await cartServices.addToCart(userId,items);
//     //     returnRes(res,200,'Add to cart successful', data);
//     // })

//     get = asyncError(async(req: Request, res: Response) => {
//         const {userId} = req.params;
//         const data = await cartServices.getCart(userId) ;
//         returnRes(res,200,'Get cart successful',data);
//     })

//     update = asyncError(async(req: Request, res: Response) => {

//     })

//     remove = asyncError(async(req: Request, res: Response) => {

//     })

//     clear = asyncError(async(req: Request, res: Response) => {

//     })
// }

// const cartController = new CartController();
// export default cartController;