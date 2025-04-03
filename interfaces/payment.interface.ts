export interface IPaymentCommand {
    execute(): Promise<{
        success: boolean;
        error?: string;
        data?: any;
    }>;
}

export interface IPaymentFactory {
    createPaymentCommand(method: string, amount: number, orderId: string): IPaymentCommand;
} 