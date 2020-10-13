import { Router, Response } from 'express';
import { RequestExtend } from '../../auth';
import allow from '../../helper/user-permission';
import { isValidObjectId } from 'mongoose';
import {
  BadRequest,
  SuccessfulResponse,
  ServerError,
  NotFound,
} from '../../helper/http';
import {
  GetAllPayDuplicators,
  GetSinglePayDuplicator,
  CreatePayDuplicator,
  UpdatePayDuplicator,
  DeletePayDuplicator,
} from '../../db/v1/models/pay-duplicator/controller';

const payDuplicatorRouter = Router();
const scope = 'payDuplicator';

payDuplicatorRouter.get(
  '/',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    if (!isValidObjectId(req.params.id)) {
      return BadRequest(res);
    }

    return GetAllPayDuplicators()
      .then((data) => {
        return SuccessfulResponse(res, data);
      })
      .catch((err) => {
        console.error(err.errors);
        return ServerError(res);
      });
  }
);

payDuplicatorRouter.get(
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }

    return GetSinglePayDuplicator({ _id: id })
      .then((data) => {
        if (!data) {
          return NotFound(res);
        }
        return SuccessfulResponse(res, data);
      })
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

payDuplicatorRouter.post(
  '/',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    return CreatePayDuplicator(req.body)
      .then((data) => {
        return SuccessfulResponse(res, data);
      })
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

payDuplicatorRouter.put(
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }
    return UpdatePayDuplicator(id, req.body)
      .then((data) => {
        if (!data) {
          return NotFound(res);
        }
        return SuccessfulResponse(res, data);
      })
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

payDuplicatorRouter.delete(
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }
    return DeletePayDuplicator(id)
      .then((deleted) => {
        return SuccessfulResponse(res, { deleted });
      })
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

export default payDuplicatorRouter;
