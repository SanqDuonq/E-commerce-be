import express from 'express';
import controller from '../controllers/category.controllers';
const router = express.Router();

router.post('/add-category',controller.addCategory);
router.delete('/remove-category/:id',controller.removeCategory);

export default router;