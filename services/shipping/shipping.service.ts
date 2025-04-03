import { ShippingContext } from './shipping-context.service';
import { StandardShipping } from './standard-shipping.service';
import { ExpressShipping } from './express-shipping.service';
import { PriorityShipping } from './priority-shipping.service';

export enum ShippingMethod {
    STANDARD = 'standard',
    EXPRESS = 'express',
    PRIORITY = 'priority'
}

class ShippingService {
    private shippingContext: ShippingContext;

    constructor() {
        // Mặc định sử dụng phương thức tiêu chuẩn
        this.shippingContext = new ShippingContext(new StandardShipping());
    }

    setShippingMethod(method: ShippingMethod): void {
        switch (method) {
            case ShippingMethod.STANDARD:
                this.shippingContext.setStrategy(new StandardShipping());
                break;
            case ShippingMethod.EXPRESS:
                this.shippingContext.setStrategy(new ExpressShipping());
                break;
            case ShippingMethod.PRIORITY:
                this.shippingContext.setStrategy(new PriorityShipping());
                break;
            default:
                throw new Error('Invalid shipping method');
        }
    }

    calculateShippingFee(weight: number, distance: number): number {
        return this.shippingContext.calculateShippingFee(weight, distance);
    }

    getShippingMethodName(): string {
        return this.shippingContext.getShippingMethodName();
    }

    getEstimatedDays(): number {
        return this.shippingContext.getEstimatedDays();
    }

    getAllShippingMethods(): { id: ShippingMethod; name: string; estimatedDays: number }[] {
        return [
            {
                id: ShippingMethod.STANDARD,
                name: new StandardShipping().getShippingMethodName(),
                estimatedDays: new StandardShipping().getEstimatedDays()
            },
            {
                id: ShippingMethod.EXPRESS,
                name: new ExpressShipping().getShippingMethodName(),
                estimatedDays: new ExpressShipping().getEstimatedDays()
            },
            {
                id: ShippingMethod.PRIORITY,
                name: new PriorityShipping().getShippingMethodName(),
                estimatedDays: new PriorityShipping().getEstimatedDays()
            }
        ];
    }
}

export const shippingService = new ShippingService();