export interface IProduct {
    name: string,
    thumbnail: string,
    price: number,
    badge: 'Best Seller' | 'Limited Edition' | null,
    status: 'New' | null,
    productDetail: IProductDetail;
}

export interface IProductDetail extends IProduct{
    description: string,
    variant: IVariantProduct
}

export interface IVariantProduct extends IProductDetail {
    options: {
        image: string,
        color: string,
        stock: number,   
        size: number,
        price: number,
        material: string,
        height: number,
        width: number
    }[],
    shape: string[];
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