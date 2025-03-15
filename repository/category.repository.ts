import Category from "../models/category.model";

class CategoryRepository {
    async findByName(name: string) {
        return await Category.findOne({name});
    }

    async create(name: string) {
        return await Category.create({name});
    }

}

export default new CategoryRepository();