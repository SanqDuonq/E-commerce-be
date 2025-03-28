import mongoose from "mongoose";
import { IProduct, IProductRepo } from "../interfaces/product.interface";
import Product from "../models/product.model";
import categoryRepository from "./category.repository";

class ProductRepository {
    async findId(id: string) {
        return await Product.findById(id);
    }
    
    async findName(name: string) {
        return await Product.findOne({name});
    }
    
    async add(product: IProduct) {
        const newProduct = await Product.create(product);
        await categoryRepository.updateProductToCategory(product.category,newProduct.id);
        return newProduct;
    }

    async remove(id: mongoose.Types.ObjectId) {
        return await Product.findByIdAndDelete(id);
    }

    async edit() {

    }

    
    async getProduct() {
        return await Product.find();
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