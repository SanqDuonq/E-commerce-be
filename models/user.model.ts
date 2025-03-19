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
        unique: true,
        sparse: true,
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    providers: [
        {
            providerName: { type: String },
            providerId: { type: String}
        }
    ]
},{collection: 'User',timestamps: true})

const User = mongoose.model('User',UserModel);
export default User;