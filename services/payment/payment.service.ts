import { PaymentFactory } from './payment-factory.service';

class PaymentService {
    private paymentFactory: PaymentFactory;

    constructor() {
        this.paymentFactory = new PaymentFactory();
    }

    getAllPaymentMethods() {
        return [
            { id: 'cod', name: 'Cash on Delivery' },
            { id: 'stripe', name: 'Credit Card (Stripe)' },
            { id: 'momo', name: 'Momo Wallet' }
        ];
    }

    async processPayment(method: string, amount: number, orderId: string) {
        try {
            const command = this.paymentFactory.createPaymentCommand(method, amount, orderId);
            const result = await command.execute();

            if (!result.success) {
                return {
                    success: false,
                    error: result.error
                };
            }

            return {
                success: true,
                data: {
                    method,
                    amount,
                    orderId,
                    status: result.data?.status || 'pending',
                    ...result.data
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Payment processing failed'
            };
        }
    }

    async refundPayment(method: string, transactionId: string, amount: number) {
        try {
            const command = this.paymentFactory.createPaymentCommand(method, amount, transactionId);
            const result = await command.execute();

            if (!result.success) {
                return {
                    success: false,
                    error: result.error
                };
            }

            return {
                success: true,
                data: {
                    method,
                    amount,
                    transactionId,
                    status: 'refunded',
                    ...result.data
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Refund failed'
            };
        }
    }
}

export const paymentService = new PaymentService(); 