import express from 'express';
import orderController from '../controllers/order.controller';
import ValidateOrderItemsMiddleware from '../middlewares/validate-order-items.middleware';
import ValidateShippingAddressMiddleware from '../middlewares/validate-shipping-address.middleware';
import ValidateUserLoginMiddleware from '../middlewares/validate-user-login.middleware';

//Tạo các middleware
const validateOrderItems = new ValidateOrderItemsMiddleware();
const validateShippingAddress = new ValidateShippingAddressMiddleware();
const validateUserLogin = new ValidateUserLoginMiddleware();
// Thiết lập chain
validateUserLogin
    .setNext(validateOrderItems)
    .setNext(validateShippingAddress);

const router = express.Router();

router.post(
  '/create',
  validateUserLogin.handle.bind(validateUserLogin),
  orderController.createOrder
);

export default router; 