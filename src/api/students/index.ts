import { Router, Response } from 'express';
import { RequestExtend } from '../../auth';
import allow, { loggedIn } from '../../helper/user-permission';
import { isValidObjectId } from 'mongoose';
import {
  BadRequest,
  SuccessfulResponse,
  ServerError,
  NotFound,
  SuccessOrNotFound,
} from '../../helper/http';
import {
  GetAllLecturers,
  GetSingleLecturer,
  CreateLecturer,
  UpdateLecturer,
  DeleteLecturer,
  AddNote,
  RemoveNote,
  UpdateLecturerAvatar,
  GetNotesByLecturerId,
  PushLecturerFiles,
  PullLecturerFiles,
} from '../../db/v1/models/lecturer/controller';
import { CreateNote, DeleteNote } from '../../db/v1/models/notes/controller';
import Queries from '../../db/queries';
import { Delete, Upload } from '../../db/v1/models/files/controller';
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
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
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
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
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
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
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
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
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
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
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
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
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
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
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
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

export default lecturerRouter;
