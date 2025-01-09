import { ICategoryMethod } from "../interfaces/category.interface";
import Category from "../models/category.model";

class CategoryServices implements ICategoryMethod {
    async addCategory(name: string): Promise<{name: string}> {
        const category = new Category({name});
        await category.save();
        return {
            name: category.name
        }
    }
}

const categoryServices = new CategoryServices();
export default categoryServices;