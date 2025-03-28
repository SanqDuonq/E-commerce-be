import { Request, Response } from 'express';
import { success, error } from '../utils/response';
import { catchAsync } from '../utils/catchAsync';
import productServices from '../services/product.services';

class ProductController {
    addProduct = catchAsync(async (req: Request, res: Response) => {
        const {name, thumbnail, price, badge, status, category, productDetail, stock} = req.body;
        const data = await productServices.createProduct({
            name,
            thumbnail,
            price,
            badge,
            status,
            category,
            productDetail,
            stock
        });
        return success(res, 201, 'Add product successful', data);
    });

    removeProduct = catchAsync(async (req: Request, res: Response) => {
        // TODO: Implement remove product
    });

    getAllProduct = catchAsync(async (req: Request, res: Response) => {
        // TODO: Implement get all products
    });
}

const productController = new ProductController();
export default productController;