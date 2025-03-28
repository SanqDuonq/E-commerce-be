import { PaymentCommand } from './payment.command';
import Stripe from 'stripe';

export class StripeCommand extends PaymentCommand {
    private stripe: Stripe;

    constructor(amount: number, orderId: string) {
        super(amount, orderId);
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-12-18.acacia'
        });
    }

    async execute() {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: this.amount * 100,
                currency: 'vnd',
                metadata: {
                    orderId: this.orderId
                }
            });

            return {
                success: true,
                data: {
                    transactionId: paymentIntent.id,
                    status: 'pending'
                }
            };
        } catch (error) {
            return {
                success: false,
                error: 'Thanh toán Stripe thất bại'
            };
        }
    }
} 