export interface ICart {
    userId: string,
    items: ICartItem[]
}

export interface ICartItem {
    productId: string,
    quantity: number
}