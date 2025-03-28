import { IPaymentFactory, IPaymentCommand } from '../../interfaces/payment.interface';
import { CODCommand } from './commands/cod.command';
import { StripeCommand } from './commands/stripe.command';
import { MomoCommand } from './commands/momo.command';

export class PaymentFactory implements IPaymentFactory {
    createPaymentCommand(method: string, amount: number, orderId: string): IPaymentCommand {
        switch (method.toLowerCase()) {
            case 'cod':
                return new CODCommand(amount, orderId);
            case 'stripe':
                return new StripeCommand(amount, orderId);
            case 'momo':
                return new MomoCommand(amount, orderId);
            default:
                throw new Error('Unsupported payment method');
        }
    }
} 