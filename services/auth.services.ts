import { IAuth } from "../interfaces/auth.interface";
import User from "../models/user.model";
import createErrors from 'http-errors';
import bcrypt from 'bcrypt';
import OTP from "../models/otp.model";
import GenerateOTP from "../utils/otp";
import mailServices from "./mail.services";
import jwtServices from "./jwt.services";

class AuthServices implements IAuth {
    async signUp(data: { fullName: string; email: string; phoneNumber: number; profilePicture: string; password: string; }): Promise<{userId:string}> {
        const user = await User.findOne({email: data.email})
        if (user) {
            throw createErrors(409,'Email already exists');
        }
        const hashPassword = await bcrypt.hash(data.password,10);
        const newUser = new User({
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            password: hashPassword,
            profilePicture: data.profilePicture
        });
        await newUser.save();
        const otpCode = GenerateOTP();
        const newOTP = new OTP({
            email: data.email,
            otp: otpCode
        })
        await newOTP.save();
        await mailServices.sendVerifyEmail(data.email,otpCode);
        return {userId: newUser._id.toString()}
    }
    async signIn(data: { email: string; password: string; }): Promise<{userId:string}> {
        const user = await User.findOne({email: data.email});
        if (!user) {
            throw createErrors(404,'Email is not exists');
        }
        const isMatch = await bcrypt.compare(data.password,user.password);
        if (!isMatch) {
            throw createErrors(400,'Email or password wrong');
        }
        return {userId: user._id.toString()}
    }
    async verifyEmail(data: { email: string; OTP: string; }): Promise<void> {
        const user = await User.findOne({email: data.email});
        if (!user) {
            throw createErrors(404, 'Email is not exists');
        }
        const otp = await OTP.findOne({otp:data.OTP});
        if (!otp) {
            throw createErrors(400,'OTP expired or wrong');
        }
        user.isVerify = true;
        await user.save();
    }
    async forgotPassword(data: { email: string; }): Promise<void> {
        
    }
    async resetPassword(data: { email: string; OTP: string; }): Promise<void> {
        
    }
}

const authServices = new AuthServices();
export default authServices;