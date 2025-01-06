import express from 'express';
import controller from '../controllers/auth.controllers';
const router = express.Router();

router.post('/sign-in',controller.signIn);
router.post('/sign-up',controller.signUp);
router.post('/verify-email',controller.verifyEmail);
router.post('/logout',controller.logout);
router.post('/forgot-password',controller.forgotPassword);
router.post('/reset-password');

export default router;
