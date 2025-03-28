import { IShippingContext, IShippingStrategy } from '../../interfaces/shipping.interface';

export class ShippingContext implements IShippingContext {
    private strategy: IShippingStrategy;

    constructor(strategy: IShippingStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: IShippingStrategy): void {
        this.strategy = strategy;
    }

    calculateShippingFee(weight: number, distance: number): number {
        return this.strategy.calculateShippingFee(weight, distance);
    }

    getShippingMethodName(): string {
        return this.strategy.getShippingMethodName();
    }

    getEstimatedDays(): number {
        return this.strategy.getEstimatedDays();
    }
}