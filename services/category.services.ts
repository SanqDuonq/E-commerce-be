import { ICategory, ICategoryMethod } from "../interfaces/category.interface";
import Category from "../models/category.model";
import createErrors from 'http-errors';

class CategoryServices implements ICategoryMethod {
    async addCategory(name: string): Promise<{name:string}> {
        const category = await Category.findOne({name});
        if (category) {
            throw createErrors(409, 'This category is exists!');
        }
        const newCategory = new Category({name});
        await newCategory.save();
        return {
            name: newCategory.name
        }
    }
    async removeCategory(id: string): Promise<{ name: string; }> {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw createErrors(404, 'This category not found')
        }
        return {
            name: category.name
        }
    }
    async getAllCategory(): Promise<ICategory[]> {
        const category = await Category.find();
        return category;
    }
}

const categoryServices = new CategoryServices();
export default categoryServices;