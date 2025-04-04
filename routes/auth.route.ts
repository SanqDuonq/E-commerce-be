import express from 'express';
import controller from '../controllers/auth.controllers';
import middleware from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { resendOTPSchema, SignInSchema, signUpSchema, verifyEmailSchema, forgotPasswordSchema, resetPasswordSchema } from '../schema/auth.schema';

const router = express.Router();

router.post('/sign-in', validateRequest(SignInSchema), controller.signIn);
router.post('/sign-up', validateRequest(signUpSchema), controller.signUp);
router.post('/verify-email',validateRequest(verifyEmailSchema), controller.verifyEmail);
router.post('/resend-otp',validateRequest(resendOTPSchema), controller.resendOTP);
router.post('/logout',controller.logout);
router.post('/forgot-password',validateRequest(forgotPasswordSchema), controller.forgotPassword);
router.post('/reset-password',validateRequest(resetPasswordSchema), controller.resetPassword);
router.get('/checkAuth',middleware.verifyToken,controller.checkAuth);

router.get('/google', controller.googleAuth)
router.get('/google/callback', controller.googleCallback);

router.get('/github', controller.githubAuth)
router.get('/github/callback', controller.githubCallback);


export default router;
