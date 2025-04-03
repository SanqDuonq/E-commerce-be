import { IOrder, IOrderItem } from '../../models/order.model';
import Order from '../../models/order.model';
import { BadRequestError } from '../../utils/appError';
import Product from '../../models/product.model';
import { IProduct } from '../../interfaces/product.interface'
import Voucher from '../../models/voucher.model';
import mongoose from 'mongoose';
import { OrderValidator } from './order.validator';

export interface OrderInput {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    color: string;
    size: string;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
  };
  shippingMethod: string;
  shippingFee: number;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'stripe' | 'momo';
  voucherId?: string;
  notes?: string;
}

export class OrderBuilder {
  private orderData: Partial<IOrder> = {};
  private orderItems: IOrderItem[] = [];

  setCustomer(customerId: string): OrderBuilder {
    this.orderData.customerId = new mongoose.Types.ObjectId(customerId);
    return this;
  }

  setItems(items: { productId: string; quantity: number; color: string; size: string }[]): OrderBuilder {
    this.orderData.items = items.map(item => ({
      productId: new mongoose.Types.ObjectId(item.productId),
      quantity: item.quantity,
      price: 0,
      name: '',
      color: item.color,
      size: item.size
    }));
    return this;
  }

  setShippingAddress(address: OrderInput['shippingAddress']): OrderBuilder {
    this.orderData.shippingAddress = address;
    return this;
  }

  setShippingMethod(method: string): OrderBuilder {
    this.orderData.shippingMethod = method;
    return this;
  }

  setShippingFee(fee: number): OrderBuilder {
    this.orderData.shippingFee = fee;
    return this;
  }

  setSubtotal(subtotal: number): OrderBuilder {
    this.orderData.subtotal = subtotal;
    return this;
  }

  setDiscount(discount: number): OrderBuilder {
    this.orderData.discount = discount;
    return this;
  }

  setTotal(total: number): OrderBuilder {
    this.orderData.total = total;
    return this;
  }

  setPaymentMethod(method: 'cod' | 'stripe' | 'momo'): OrderBuilder {
    this.orderData.paymentMethod = method;
    return this;
  }

  setVoucher(voucherId?: string): OrderBuilder {
    if (voucherId) {
      this.orderData.voucherId = new mongoose.Types.ObjectId(voucherId);
    }
    return this;
  }

  setNotes(notes?: string): OrderBuilder {
    this.orderData.notes = notes;
    return this;
  }

  async validateAndBuild(): Promise<IOrder> {
    // Validate items
    await OrderValidator.validateItems(this.orderData.items || []);
    
    // Validate voucher
    if (this.orderData.voucherId) {
      await OrderValidator.validateVoucher(
        this.orderData.voucherId.toString(),
        this.orderData.customerId?.toString() || ''
      );
    }

    // Build order items
    for (const item of this.orderData.items || []) {
      const product = await Product.findById(item.productId);
      this.orderItems.push({
        productId: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity,
        price: product!.price,
        name: product!.name,
        color: item.color,
        size: item.size
      });
    }

    // Create order
    const order = await Order.create({
      ...this.orderData,
      items: this.orderItems,
      paymentStatus: 'PENDING',
      orderStatus: 'PENDING'
    });

    // Update related data
    await this.updateRelatedData(order);

    return order;
  }

  private async updateRelatedData(order: IOrder): Promise<void> {
    // Update product stock
    for (const item of this.orderItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        { 
          $inc: { 
            'variants.$[elem].stock': -item.quantity 
          }
        },
        { 
          arrayFilters: [{ 
            'elem.color': item.color, 
            'elem.size': item.size 
          }]
        }
      );
    }

    // Update voucher
    if (this.orderData.voucherId) {
      await Voucher.findByIdAndUpdate(
        this.orderData.voucherId,
        {
          $inc: { usageCount: 1 },
          $push: {
            usedBy: {
              userId: this.orderData.customerId,
              orderId: order._id,
              usedAt: new Date()
            }
          }
        }
      );
    }
  }
} 