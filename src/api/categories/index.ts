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
  GetAllCategories,
  GetSingleCategory,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
} from '../../db/v1/models/categories/controller';

const categoriesRouter = Router();
const scope = 'categories';

categoriesRouter.get('/', allow(scope), (req: RequestExtend, res: Response) => {
  if (!isValidObjectId(req.params.id)) {
    return BadRequest(res);
  }

  return GetAllCategories()
    .then((data) => {
      return SuccessfulResponse(res, data);
    })
    .catch((err) => {
      console.error(err.errors);
      return ServerError(res);
    });
});

categoriesRouter.get(
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }

    return GetSingleCategory({ _id: id })
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

categoriesRouter.post(
  '/',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    return CreateCategory(req.body)
      .then((data) => {
        return SuccessfulResponse(res, data);
      })
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

categoriesRouter.put(
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }
    return UpdateCategory(id, req.body)
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

categoriesRouter.delete(
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }
    return DeleteCategory(id)
      .then((deleted) => {
        return SuccessfulResponse(res, { deleted });
      })
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

export default categoriesRouter;
