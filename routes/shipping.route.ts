import express from 'express';
import controller from '../controllers/shipping.controllers';

const router = express.Router();

router.get('/methods', controller.getAllShippingMethods);
router.post('/calculate-fee', controller.calculateShippingFee);

export default router;