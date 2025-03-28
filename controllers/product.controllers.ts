import {Request,Response} from 'express'
import asyncError from '../middlewares/error.middleware';
import productServices from '../services/product.services';
import returnRes from '../utils/response';
import mongoose from 'mongoose';

class ProductController {
    addProduct = asyncError(async (req: Request, res: Response) =>  {
        const data = await productServices.createProduct(req.body);
        returnRes(res, 201, 'Add product successful', data);
    })

    async removeProduct(req: Request, res: Response) {
        const data = await productServices.removeProduct(new mongoose.Types.ObjectId(req.params.id));
        returnRes(res, 200, `Remove ${data!.name} successful`);
    }
    
    async getAllProduct(req: Request, res: Response) {
        const {name, page = 1, size = 10} = req.params;
        const data = await productServices.getProduct(name, Number(page), Number(size));
        returnRes(res, 200, 'Get all product successful', data);
    }
}

const productController = new ProductController();
export default productController;