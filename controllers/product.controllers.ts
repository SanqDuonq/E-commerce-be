import {Request,Response} from 'express'
import asyncError from '../middlewares/error.middleware';
import productServices from '../services/product.services';
import {returnRes} from '../utils/response';
import mongoose from 'mongoose';
import { ProductQueryBuilder } from '../builder/product-builder';

class ProductController {
    addProduct = asyncError(async (req: Request, res: Response) =>  {
        const data = await productServices.createProduct(req.body);
        returnRes(res, 201, 'Add product successful', data);
    })

    editProduct = asyncError(async (req: Request, res: Response) => {
        const {id} = req.params;
        const data = await productServices.editProduct(id, req.body);
        returnRes(res, 200, 'Edit product successful', data!)
    })

    removeProduct = asyncError(async(req: Request, res: Response) => {
        const data = await productServices.removeProduct(new mongoose.Types.ObjectId(req.params.id));
        returnRes(res, 200, `Remove ${data!.name} successful`);
    })
    
    
    async getAllProduct(req: Request, res: Response) {
        const {name = '', page = 1, limit = 10, category='',badge='', size='', material='', 
            color='',shape='', status=''
        } = req.query;
        const {data, count} = await productServices.getProduct(String(name),Number(page),Number(limit),String(category),
            String(badge), String(size), String(material), String(color), String(shape), String(status))
        returnRes(res, 200, 'Get all product successful', {page, limit, count, data});
    }
}

const productController = new ProductController();
export default productController;