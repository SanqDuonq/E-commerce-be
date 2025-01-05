import express from 'express';

const router = express.Router();

router.post('/sign-in');
router.post('/sign-up');
router.post('/logout');
router.post('/forgot-password');
router.post('/reset-password');

export default router;
