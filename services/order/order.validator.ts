import { IOrderItem } from '../../models/order.model';
import { BadRequestError } from '../../utils/appError';
import Product from '../../models/product.model';
import Voucher from '../../models/voucher.model';

export class OrderValidator {
  static async validateItems(items: IOrderItem[]): Promise<void> {
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new BadRequestError(`Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestError(`Insufficient stock for product ${product.name}`);
      }
    }
  }

  static async validateVoucher(voucherId: string, customerId: string): Promise<void> {
    if (!voucherId) return;
    
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      throw new BadRequestError('Invalid voucher');
    }
    if (voucher.usageLimit && voucher.usedCount && voucher.usedCount >= voucher.usageLimit) {
      throw new BadRequestError('Voucher has reached maximum usage');
    }
  }
} 