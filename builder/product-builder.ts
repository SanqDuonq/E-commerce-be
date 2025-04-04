import { PipelineStage, Types } from "mongoose";
import Product from "../models/product.model";

class ProductQueryBuilder {
	private pipeline: PipelineStage[] = [];
	private paginateStages: PipelineStage[] = [];

	setName(name: string) {
		if (name && name.trim() !== "") {
			this.pipeline.push({
				$match: {
					name: { $regex: new RegExp(name, "i") },
				},
			});
		}
		return this;
	}

	setCategory(category: string) {
		if (category && category.trim() !== "") {
			this.pipeline.push({
				$match: {
					category: new Types.ObjectId(category),
				},
			});
		}
		return this;
	}
    
    setBadge(badge: string) {
        if (badge && badge.trim() !== '') {
            this.pipeline.push({
                $match: {badge: badge}
            })
        }
        return this;
    }
    setSize(size: string) {
        if (size && size.trim() !== '') {
            this.pipeline.push({
                $match: {
                    "variants.size": { $regex: new RegExp(size, 'i')}
                }
            })
        }
        return this;
    }
    setMaterial(material: string) {
        if (material && material.trim() !== '') {
            this.pipeline.push({
                $match: {
                    "variants.material": { $regex: new RegExp(material, 'i')}
                }
            })
        }
        return this;
    }

    setColor(color: string) {
        if (color && color.trim() !== '') {
            this.pipeline.push({
                $match: {
                    "variants.color": { $regex: new RegExp(color, 'i')}
                }
            })
        }
        return this;
    }
    setShape(shape: string) {
        if (shape && shape.trim() !== '') {
            this.pipeline.push({
                $match: {
                    "shape": { $regex: new RegExp(shape, 'i')}
                }
            })
        }
        return this;
    }

    setStatus(status: string) {
        if (status && status.trim() !== '') {
            this.pipeline.push({
                $match: {
                    "status": { $regex: new RegExp(status, 'i')}
                }
            })
        }
        return this;
    }

	setPaginate(page: number, limit: number) {
		this.paginateStages.push({ $skip: (page - 1) * limit });
		this.paginateStages.push({ $limit: limit });
		return this;
	}

	async exec() {
		const pipeline = [...this.pipeline, ...this.paginateStages];
		return Product.aggregate(pipeline);
	}

	async count() {
		const result = await Product.aggregate([...this.pipeline, { $count: "total" }]);
		return result[0]?.total || 0;
	}
}

export { ProductQueryBuilder };
