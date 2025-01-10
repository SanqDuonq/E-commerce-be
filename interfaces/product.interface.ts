import mongoose from "mongoose";

export interface IProduct {
    name: string,
    description: string,
    image: string,
    price: number,
    stock: number,
    color: string[],
    popular: boolean,
    category: mongoose.Schema.Types.ObjectId
}

export interface IProductMethod {
    addProduct(data: IProduct): Promise<IProduct>,
    removeProduct(id:string): Promise<void>
}