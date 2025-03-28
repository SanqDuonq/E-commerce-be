import { IShippingStrategy } from '../../interfaces/shipping.interface';

export class StandardShipping implements IShippingStrategy {
    private readonly baseRate = 15000; // 15,000đ base rate
    private readonly ratePerKm = 2000; // 2,000đ/km
    private readonly ratePerKg = 5000; // 5,000đ/kg

    calculateShippingFee(weight: number, distance: number): number {
        return this.baseRate + (distance * this.ratePerKm) + (weight * this.ratePerKg);
    }

    getShippingMethodName(): string {
        return 'Tiêu chuẩn';
    }

    getEstimatedDays(): number {
        return 3;
    }
} 