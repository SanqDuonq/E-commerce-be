import { IProduct, IProductMethod } from "../interfaces/product.interface";
import Product from "../models/product.model";

class ProductServices implements IProductMethod {
    async addProduct(data: IProduct): Promise<IProduct> {
        const product = new Product(data);
        await product.save();
        return product;
    }
    async removeProduct(): Promise<void> {
        
    }
}

const productServices = new ProductServices();
export default productServices;