import mongoose from "mongoose";
import Category from "../models/category.model";

class CategoryRepository {
    async findName(name: string) {
        return await Category.findOne({name});
    }

    async findId(id: string) {
        return await Category.findById(id);
    }

    async create(name: string) {
        return await Category.create({name});
    }

    async remove(id: string) {
        return await Category.findByIdAndDelete(id);
    }

    async edit(id: string, newName: string) {
        return await Category.findByIdAndUpdate(id, {name: newName});
    }

    async getAll(categoryName?: string) {
        return categoryName ? await this.findName(categoryName) : await Category.find();
    }

    async updateProductToCategory(categoryId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId) {
        return await Category.findByIdAndUpdate(categoryId, {
            $push: { product: productId }
        })
    }
}

export default new CategoryRepository();