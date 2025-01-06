import mongoose, { Schema } from "mongoose";
import { IOtp } from "../interfaces/otp.interface";

const OtpModel:Schema<IOtp> = new Schema({
    email: {
        type: String
    },
    otp: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now,
        index: {expires: 60 * 15}
    }
}, {collection: 'otp'})

const OTP = mongoose.model('OTP',OtpModel);
export default OTP;
