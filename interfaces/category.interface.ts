import { IProduct } from './product.interface';
export interface ICategory {
    name: string,
    subCategory: ISubCategory[]
}

export interface ISubCategory {
    name: string,
    productType: IProductType[];
}

export interface IProductType {
    product: IProduct[];
}

export interface ICategoryMethod {
    addCategory(name:string): Promise<{name: string}>,
    removeCategory(id: string): Promise<{name: string}>,
    getAllCategory(): Promise<ICategory[]>
}