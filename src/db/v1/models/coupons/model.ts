import { Document, model, Schema } from 'mongoose';

export interface ICoupon {
  code: string;
  isPercent: boolean;
  discount: number;
}

export type ICouponDOC = ICoupon & Document;

const CouponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  isPercent: { type: Boolean, required: true },
  discount: { type: Number, required: true },
});

export default model<ICouponDOC>('coupons', CouponSchema);
