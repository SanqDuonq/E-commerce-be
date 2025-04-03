import { ICommand } from "../interfaces/command.interface";
import OTP from "../models/otp.model";
import mailServices from "../services/mail.services";
import { GenerateOTP } from "./generateOTP";

export class ResendOTP implements ICommand {
    private email: string

    constructor(email: string) {
        this.email = email
    }

    private async findOTP(email: string) {
        const otpRecord = await OTP.findOne({email});
        if (!otpRecord) {
            const otp = new GenerateOTP(email);
            await otp.execute();
            mailServices.sendVerifyEmail(email, otp.getOTP());
            return otp.getOTP();
        }
        return otpRecord.otp;
    }

    async execute(): Promise<void> {
        await this.findOTP(this.email)
    }
}