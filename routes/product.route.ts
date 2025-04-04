import express from 'express';
import controller from '../controllers/product.controllers';
const router = express.Router();

router.post('/add-product',controller.addProduct);
router.delete('/remove-product/:id',controller.removeProduct);
router.put('/edit-product/:id',controller.editProduct);
router.get('/get-all-product',controller.getAllProduct);

export default router;