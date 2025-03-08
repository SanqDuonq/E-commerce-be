import express from 'express';
import controller from '../controllers/cart.controllers';
import middleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/add',middleware.verifyToken, controller.addToCart);
router.get('/get',middleware.verifyToken, controller.getUserCart);
router.put('/update',middleware.verifyToken, controller.updateCart);

export default router;