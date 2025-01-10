import { IProduct, IProductMethod } from "../interfaces/product.interface";
import Category from "../models/category.model";
import Product from "../models/product.model";
import createErrors from 'http-errors';

class ProductServices implements IProductMethod {
    async addProduct(data: IProduct): Promise<IProduct> {
        const product = new Product(data);
        await product.save();
        await Category.findByIdAndUpdate(data.category, {
            $push: {product: product._id}
        })
        return product;
    }
    async removeProduct(id:string): Promise<void> {
        const product = await Product.findById(id);
        if (!product) {
            throw createErrors(404, 'This product not found!');
        }
        await Product.findByIdAndDelete(id);
        await Category.findByIdAndUpdate(product.category, {
            $pull: {product: product._id}
        })
    }
}

const productServices = new ProductServices();
export default productServices;