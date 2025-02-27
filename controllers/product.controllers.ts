import {Request,Response} from 'express'
import productServices from '../services/product.services';
import catchError from '../utils/catch-error';
class ProductController {
    async addProduct(req: Request, res: Response) {
        try {
            const {name, image, thumbnail, description, price, stock, color, category,popular} = req.body;
            const prod = await productServices.addProduct({
                name, description, price, stock, color, category, popular, thumbnail, image
            })
            res.status(201).json({
                message: 'Add product successful',
                data: prod
            })
        } catch (error) {
            catchError(res,error);
        }
    }
    async removeProduct(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await productServices.removeProduct(id);
            res.status(200).json({
                message: 'Remove this product successful!'
            })
        } catch (error) {
            catchError(res,error)
        }
    }
    async getAllProduct(req: Request, res: Response) {
        try {
            const {page,size,name} = req.query;
            const prod = await productServices.getAllProduct(Number(page),Number(size),name as string);
            res.status(200).json({
                message: 'Get all product successful',
                size: prod.length,
                data: prod
            })
        } catch (error) {
            catchError(res,error)
        }
    }
}

const productController = new ProductController();
export default productController;