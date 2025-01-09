
export interface ICategory {
    name: string,
    product: [Object]
}

export interface ICategoryMethod {
    addCategory(name:string): Promise<{name: string}>,
    removeCategory(id: string): Promise<{name: string}>
}