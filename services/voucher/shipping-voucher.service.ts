import { BaseVoucher } from './base-voucher.service';

export class ShippingVoucher extends BaseVoucher {
    validate(orderValue: number, productIds?: string[]): boolean {
        return super.validate(orderValue, productIds);
    }

    getErrorMessage(): string {
        return super.getErrorMessage();
    }

    calculateDiscount(orderValue: number, productIds?: string[]): number {
        if (!this.validate(orderValue, productIds)) {
            return 0;
        }

        let discount = 0;
        if (this.voucher.discountType === 'percentage') {
            discount = orderValue * (this.voucher.discountValue / 100);
            if (this.voucher.maxDiscountValue) {
                discount = Math.min(discount, this.voucher.maxDiscountValue);
            }
        } else {
            discount = this.voucher.discountValue;
        }

        return discount;
    }
} 