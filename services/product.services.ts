import mongoose from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import productRepository from "../repository/product.repository";
import throwError from "../utils/create-error";
import { ProductQueryBuilder } from "../builder/product-builder";
import cors from 'cors';

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

    async editProduct(id: string, product: IProduct) {
        return await productRepository.edit(id, product)
    }

    async removeProduct(id: mongoose.Types.ObjectId) {
        return await productRepository.remove(id);
    }

    async getProduct(name: string, page: number, limit: number, category: string, badge: string, size: string, material: string, shape: string, color: string, status: string) {
        const builder = new ProductQueryBuilder()
            .setName(name)
            .setCategory(category)
            .setBadge(badge)
            .setSize(size)
            .setPaginate(page, limit)
            .setMaterial(material)
            .setColor(color)
            .setShape(shape)
            .setStatus(status)
            
        const data = await builder.exec();
        const count = await builder.count();
        return { data, count };
    }
}

const productServices = new ProductServices();
export default productServices;