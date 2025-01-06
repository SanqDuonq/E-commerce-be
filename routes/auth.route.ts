import express from 'express';
import controller from '../controllers/auth.controllers';
import middleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/sign-in',controller.signIn);
router.post('/sign-up',controller.signUp);
router.post('/verify-email',controller.verifyEmail);
router.post('/logout',controller.logout);
router.post('/forgot-password',controller.forgotPassword);
router.post('/reset-password',controller.resetPassword);
router.get('/checkAuth',middleware.verifyToken,controller.checkAuth);

export default router;
