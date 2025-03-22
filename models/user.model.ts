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
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: function () {
            return !this.oauth?.googleId; 
        }
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    oauth: {
        googleId: { type: String, unique: true, sparse: true}
    }
},{collection: 'User',timestamps: true})

const User = mongoose.model('User',UserModel);
export default User;