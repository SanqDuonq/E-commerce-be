import mongoose from "mongoose";

export interface IProduct {
    name: string,
    description: string,
    image: string,
    price: number,
    stock: number,
    color: string[];
    category: mongoose.Schema.Types.ObjectId;
}

export interface IProductMethod {
    
}