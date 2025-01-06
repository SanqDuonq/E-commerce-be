import express from 'express';
import controller from '../controllers/auth.controllers';
const router = express.Router();

router.post('/sign-in');
router.post('/sign-up',controller.signUp);
router.post('/verify-email');
router.post('/logout');
router.post('/forgot-password');
router.post('/reset-password');

export default router;
