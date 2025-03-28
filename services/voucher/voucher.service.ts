import { IVoucher } from '../../interfaces/voucher.interface';
import Voucher from '../../models/voucher.model';
import { VoucherFactory } from './voucher-factory.service';

class VoucherService {
    async createVoucher(voucherData: Omit<IVoucher, 'id'>): Promise<IVoucher> {
        const voucher = await Voucher.create(voucherData);
        return voucher;
    }

    async getVoucherByCode(code: string): Promise<IVoucher | null> {
        const voucher = await Voucher.findOne({ code });
        return voucher;
    }

    async getAllVouchers(): Promise<IVoucher[]> {
        const vouchers = await Voucher.find();
        return vouchers;
    }

    async updateVoucher(id: string, voucherData: Partial<IVoucher>): Promise<IVoucher | null> {
        const voucher = await Voucher.findByIdAndUpdate(id, voucherData, { new: true });
        return voucher;
    }

    async deleteVoucher(id: string): Promise<boolean> {
        const result = await Voucher.findByIdAndDelete(id);
        return !!result;
    }

    async validateAndCalculateDiscount(
        code: string,
        orderValue: number,
        productIds?: string[]
    ): Promise<{ isValid: boolean; message: string; discount: number }> {
        const voucher = await this.getVoucherByCode(code);
        if (!voucher) {
            return {
                isValid: false,
                message: 'Voucher không tồn tại',
                discount: 0
            };
        }

        const voucherInstance = VoucherFactory.createVoucher(voucher);
        const isValid = voucherInstance.validate(orderValue, productIds);

        if (!isValid) {
            return {
                isValid: false,
                message: voucherInstance.getErrorMessage(),
                discount: 0
            };
        }

        const discount = voucherInstance.calculateDiscount(orderValue, productIds);
        await voucherInstance.incrementUsageCount();

        return {
            isValid: true,
            message: 'Voucher hợp lệ',
            discount
        };
    }
}

export const voucherService = new VoucherService(); 