export interface IVoucher {
    id: string;
    code: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minOrderValue?: number;
    maxDiscountValue?: number;
    usageLimit?: number;
    usedCount?: number;
    applyTo: 'product' | 'shipping' | 'order';
    applyToIds?: string[]; // IDs của sản phẩm hoặc danh mục nếu áp dụng cho sản phẩm
}

export interface IVoucherValidator {
    validate(orderValue: number, productIds?: string[]): boolean;
    getErrorMessage(): string;
}

export interface IVoucherCalculator {
    calculateDiscount(orderValue: number, productIds?: string[]): number;
}

export interface IVoucherPrototype {
    clone(): IVoucherPrototype;
    validate(orderValue: number, productIds?: string[]): boolean;
    getErrorMessage(): string;
    calculateDiscount(orderValue: number, productIds?: string[]): number;
    incrementUsageCount(): Promise<void>;
} 