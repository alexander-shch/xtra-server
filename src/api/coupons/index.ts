import { Router, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { RequestExtend } from '../../auth';
import allow from '../../helper/user-permission';
import {
  BadRequest,
  SuccessfulResponse,
  ServerError,
  SuccessOrNotFound,
} from '../../helper/http';
import {
  CreateSingleCoupon,
  DeleteSingleCoupon,
  GetAllCoupons,
  GetSingleCoupon,
  UpdateSingleCoupon,
} from '../../db/v1/models/coupons/controller';

const couponsRouter = Router();
const scope = 'coupons';

couponsRouter.get('/', allow(scope), (_: RequestExtend, res: Response) => {
  return GetAllCoupons()
    .then((data) => {
      return SuccessfulResponse(res, data);
    })
    .catch((err) => {
      console.error(err.errors);
      return ServerError(res);
    });
});

couponsRouter.get('/:id', allow(scope), (req: RequestExtend, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return BadRequest(res);
  }

  return GetSingleCoupon(id)
    .then((data) => {
      return SuccessOrNotFound(res, data);
    })
    .catch((err) => {
      console.error(err.errors);
      return ServerError(res);
    });
});

couponsRouter.post('/', allow(scope), (req: RequestExtend, res: Response) => {
  return CreateSingleCoupon(req.body)
    .then((data) => {
      return SuccessfulResponse(res, data);
    })
    .catch((err) => {
      console.error(err.errors);
      return ServerError(res);
    });
});

couponsRouter.put('/:id', allow(scope), (req: RequestExtend, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return BadRequest(res);
  }

  return UpdateSingleCoupon(id, req.body)
    .then((data) => {
      return SuccessOrNotFound(res, data);
    })
    .catch((err) => {
      console.error(err.errors);
      return ServerError(res);
    });
});

couponsRouter.delete(
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }

    return DeleteSingleCoupon(id)
      .then((deleted) => {
        return SuccessOrNotFound(res, { deleted });
      })
      .catch((err) => {
        console.error(err.errors);
        return ServerError(res);
      });
  }
);

export default couponsRouter;
