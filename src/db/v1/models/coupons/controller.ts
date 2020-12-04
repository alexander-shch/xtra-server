import CouponModel, { ICoupon } from './model';

export function GetAllCoupons(): Promise<ICoupon[]> {
  return CouponModel.find({}).then((data) => data);
}

export function GetSingleCoupon(id: string): Promise<ICoupon | undefined> {
  return CouponModel.findById(id).then((data) => data || undefined);
}

export function DeleteSingleCoupon(id: string): Promise<boolean> {
  return CouponModel.findByIdAndDelete(id).then((data) => !!data);
}

export function CreateSingleCoupon(data: ICoupon): Promise<ICoupon> {
  const newCoupons = new CouponModel(data);
  return newCoupons.save().then((data) => data.toJSON());
}

export function UpdateSingleCoupon(
  id: string,
  data: ICoupon
): Promise<ICoupon | undefined> {
  return CouponModel.findByIdAndUpdate(id, { $set: data }, { new: true }).then(
    (data) => data || undefined
  );
}
