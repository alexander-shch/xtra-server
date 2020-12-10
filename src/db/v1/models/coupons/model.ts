import { Document, model, Schema } from 'mongoose';

export interface ICoupon {
  title: string;
  code: string;
  isPercent: boolean;
  discount: number;
  active: boolean;
  effectiveFrom: Date;
  effectiveTo: Date;
}

export type ICouponDOC = ICoupon & Document;

const CouponSchema = new Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  isPercent: { type: Boolean, required: true },
  discount: { type: Number, required: true },
  active: { type: Boolean, required: true },
  effectiveFrom: { type: Date, required: false },
  effectiveTo: { type: Date, required: false },
});

export default model<ICouponDOC>('coupons', CouponSchema);
