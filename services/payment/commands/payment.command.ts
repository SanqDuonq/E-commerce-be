import { IPaymentCommand } from '../../../interfaces/payment.interface';

export abstract class PaymentCommand implements IPaymentCommand {
    constructor(
        protected amount: number,
        protected orderId: string
    ) {}

    abstract execute(): Promise<{
        success: boolean;
        error?: string;
        data?: any;
    }>;
} 