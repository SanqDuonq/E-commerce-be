import express from 'express';
import middleware from '../middlewares/multer.middleware';
import controller from '../controllers/upload.controllers';
const router = express.Router();

router.post('/upload/single', middleware.upload.single('image'),controller.uploadSingle);
router.post('/upload/multiple', middleware.upload.array('images',5), controller.uploadMultiple);

export default router;
