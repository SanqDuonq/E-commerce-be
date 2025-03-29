import { IVoucher } from '../../interfaces/voucher.interface';
import { ProductVoucher } from './product-voucher.service';
import { ShippingVoucher } from './shipping-voucher.service';
import { OrderVoucher } from './order-voucher.service';
import { BaseVoucher } from './base-voucher.service';

export class VoucherFactory {
    private static prototypes: Map<string, BaseVoucher> = new Map();

    static initialize(voucher: IVoucher): void {
        switch (voucher.applyTo) {
            case 'product':
                this.prototypes.set('product', new ProductVoucher(voucher));
                break;
            case 'shipping':
                this.prototypes.set('shipping', new ShippingVoucher(voucher));
                break;
            case 'order':
                this.prototypes.set('order', new OrderVoucher(voucher));
                break;
        }
    }

    static createVoucher(voucher: IVoucher): BaseVoucher {
        const prototype = this.prototypes.get(voucher.applyTo);
        if (!prototype) {
            throw new Error('Invalid voucher type');
        }
        return prototype.clone();
    }
} 