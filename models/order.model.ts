import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
}

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
  };
  shippingMethod: string;
  shippingFee: number;
  subtotal: number;
  voucherId?: mongoose.Types.ObjectId;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'stripe' | 'momo';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  orderStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    name: {
      type: String,
      required: true
    }
  }],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  shippingMethod: {
    type: String,
    required: true,
    enum: ['standard', 'express', 'economy']
  },
  shippingFee: {
    type: Number,
    required: true,
    min: 0
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  voucherId: {
    type: Schema.Types.ObjectId,
    ref: 'Voucher'
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod' , 'stripe' , 'momo']
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  notes: String
}, {
  timestamps: true
});

export default mongoose.model<IOrder>('Order', OrderSchema); 