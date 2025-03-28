import express from 'express';
import controller from '../controllers/payment.controllers';

const router = express.Router();

router.get('/methods', controller.getAllPaymentMethods);
router.post('/process', controller.processPayment);
router.post('/refund', controller.refundPayment);

export default router; 