import mongoose, { Schema } from "mongoose";
import { IOtp } from "../interfaces/otp.interface";

const OtpModel:Schema<IOtp> = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, {collection: 'Otp'})

const OTP = mongoose.model('Otp',OtpModel);
export default OTP;
