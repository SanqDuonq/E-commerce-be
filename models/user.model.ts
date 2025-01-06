import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const UserModel:Schema<IUser> = new Schema({
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
    isVerify: {
        type: Boolean,
        default: false
    }
},{collection: 'user',timestamps: true})

const User = mongoose.model('user',UserModel);
export default User;