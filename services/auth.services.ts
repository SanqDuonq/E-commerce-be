import mailServices from "./mail.services";
import authRepository from "../repository/auth.repository";
import throwError from '../utils/create-error';
import bcrypt from "../utils/bcrypt";
import { IUser } from "../interfaces/user.interface";
import otpServices from "./otp.services";
import otpRepository from "../repository/otp.repository";

class AuthServices {
    private async checkEmail(email: string) {
        if (await authRepository.findEmail(email)) {
            throwError(404, 'Email is already exists')
        }
    }

    private async getUserByEmail(email: string) {
        return (await authRepository.findEmail(email)) ?? throwError(404, 'Email not found');
    }

    private async comparePassword(password: string, hashPassword: string) {
        if (!(await bcrypt.Compare(password,hashPassword))) {
            throwError(400, 'Email or password wrong')
        }
    }

    signUp = async(user: IUser) => {
        await this.checkEmail(user.email);
        user.password = await bcrypt.Hash(user.password);
        const otp = otpServices.generateOTP();
        await otpServices.saveOTP(user.email,otp);
        mailServices.sendVerifyEmail(user.email,otp);
        return await authRepository.createUser(user);
    }

    signIn = async (email: string, password: string) => {
        const user = await this.getUserByEmail(email);
        await this.comparePassword(password, user.password);
        return user.id;
    }

    forgotPassword = async (email: string) => {
        await this.getUserByEmail(email);
        const otp = otpServices.generateOTP();
        await otpServices.saveOTP(email,otp);
        mailServices.sendForgotPasswordEmail(email,otp);
    }

    resetPassword = async (email: string, otp: string, newPassword: string) => {
        await otpServices.verifyOTP(email,otp);
        await authRepository.updatePassword(email, await bcrypt.Hash(newPassword));
        await otpRepository.deleteOTP(email);
    }
}

const authServices = new AuthServices();
export default authServices;