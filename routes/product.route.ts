import express from 'express';
import middleware from '../middlewares/multer.middleware';
import controller from '../controllers/product.controllers';
const router = express.Router();

router.post('/add-product',middleware.upload.single('image'),controller.addProduct);
router.delete('/remove-product/:id',controller.removeProduct);
router.get('/get-all-product',controller.getAllProduct);

export default router;