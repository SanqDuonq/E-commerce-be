import { IOrder } from '../../models/order.model';
import { OrderBuilder } from './order.builder';

import { BadRequestError } from '../../utils/appError';
import Product from '../../models/product.model';
import Voucher from '../../models/voucher.model';
import mongoose from 'mongoose';

interface CreateOrderInput {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
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

class OrderService {
  private static instance: OrderService;

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  async createOrder(orderData: CreateOrderInput): Promise<IOrder> {
    try {
        console.log("Received order data:", orderData);
        const orderBuilder = new OrderBuilder();

        return orderBuilder
            .setCustomer(orderData.customerId)
            .setItems(orderData.items)
            .setShippingAddress(orderData.shippingAddress)
            .setShippingMethod(orderData.shippingMethod)
            .setShippingFee(orderData.shippingFee)
            .setSubtotal(orderData.subtotal)
            .setDiscount(orderData.discount)
            .setTotal(orderData.total)
            .setPaymentMethod(orderData.paymentMethod)
            .setVoucher(orderData.voucherId)
            .setNotes(orderData.notes)
            .validateAndBuild();
    } catch (error) {
        console.error("Error in createOrder:", error);
        throw new BadRequestError("Failed to create order: " + error);
    }
}
  
}

export default OrderService; 