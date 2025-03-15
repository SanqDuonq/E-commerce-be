import {Request,Response} from 'express'
import productServices from '../services/product.services';
import catchError from '../utils/catch-error';
class ProductController {
    async addProduct(req: Request, res: Response) {
        
    }
    async removeProduct(req: Request, res: Response) {
        
    }
    async getAllProduct(req: Request, res: Response) {
        
    }
}

const productController = new ProductController();
export default productController;