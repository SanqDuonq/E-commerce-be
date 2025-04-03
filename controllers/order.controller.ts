import { Request, Response } from 'express';
import OrderService from '../services/order/order.service';
import { catchAsync } from '../utils/catchAsync';
import { body } from 'express-validator';
import asyncError from '../middlewares/error.middleware';
import { returnRes } from '../utils/response';
import { IAuthRequest } from '../interfaces/auth.interface';
import { BadRequestError } from '../utils/appError';
import { NextFunction } from 'express';

class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = OrderService.getInstance();
    }

    // controllers/order.controller.ts
    createOrder = asyncError(async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            console.log("Received request body:", req.body);
            const customerId = req.user;
            console.log("Authenticated user ID:", customerId);
    
            if (!customerId) {
                throw new BadRequestError("User not authenticated");
            }
    
            const orderData = {
                customerId: customerId.toString(),
                ...req.body
            };
    
            console.log("Final order data to be processed:", orderData);
    
            const order = await this.orderService.createOrder(orderData);
    
            console.log("Order created successfully:", order);
            returnRes(res, 201, "Order created successfully", order);
        } catch (error) {
            console.error("Error in createOrder controller:", error);
            next(error);
        }
    });
    
}
export default new OrderController(); 