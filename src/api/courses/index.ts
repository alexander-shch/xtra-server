const mongoErrors = require('mongo-error-handler');
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
  PushCourseFiles,
  PullCourseFiles,
} from '../../db/v1/models/courses/controller';
import {
  BadRequest,
  NotFound,
  ServerError,
  SuccessfulResponse,
} from '../../helper/http';
import Queries from '../../db/queries';
import { Delete, Upload } from '../../db/v1/models/files/controller';

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
      .catch((error) => ServerError(res, mongoErrors(error)));
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
      .catch((error) => ServerError(res, mongoErrors(error)));
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
      .catch((error) => ServerError(res, mongoErrors(error)));
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
      .catch((error) => ServerError(res, mongoErrors(error)));
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
      .catch((error) => ServerError(res, mongoErrors(error)));
  }
);

coursesRouter.post(
  '/:courseId/file',
  allow(scope),
  allow('files'),
  (req: RequestExtend, res: Response) => {
    const { courseId } = req.params;
    if (!isValidObjectId(courseId)) {
      return BadRequest(res, 'Course ID is incorrect');
    }

    const fileToUpload = req.files?.file;

    if (!fileToUpload) {
      return BadRequest(res, 'No file was provided');
    }

    return GetSingleCourse(Queries.ById(courseId))
      .then(() => Upload(fileToUpload, true))
      .then((fileUploaded) => PushCourseFiles(courseId, fileUploaded._id))
      .then((lecturer) => SuccessfulResponse(res, lecturer || {}))
      .catch((errors) => ServerError(res, mongoErrors(errors)));
  }
);

coursesRouter.delete(
  '/:courseId/file/:fileId',
  allow(scope),
  allow('files'),
  (req: RequestExtend, res: Response) => {
    const { courseId, fileId } = req.params;
    if (!isValidObjectId(courseId)) {
      return BadRequest(res, 'Lecturer ID is incorrect');
    }

    if (!isValidObjectId(fileId)) {
      return BadRequest(res, 'File ID is incorrect');
    }

    return GetSingleCourse(Queries.ById(courseId))
      .then(() => Delete(Queries.ById(fileId), true))
      .then(() => PullCourseFiles(courseId, fileId))
      .then((course) => SuccessfulResponse(res, course || {}))
      .catch((errors) => ServerError(res, errors));
  }
);

export default coursesRouter;
