import mongoose from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import productRepository from "../repository/product.repository";
import throwError from "../utils/create-error";

class ProductServices {
    private async checkExistName(name: string) {
        if (await productRepository.findName(name)) {
            throwError(409, 'Product name is already exist')
        }
    }

    async createProduct(product: IProduct) {
        await this.checkExistName(product.name);
        return await productRepository.add(product);
    }    

    async removeProduct(id: mongoose.Types.ObjectId) {
        return await productRepository.remove(id);
    }

    async getProduct(name: string, page: number, size: number) {
        return await productRepository.getAllProduct(name, page, size);
    }
}

const productServices = new ProductServices();
export default productServices;