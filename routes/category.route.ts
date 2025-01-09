import express from 'express';
import controller from '../controllers/category.controllers';
const router = express.Router();

router.post('/add-category',controller.addCategory);

export default router;