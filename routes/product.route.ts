import express from 'express';
import middleware from '../middlewares/multer.middleware';
import controller from '../controllers/product.controllers';
const router = express.Router();

router.post('/add-product',middleware.upload.single('image'),controller.addProduct);
router.post('/remove');
router.post('/single');
router.get('/list');

export default router;