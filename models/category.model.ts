import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

const CategoryModel:Schema<ICategory> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, {collection: 'Category'})

const Category = mongoose.model('Category',CategoryModel);
export default Category;