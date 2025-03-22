import {Request} from 'express'
import { IUser } from './user.interface'

export interface IAuth {
    signIn(data: {email:string,password:string}):Promise<{userId:string}>,
    signUp(data: {fullName:string,email:string,phoneNumber:number,profilePicture:string,password:string}): Promise<{userId:string}>,
    verifyEmail(data:{email:string,OTP:string}):Promise<void>,
    forgotPassword(data: {email:string}): Promise<void>,
    resetPassword(data: {OTP:string,newPassword: string}):Promise<void>
}

export interface IAuthRequest extends Request {
    user?: string
}