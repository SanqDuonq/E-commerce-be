import mongoose, { FilterQuery, PipelineStage } from "mongoose";
import Product from "../models/product.model";

class ProductQueryBuilder {
    private pipeline: PipelineStage[] = [];

    filterByName(name: string) {
        if(name) {
            this.pipeline.push({
                $match: {name: new RegExp(name, 'i')}
            })
        }
        return this;
    }

    paginate(page: number, size: number) {
        this.pipeline.push({$skip: (page - 1) * size});
        this.pipeline.push({$limit: size})
        return this;
    }

    async exec() {
        return Product.aggregate(this.pipeline);
    }
}

export { ProductQueryBuilder }