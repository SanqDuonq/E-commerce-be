import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const UserModel:Schema<IUser> = new Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
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
},{collection: 'User',timestamps: true})

const User = mongoose.model('User',UserModel);
export default User;