import { IProduct } from './product.interface';
import { Document } from 'mongoose';

export interface ICategory extends Document{
    name: string,
    product: IProduct[]
}

export interface ICategoryMethod {
    addCategory(name:string): any,
    removeCategory(id: string): Promise<{name: string}>,
    getAllCategory(): Promise<ICategory[]>
}