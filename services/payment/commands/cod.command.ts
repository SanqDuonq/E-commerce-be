import { PaymentCommand } from './payment.command';

export class CODCommand extends PaymentCommand {
    async execute() {
        try {
            const transactionId = `COD_${this.orderId}_${Date.now()}`;
            
            return {
                success: true,
                data: {
                    transactionId,
                    status: 'pending'
                }
            };
        } catch (error) {
            return {
                success: false,
                error: 'Thanh toán COD thất bại'
            };
        }
    }
} 