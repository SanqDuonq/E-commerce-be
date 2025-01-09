import {Request,Response} from 'express'
import imageServices from '../services/image.services';
import productServices from '../services/product.services';
import catchError from '../utils/catch-error';
class ProductController {
    async addProduct(req: Request, res: Response) {
        const {name, description, image, price, stock, color, category} = req.body;
        try {
            const imageURL = await imageServices.uploadImage(req.file?.path!);
            const prod = await productServices.addProduct({
                name, description, price, stock, color, category, image: imageURL
            })
            res.status(201).json({
                message: 'Add product successful',
                data: prod
            })
        } catch (error) {
            catchError(res,error);
        }
    }
 }

const productController = new ProductController();
export default productController;