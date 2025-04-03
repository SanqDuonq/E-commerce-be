import { IOrder } from '../../models/order.model';
import { OrderBuilder } from './order.builder';
import { OrderDirector } from './order.director';
import { BadRequestError } from '../../utils/appError';
import { OrderInput } from './order.builder';

class OrderService {
  private static instance: OrderService;
  private orderDirector: OrderDirector;

  private constructor() {
    this.orderDirector = new OrderDirector(new OrderBuilder());
  }

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  async createOrder(orderData: OrderInput): Promise<IOrder> {
    try {
      return this.orderDirector.createStandardOrder(orderData);
    } catch (error) {
      console.error("Error in createOrder:", error);
      throw new BadRequestError("Failed to create order: " + error);
    }
  }

  async createExpressOrder(orderData: OrderInput): Promise<IOrder> {
    try {
      return this.orderDirector.createExpressOrder(orderData);
    } catch (error) {
      console.error("Error in createExpressOrder:", error);
      throw new BadRequestError("Failed to create express order: " + error);
    }
  }
}

export default OrderService; 