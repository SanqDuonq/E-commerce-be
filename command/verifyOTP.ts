import { ICommand } from "../interfaces/command.interface";
import OTP from "../models/otp.model";
import User from "../models/user.model";
import throwError from "../utils/create-error";

export class VerifyOTP implements ICommand {
    private email: string
    private otp: string

    constructor(email: string, otp: string) {
        this.email = email;
        this.otp = otp;
    }

    private async checkOTP(email: string, otp: string) {
        if (!(await OTP.findOne({email,otp}))) {
            throwError(400, 'OTP is wrong or expired at');
        }
    }

    async execute(): Promise<void> {
        await this.checkOTP(this.email, this.otp);
        await OTP.deleteOne({email: this.email})
        await User.updateOne({email: this.email, isVerify: true})
    }
}