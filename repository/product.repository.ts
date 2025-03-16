import mongoose from "mongoose";
import { IProduct, IProductRepo } from "../interfaces/product.interface";
import Category from "../models/category.model";
import Product from "../models/product.model";

class ProductRepository {
    async findId(id: string) {
        return await Product.findById(id);
    }
    
    async findName(name: string) {
        return await Product.findOne({name});
    }
    
    async add(product: IProduct) {
        const newProduct = await Product.create(product);
        await this.updateCategoryWithProduct(product.category.toString(),newProduct._id.toString());
        return newProduct;
    }

    async remove(id: string) {
        return await Product.findByIdAndDelete(id);
    }

    async edit() {

    }

    async updateCategoryWithProduct(categoryId: string, productId: string) {
        return await Category.findByIdAndUpdate(
            categoryId,
            {
                $push: { product: productId}
            }
        )
    }

    async getAllProduct(props: IProductRepo) {
        const filter = await Product.aggregate([
            {
                $match: {
                    name: new RegExp(props.name,'i')
                }
            },
            {
                $skip: (props.page - 1) * props.size
            },
            {
                $limit: props.size
            }
        ])
        return filter;
    }

}

export default new ProductRepository();