const mongoErrors = require('mongo-error-handler');
import { Router, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { RequestExtend } from '../../auth';
import allow, { loggedIn } from '../../helper/user-permission';
import Queries from '../../db/queries';
import {
  BadRequest,
  SuccessfulResponse,
  ServerError,
  NotFound,
  SuccessOrNotFound,
} from '../../helper/http';
import { CreateNote, DeleteNote } from '../../db/v1/models/notes/controller';
import {
  CreateSingleStudent,
  DeleteSingleStudent,
  GetAllStudents,
  GetSingleStudent,
  GetStudentNotes,
  UpdateSingleStudent,
} from '../../db/v1/models/students/controller';

const studentRouter = Router();
const scope = 'students';

studentRouter.get(
  '/',
  allow(scope),
  async (_: RequestExtend, res: Response) => {
    return GetAllStudents()
      .then((data) => SuccessfulResponse(res, data))
      .catch((error) => {
        return ServerError(res, mongoErrors(error));
      });
  }
);

studentRouter.get(
  '/:studentId',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    const { studentId } = req.params;
    if (!isValidObjectId(studentId)) {
      return BadRequest(res);
    }

    return GetSingleStudent(Queries.ById(studentId))
      .then((data) => {
        if (!data) {
          return NotFound(res);
        }
        return SuccessfulResponse(res, data);
      })
      .catch((error) => {
        return ServerError(res, mongoErrors(error));
      });
  }
);

studentRouter.post(
  '/',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    return CreateSingleStudent(req.body)
      .then((data) => {
        return SuccessfulResponse(res, data);
      })
      .catch((error) => {
        return ServerError(res, mongoErrors(error));
      });
  }
);

studentRouter.put(
  '/:studentId',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { studentId } = req.params;
    if (!isValidObjectId(studentId)) {
      return BadRequest(res);
    }
    return UpdateSingleStudent(studentId, req.body)
      .then((data) => {
        return SuccessOrNotFound(res, data);
      })
      .catch((error) => {
        return ServerError(res, mongoErrors(error));
      });
  }
);

studentRouter.delete(
  '/:studentId',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { studentId } = req.params;
    if (!isValidObjectId(studentId)) {
      return BadRequest(res);
    }
    return DeleteSingleStudent(studentId)
      .then((deleted) => {
        return SuccessfulResponse(res, { deleted });
      })
      .catch((error) => {
        return ServerError(res, mongoErrors(error));
      });
  }
);

studentRouter.get(
  '/:studentId/notes',
  loggedIn,
  (req: RequestExtend, res: Response) => {
    const { studentId } = req.params;
    if (!isValidObjectId(studentId)) {
      return BadRequest(res);
    }

    return GetStudentNotes(studentId)
      .then((notes) => SuccessfulResponse(res, notes))
      .catch((error) => {
        return ServerError(res, mongoErrors(error));
      });
  }
);

studentRouter.post(
  '/:studentId/notes',
  loggedIn,
  (req: RequestExtend, res: Response) => {
    const { studentId } = req.params;
    if (!isValidObjectId(studentId)) {
      return BadRequest(res);
    }

    const { user } = req;

    return CreateNote({
      user: user?._id as string,
      created: new Date().toUTCString(),
      text: req.body.text,
      related: studentId,
    })
      .then((newNote) => SuccessfulResponse(res, newNote))
      .catch((error) => {
        return ServerError(res, mongoErrors(error));
      });
  }
);

studentRouter.delete(
  '/:studentId/notes/:noteId',
  loggedIn,
  (req: RequestExtend, res: Response) => {
    const { studentId, noteId } = req.params;
    if (!isValidObjectId(studentId) || !isValidObjectId(noteId)) {
      return BadRequest(res);
    }

    return DeleteNote(noteId)
      .then((deleted) => SuccessfulResponse(res, { deleted }))
      .catch((error) => {
        return ServerError(res, mongoErrors(error));
      });
  }
);

export default studentRouter;
