import { IVoucher } from '../../interfaces/voucher.interface';
import { ProductVoucher } from './product-voucher.service';
import { ShippingVoucher } from './shipping-voucher.service';
import { OrderVoucher } from './order-voucher.service';
import { BaseVoucher } from './base-voucher.service';

export class VoucherFactory {
    static createVoucher(voucher: IVoucher): BaseVoucher {
        switch (voucher.applyTo) {
            case 'product':
                return new ProductVoucher(voucher);
            case 'shipping':
                return new ShippingVoucher(voucher);
            case 'order':
                return new OrderVoucher(voucher);
            default:
                throw new Error('Invalid voucher type');
        }
    }
} 