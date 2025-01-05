import mongoose, { Schema } from 'mongoose'
import { IUser, IUserMethod } from '../interfaces/user.interface'

const UserModel:Schema<IUser & IUserMethod> = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    verifyOTP: {
        type: String
    },
    verifyOTPExpiredAt: {
        type: Date,
        default: null
    },
    resetOTP: {
        type: String
    },
    resetOTPExpiredAt: {
        type: Date,
        default: null
    }
})

const User = mongoose.model('user',UserModel);
export default User;