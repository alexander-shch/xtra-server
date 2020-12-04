import { Router, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { RequestExtend } from '../../auth';
import allow from '../../helper/user-permission';
import {
  GetMultipleCourses,
  GetSingleCourse,
  UpdateCourse,
  DeleteSingleCourse,
  CreateCourse,
} from '../../db/v1/models/courses/controller';
import {
  BadRequest,
  NotFound,
  ServerError,
  SuccessfulResponse,
} from '../../helper/http';
import Queries from '../../db/queries';

const coursesRouter = Router();
const scope = 'courses';

coursesRouter.get(
  '/',
  allow(scope),
  async (_: RequestExtend, res: Response) => {
    return GetMultipleCourses()
      .then((data) => {
        return SuccessfulResponse(res, data);
      })
      .catch((error) => ServerError(res, error));
  }
);

coursesRouter.post(
  '/',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    return CreateCourse(req.body)
      .then((data) => {
        return SuccessfulResponse(res, data);
      })
      .catch((error) => ServerError(res, error));
  }
);

coursesRouter.get(
  '/:courseId',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    const { courseId } = req.params;
    if (!isValidObjectId(courseId)) {
      return BadRequest(res);
    }
    return GetSingleCourse(Queries.ById(courseId))
      .then((data) => {
        if (!data) {
          return NotFound(res);
        }
        return SuccessfulResponse(res, data);
      })
      .catch((error) => ServerError(res, error));
  }
);

coursesRouter.put(
  '/:courseId',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    const { courseId } = req.params;
    if (!isValidObjectId(courseId)) {
      return BadRequest(res);
    }
    return UpdateCourse(courseId, req.body)
      .then((data) => {
        if (!data) {
          return NotFound(res);
        }
        return SuccessfulResponse(res, data);
      })
      .catch((error) => ServerError(res, error));
  }
);

coursesRouter.delete(
  '/:courseId',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    const { courseId } = req.params;
    if (!isValidObjectId(courseId)) {
      return BadRequest(res);
    }
    return DeleteSingleCourse(Queries.ById(courseId))
      .then((deleted) => {
        return SuccessfulResponse(res, { deleted });
      })
      .catch((error) => ServerError(res, error));
  }
);

export default coursesRouter;
