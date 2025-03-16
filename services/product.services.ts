import { IProduct, IProductDetail } from "../interfaces/product.interface";
import productDetailRepository from "../repository/product-detail.repository";
import productRepository from "../repository/product.repository";
import throwError from "../utils/create-error";

class ProductServices {
    private async checkExistName(name: string) {
        if (await productRepository.findName(name)) {
            throwError(409, 'Product name is already exist');
        }
    }
    
    async createProductDetail(detail: IProductDetail) {
        return await productDetailRepository.add(detail);
    }

    async createProduct(product: IProduct) {
        await this.checkExistName(product.name);
        const newProductDetail = await this.createProductDetail(product.productDetail);
        return productRepository.add({
            ...product,
            productDetail: newProductDetail
        })
    }    
}

const productServices = new ProductServices();
export default productServices;