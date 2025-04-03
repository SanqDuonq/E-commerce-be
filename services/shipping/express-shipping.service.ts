import { IShippingStrategy } from '../../interfaces/shipping.interface';

export class ExpressShipping implements IShippingStrategy {
    private readonly baseRate = 25000; // 25,000đ base rate
    private readonly ratePerKm = 3000; // 3,000đ/km
    private readonly ratePerKg = 8000; // 8,000đ/kg

    
    calculateShippingFee(weight: number, distance: number): number {
        return this.baseRate + (distance * this.ratePerKm) + (weight * this.ratePerKg);
    }

    getShippingMethodName(): string {
        return 'Nhanh';
    }

    getEstimatedDays(): number {
        return 2;
    }
} 