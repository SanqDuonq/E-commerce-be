import { IVoucher, IVoucherValidator, IVoucherCalculator } from '../../interfaces/voucher.interface';
import Voucher from '../../models/voucher.model';

export abstract class BaseVoucher implements IVoucherValidator, IVoucherCalculator {
    protected voucher: IVoucher;

    constructor(voucher: IVoucher) {
        this.voucher = voucher;
    }

    validate(orderValue: number, productIds?: string[]): boolean {
        // Kiểm tra thời gian
        const now = new Date();
        if (now < this.voucher.startDate || now > this.voucher.endDate) {
            return false;
        }

        // Kiểm tra trạng thái
        if (!this.voucher.isActive) {
            return false;
        }

        // Kiểm tra giới hạn sử dụng
        const usedCount = this.voucher.usedCount ?? 0;
        if (this.voucher.usageLimit && usedCount >= this.voucher.usageLimit) {
            return false;
        }

        // Kiểm tra giá trị đơn hàng tối thiểu
        if (this.voucher.minOrderValue && orderValue < this.voucher.minOrderValue) {
            return false;
        }

        return true;
    }

    getErrorMessage(): string {
        const now = new Date();
        if (now < this.voucher.startDate) {
            return 'Voucher chưa đến thời gian sử dụng';
        }
        if (now > this.voucher.endDate) {
            return 'Voucher đã hết hạn';
        }
        if (!this.voucher.isActive) {
            return 'Voucher không còn hiệu lực';
        }
        const usedCount = this.voucher.usedCount ?? 0;
        if (this.voucher.usageLimit && usedCount >= this.voucher.usageLimit) {
            return 'Voucher đã hết lượt sử dụng';
        }
        if (this.voucher.minOrderValue) {
            return `Đơn hàng tối thiểu ${this.voucher.minOrderValue.toLocaleString()}đ`;
        }
        return 'Voucher không hợp lệ';
    }

    abstract calculateDiscount(orderValue: number, productIds?: string[]): number;

    async incrementUsageCount(): Promise<void> {
        await Voucher.findByIdAndUpdate(this.voucher.id, {
            $inc: { usedCount: 1 }
        });
    }
} 