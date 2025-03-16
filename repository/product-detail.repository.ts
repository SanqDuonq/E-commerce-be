import { IProductDetail } from "../interfaces/product.interface";
import ProductDetail from "../models/product-detail.model";

class ProductDetailRepository {
    async add(detail: IProductDetail) {
        return await ProductDetail.create(detail);
    }
}

export default new ProductDetailRepository();