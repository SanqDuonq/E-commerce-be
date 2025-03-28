import express from 'express';
import orderController from '../controllers/order.controller';
import { authenticate } from '../middlewares/auth';
import { 
  validateOrderItems, 
  validateShippingAddress, 
  validatePaymentMethod, 
  validateVoucher,
  validateOrderAmounts 
} from '../middlewares/order.middleware';
import middleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/create',
  middleware.verifyToken,
  validateOrderItems,
  validateShippingAddress,
  validatePaymentMethod,
  validateVoucher,
  validateOrderAmounts,
  orderController.createOrder
);

export default router; 