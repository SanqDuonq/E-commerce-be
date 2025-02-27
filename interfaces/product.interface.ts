import mongoose from "mongoose";

export interface IProduct {
    name: string,
    description: string,
    thumbnail: string,
    price: number,
    stock: number,
    image: string[],
    color: string[],
    popular: boolean,
    category: mongoose.Schema.Types.ObjectId
}

export interface IProductMethod {
    addProduct(data: IProduct): Promise<IProduct>,
    removeProduct(id:string): Promise<void>,
    getAllProduct(page:number,size:number,name:string): Promise<IProduct[]>
}

export interface IProductRepo {
    page: number,
    size: number,
    name: string
}