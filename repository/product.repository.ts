import { IProductRepo } from "../interfaces/product.interface";
import Product from "../models/product.model";

class ProductRepository {
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

const productRepository = new ProductRepository();
export default productRepository;