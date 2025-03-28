export interface IShippingStrategy {
    calculateShippingFee(weight: number, distance: number): number;
    getShippingMethodName(): string;
    getEstimatedDays(): number;
}

export interface IShippingContext {
    setStrategy(strategy: IShippingStrategy): void;
    calculateShippingFee(weight: number, distance: number): number;
    getShippingMethodName(): string;
    getEstimatedDays(): number;
}