import { OrderBuilder } from './order.builder';
import { IOrder } from '../../models/order.model';
import { OrderInput } from './order.builder';

export class OrderDirector {
  constructor(private builder: OrderBuilder) {}

  createStandardOrder(orderData: OrderInput): Promise<IOrder> {
    return this.builder
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
  }

  createExpressOrder(orderData: OrderInput): Promise<IOrder> {
    return this.builder
      .setCustomer(orderData.customerId)
      .setItems(orderData.items)
      .setShippingAddress(orderData.shippingAddress)
      .setShippingMethod('express')
      .setShippingFee(orderData.shippingFee * 1.5)
      .setSubtotal(orderData.subtotal)
      .setDiscount(orderData.discount)
      .setTotal(orderData.total)
      .setPaymentMethod(orderData.paymentMethod)
      .setNotes('Express Delivery')
      .validateAndBuild();
  }
} 