import { PaymentCommand } from './payment.command';
import crypto from 'crypto';
import https from 'https';
import { BadRequestError } from '../../../utils/appError';

interface MomoResponse {
    resultCode: number;
    payUrl?: string;
    orderId: string;
    requestId: string;
    amount: number;
    message: string;
    responseTime: number;
}

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
        this.endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';
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
            const requestId = this.orderId;
            const extraData = '';
            const orderGroupId = '';
            const autoCapture = true;
            const lang = 'vi';

            const rawSignature = `accessKey=${this.accessKey}&amount=${this.amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${this.orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=payWithMethod`;

            const signature = this.createSignature(rawSignature);

            const requestBody = JSON.stringify({
                partnerCode: this.partnerCode,
                partnerName: "Test",
                storeId: "MomoTestStore",
                requestId,
                amount: this.amount,
                orderId: this.orderId,
                orderInfo,
                redirectUrl,
                ipnUrl,
                lang,
                requestType: 'payWithMethod',
                autoCapture,
                extraData,
                orderGroupId,
                signature
            });

            return new Promise<{
                success: boolean;
                error?: string;
                data?: any;
            }>((resolve, reject) => {
                const options = {
                    hostname: 'test-payment.momo.vn',
                    port: 443,
                    path: '/v2/gateway/api/create',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(requestBody)
                    }
                };

                const req = https.request(options, res => {
                    let body = '';
                    res.setEncoding('utf8');
                    res.on('data', (chunk) => {
                        body += chunk;
                    });
                    res.on('end', () => {
                        try {
                            const response = JSON.parse(body) as MomoResponse;
                            if (response.resultCode === 0) {
                                resolve({
                                    success: true,
                                    data: {
                                        transactionId: response.orderId,
                                        status: 'pending',
                                        payUrl: response.payUrl,
                                        message: response.message,
                                        resultCode: response.resultCode
                                    }
                                });
                            } else {
                                resolve({
                                    success: false,
                                    error: response.message || 'Thanh toán Momo thất bại'
                                });
                            }
                        } catch (error) {
                            resolve({
                                success: false,
                                error: 'Lỗi xử lý phản hồi từ Momo'
                            });
                        }
                    });
                });

                req.on('error', (error) => {
                    resolve({
                        success: false,
                        error: 'Lỗi kết nối đến Momo'
                    });
                });

                req.write(requestBody);
                req.end();
            });
        } catch (error) {
            return {
                success: false,
                error: 'Thanh toán Momo thất bại'
            };
        }
    }
} 