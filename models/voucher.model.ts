import mongoose, { Schema } from 'mongoose';
import { IVoucher } from '../interfaces/voucher.interface';

const VoucherSchema: Schema<IVoucher> = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    minOrderValue: {
        type: Number
    },
    maxDiscountValue: {
        type: Number
    },
    usageLimit: {
        type: Number
    },
    usedCount: {
        type: Number,
        default: 0
    },
    applyTo: {
        type: String,
        enum: ['product', 'shipping', 'order'],
        required: true
    },
    applyToIds: [{
        type: String
    }]
}, {
    timestamps: true
});

const Voucher = mongoose.model<IVoucher>('Voucher', VoucherSchema);
export default Voucher; 