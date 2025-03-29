import { ICommand } from "../interfaces/command.interface";
import otpGenerator from "otp-generator";
import OTP from "../models/otp.model";

export class GenerateOTP implements ICommand {
	private email: string;
	private otp: string;

	constructor(email: string) {
		this.email = email;
		this.otp = otpGenerator.generate(6, {
			lowerCaseAlphabets: false,
			upperCaseAlphabets: false,
			specialChars: false,
		});
	}

	async execute(): Promise<void> {
		await OTP.create({
			email: this.email,
			otp: this.otp,
			time: new Date(Date.now() + 1000 * 60 * 10),
		});
	}

    getOTP(): string {
        return this.otp;
    }
}
