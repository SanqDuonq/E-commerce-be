import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../utils/appError';
import { validateRequest } from './validateRequest';

export const validateOrderItems = [
    body('items').isArray().notEmpty().withMessage('Items are required'),
    body('items.*.productId').isMongoId().withMessage('Invalid product ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validateRequest
];

export const validateShippingAddress = [
    body('shippingAddress').isObject().notEmpty().withMessage('Shipping address is required'),
    body('shippingAddress.street').isString().notEmpty().withMessage('Street is required'),
    body('shippingAddress.city').isString().notEmpty().withMessage('City is required'),
    body('shippingAddress.state').isString().notEmpty().withMessage('State is required'),
    body('shippingAddress.country').isString().notEmpty().withMessage('Country is required'),
    body('shippingAddress.zipCode').isString().notEmpty().withMessage('Zip code is required'),
    body('shippingAddress.phone').isString().notEmpty().withMessage('Phone is required'),
    validateRequest
];

// middlewares/order.middleware.ts
export const validatePaymentMethod = [
    // Sửa lại enum cho khớp với model
    body('paymentMethod').isIn(['cod', 'stripe', 'momo']).withMessage('Invalid payment method'),
    validateRequest
];

export const validateVoucher = [
    body('voucherId').optional().isMongoId().withMessage('Invalid voucher ID'),
    validateRequest
];

export const validateOrderAmounts = [
    body('shippingFee').isFloat({ min: 0 }).withMessage('Invalid shipping fee'),
    body('subtotal').isFloat({ min: 0 }).withMessage('Invalid subtotal'),
    body('discount').isFloat({ min: 0 }).withMessage('Invalid discount'),
    body('total').isFloat({ min: 0 }).withMessage('Invalid total'),
    validateRequest
]; 