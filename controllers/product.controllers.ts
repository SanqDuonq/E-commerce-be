import {Request,Response} from 'express'
import asyncError from '../middlewares/error.middleware';
import productServices from '../services/product.services';
import returnRes from '../utils/response';

class ProductController {
    addProduct = asyncError(async (req: Request, res: Response) =>  {
        const {name, thumbnail, price, badge, status,category, productDetail} = req.body;
        const data = await productServices.createProduct({name,thumbnail,price,badge,status,category, productDetail});
        returnRes(res, 201, 'Add product successful', data);
    })

    async removeProduct(req: Request, res: Response) {
        
    }
    async getAllProduct(req: Request, res: Response) {
        
    }
}

const productController = new ProductController();
export default productController;