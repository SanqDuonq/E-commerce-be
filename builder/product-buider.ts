import mongoose, { FilterQuery } from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import Product from "../models/product.model";

export class ProductQueryBuilder {
    private query: FilterQuery<IProduct> = {};

    filterById(id: string) {
        this.query._id = new mongoose.Types.ObjectId(id);
        return this;
    }

    filterByName(name: string) {
        this.query.name = new RegExp(name, 'i');
        return this;
    }

    filterByCategory(categoryId: string) {
        this.query.category = new mongoose.Types.ObjectId(categoryId);
        return this;
    }

    paginate(page: number, size: number) {
        this.query.$skip = (page - 1) * size;
        this.query.$limit = size
        return this;
    }

    async execute() {
        return await Product.find(this.query);
    }
}