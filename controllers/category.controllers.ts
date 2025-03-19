import { Request, Response } from "express";
import categoryServices from "../services/category.services";
import asyncError from "../middlewares/error.middleware";
import returnRes from "../utils/response";

class CategoryController {
	addCategory = asyncError(async (req: Request, res: Response) => {
		const {name} = req.body;
		const cate = await categoryServices.addCategory(name);
		returnRes(res, 201, 'Add category successful', cate);
	});

	removeCategory = asyncError(async (req: Request, res: Response) => {
		const {id} = req.params;
		await categoryServices.removeCategory(id);
		returnRes(res, 200, 'Remove category successful');
	})

	editCategory = asyncError(async (req: Request, res: Response) => {
		const {id} = req.params;
		const {newName} = req.body;
		await categoryServices.editCategory(id,newName);
		returnRes(res, 200, `Edit ${newName} successful`);
	})

	getAllCategory = asyncError(async (req: Request, res: Response) => {
		const {categoryName} = req.query; 
		const data = await categoryServices.getAllCategory(categoryName as string);
		returnRes(res, 200, 'Get category successful',data!);
	})
}

const categoryController = new CategoryController();
export default categoryController;
