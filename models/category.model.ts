import mongoose from 'mongoose';

const CategoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {collection: 'Category'})

const Category = mongoose.model('Category',CategoryModel);
export default Category;