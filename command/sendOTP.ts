import { ICommand } from "../interfaces/command.interface";
import mailServices from "../services/mail.services";
import { GenerateOTP } from "./generateOTP";

export class sendOTP implements ICommand {
    private email: string

    constructor(email: string) {
        this.email = email;
    }

    async execute(): Promise<void> {
        const otp = new GenerateOTP(this.email);
        await otp.execute();
        mailServices.sendVerifyEmail(this.email, otp.getOTP());
    }
}