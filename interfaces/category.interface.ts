import { IProduct } from './product.interface';
import { Document } from 'mongoose';

export interface ICategory extends Document{
    name: string,
    product: IProduct[]
}

