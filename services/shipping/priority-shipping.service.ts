import { IShippingStrategy } from '../../interfaces/shipping.interface';

export class PriorityShipping implements IShippingStrategy {
    private readonly baseRate = 35000; // 35,000đ base rate
    private readonly ratePerKm = 4000; // 4,000đ/km
    private readonly ratePerKg = 12000; // 12,000đ/kg

    calculateShippingFee(weight: number, distance: number): number {
        return this.baseRate + (distance * this.ratePerKm) + (weight * this.ratePerKg);
    }

    getShippingMethodName(): string {
        return 'Hỏa tốc';
    }

    getEstimatedDays(): number {
        return 1;
    }
} 