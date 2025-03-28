import { PaymentCommand } from './payment.command';
import crypto from 'crypto';

export class MomoCommand extends PaymentCommand {
    private partnerCode: string;
    private accessKey: string;
    private secretKey: string;
    private endpoint: string;

    constructor(amount: number, orderId: string) {
        super(amount, orderId);
        this.partnerCode = process.env.MOMO_PARTNER_CODE!;
        this.accessKey = process.env.MOMO_ACCESS_KEY!;
        this.secretKey = process.env.MOMO_SECRET_KEY!;
        this.endpoint = process.env.MOMO_ENDPOINT!;
    }

    private createSignature(data: string): string {
        return crypto
            .createHmac('sha256', this.secretKey)
            .update(data)
            .digest('hex');
    }

    async execute() {
        try {
            const orderInfo = `Thanh toan don hang ${this.orderId}`;
            const redirectUrl = `${process.env.FRONTEND_URL}/payment/success`;
            const ipnUrl = `${process.env.BACKEND_URL}/api/payment/momo/callback`;

            const requestId = Date.now().toString();
            const orderType = 'momo_wallet';
            const transId = `MOMO_${this.orderId}_${Date.now()}`;

            const rawSignature = `accessKey=${this.accessKey}&amount=${this.amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${this.orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;

            const signature = this.createSignature(rawSignature);

            const requestBody = {
                partnerCode: this.partnerCode,
                partnerName: 'Test',
                storeId: 'Test Store',
                requestId: requestId,
                amount: this.amount,
                orderId: this.orderId,
                orderInfo: orderInfo,
                redirectUrl: redirectUrl,
                ipnUrl: ipnUrl,
                lang: 'vi',
                extraData: '',
                requestType: 'captureWallet',
                signature: signature,
                orderType: orderType,
                transId: transId
            };

            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            if (result.payUrl) {
                return {
                    success: true,
                    data: {
                        transactionId: transId,
                        status: 'pending',
                        payUrl: result.payUrl
                    }
                };
            }

            return {
                success: false,
                error: 'Thanh toán Momo thất bại'
            };
        } catch (error) {
            return {
                success: false,
                error: 'Thanh toán Momo thất bại'
            };
        }
    }
} 