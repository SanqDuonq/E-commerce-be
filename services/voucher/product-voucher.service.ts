import { BaseVoucher } from './base-voucher.service';

export class ProductVoucher extends BaseVoucher {
    validate(orderValue: number, productIds?: string[]): boolean {
        if (!super.validate(orderValue, productIds)) {
            return false;
        }

        // Kiểm tra xem sản phẩm có trong danh sách áp dụng không
        if (this.voucher.applyToIds && productIds) {
            const hasValidProduct = productIds.some(id => 
                this.voucher.applyToIds?.includes(id)
            );
            if (!hasValidProduct) {
                return false;
            }
        }

        return true;
    }

    getErrorMessage(): string {
        const baseMessage = super.getErrorMessage();
        if (baseMessage !== 'Voucher không hợp lệ') {
            return baseMessage;
        }
        return 'Voucher không áp dụng cho sản phẩm này';
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