import mongoose from 'mongoose';
export interface IProduct {
    name: string,
    thumbnail: string,
    price: number,
    discount?: string
    badge: 'Best Seller' | 'Limited Edition' | null,
    status: 'New' | null,
    description: string,
    category: mongoose.Types.ObjectId,
    variants: IVariant[]
    shape?: string[]
    reviews: IReview[]
}

export interface IVariant {
    image: string[],
    color: string,
    size: string,
    stock: number,
    material: string
}

export interface IReview {
    user: mongoose.Types.ObjectId,
    rating: number,
    comment: string
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