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
        index: {expires: 60 * 10}
    }
}, {collection: 'Otp'})

const OTP = mongoose.model('Otp',OtpModel);
export default OTP;
