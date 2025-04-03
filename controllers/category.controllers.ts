import { Request, Response } from "express";
import categoryServices from "../services/category.services";
import { catchAsync } from "../utils/catchAsync";
import { success } from "../utils/response";

class CategoryController {
	addCategory = catchAsync(async (req: Request, res: Response) => {
		const {name} = req.body;
		const cate = await categoryServices.addCategory(name);
		return success(res, 201, 'Add category successful', cate);
	});

	removeCategory = catchAsync(async (req: Request, res: Response) => {
		const {id} = req.params;
		await categoryServices.removeCategory(id);
		return success(res, 200, 'Remove category successful');
	})

	editCategory = catchAsync(async (req: Request, res: Response) => {
		const {id} = req.params;
		const {newName} = req.body;
		await categoryServices.editCategory(id,newName);
		return success(res, 200, `Edit ${newName} successful`);
	})

	getAllCategory = catchAsync(async (req: Request, res: Response) => {
		const {categoryName} = req.query; 
		const data = await categoryServices.getAllCategory(categoryName as string);
		return success(res, 200, 'Get category successful',data!);
	})
}

export default new CategoryController();
