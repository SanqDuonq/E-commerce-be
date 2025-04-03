import { Request, Response } from 'express';
import { paymentService } from '../services/payment/payment.service';
import { success, error } from '../utils/response';
import { catchAsync } from '../utils/catchAsync';

class PaymentController {
    getAllPaymentMethods = catchAsync(async (req: Request, res: Response) => {
        const methods = paymentService.getAllPaymentMethods();
        return success(res, 200, 'Get all payment methods successful', methods);
    });

    processPayment = catchAsync(async (req: Request, res: Response) => {
        const { method, amount, orderId } = req.body;

        if (!method || !amount || !orderId) {
            return error(res, 400, 'Missing required parameters');
        }

        const result = await paymentService.processPayment(method, amount, orderId);

        if (!result.success) {
            return error(res, 400, result.error || 'Payment failed');
        }

        return success(res, 200, 'Payment successful', result);
    });

    refundPayment = catchAsync(async (req: Request, res: Response) => {
        const { method, transactionId, amount } = req.body;

        if (!method || !transactionId || !amount) {
            return error(res, 400, 'Missing required parameters');
        }

        const result = await paymentService.refundPayment(method, transactionId, amount);

        if (!result.success) {
            return error(res, 400, result.error || 'Refund failed');
        }

        return success(res, 200, 'Refund successful', result);
    });
}

const paymentController = new PaymentController();
export default paymentController; 