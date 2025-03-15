import { ICategory, ICategoryMethod } from "../interfaces/category.interface";
import Category from '../models/category.model';
import createErrors from 'http-errors';
import categoryRepository from "../repository/category.repository";

class CategoryServices implements ICategoryMethod {
    async addCategory(name: string) {
        const foundName = await categoryRepository.findByName(name);
        if(foundName) {
            throw createErrors(404, 'Category is already exist');
        }
        return await categoryRepository.create(name);
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