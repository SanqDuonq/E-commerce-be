import {Request,Response} from 'express';
import categoryServices from '../services/category.services';
import catchError from '../utils/catch-error';
class CategoryController {
    async addCategory(req: Request, res: Response) {
        const {name} = req.body;
        try {
            const cate = await categoryServices.addCategory(name);
            res.status(201).json({
                message: 'Add category successful',
                data: cate
            })
        } catch (error) {
            catchError(res,error);
        } 
    }
    async removeCategory(req: Request, res:Response) {
        const {id} = req.params;
        try {
            const cate = await categoryServices.removeCategory(id);
            res.status(200).json({
                message: `${cate.name} remove successful!`
            })
        } catch (error) {
            catchError(res,error);
        }
    }
}

const categoryController = new CategoryController();
export default categoryController;