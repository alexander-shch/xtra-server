import { Router, Response } from 'express';
import { RequestExtend } from '../../auth';
import allow, { loggedIn } from '../../helper/user-permission';
import { isValidObjectId } from 'mongoose';
import {
  BadRequest,
  SuccessfulResponse,
  ServerError,
  NotFound,
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
} from '../../db/v1/lecturer/controller';
import { CreateNote, DeleteNote } from '../../db/v1/notes/controller';
import Queries from '../../db/queries';
import { Delete, Upload } from '../../db/v1/files/controller';

const lecturerRouter = Router();
const scope = 'lecturer';

lecturerRouter.get(
  '/',
  allow(scope),
  async (_: RequestExtend, res: Response) => {
    return GetAllLecturers()
      .then((data) => SuccessfulResponse(res, data))
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

lecturerRouter.get(
  '/:lectureId',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    const { lectureId } = req.params;
    if (!isValidObjectId(lectureId)) {
      return BadRequest(res);
    }

    return GetSingleLecturer(Queries.ById(lectureId))
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

lecturerRouter.post(
  '/',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    return CreateLecturer(req.body)
      .then((data) => {
        return SuccessfulResponse(res, data);
      })
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

lecturerRouter.put(
  '/:lectureId',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { lectureId } = req.params;
    if (!isValidObjectId(lectureId)) {
      return BadRequest(res);
    }
    return UpdateLecturer(lectureId, req.body)
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

lecturerRouter.delete(
  '/:lectureId',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { lectureId } = req.params;
    if (!isValidObjectId(lectureId)) {
      return BadRequest(res);
    }
    return DeleteLecturer(lectureId)
      .then((deleted) => {
        return SuccessfulResponse(res, { deleted });
      })
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

lecturerRouter.get(
  '/:lecturerId/notes',
  loggedIn,
  (req: RequestExtend, res: Response) => {
    const { lecturerId } = req.params;
    if (!isValidObjectId(lecturerId)) {
      return BadRequest(res);
    }

    return GetNotesByLecturerId(lecturerId)
      .then((notes) => SuccessfulResponse(res, notes))
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

lecturerRouter.post(
  '/:lecturerId/notes',
  loggedIn,
  (req: RequestExtend, res: Response) => {
    const { lecturerId } = req.params;
    if (!isValidObjectId(lecturerId)) {
      return BadRequest(res);
    }

    const { user } = req;

    return CreateNote({
      user: user?._id as string,
      created: new Date().toUTCString(),
      text: req.body.text,
    })
      .then((newNote) => {
        return AddNote(lecturerId, newNote._id).then(() =>
          Promise.resolve(newNote)
        );
      })
      .then((newNote) => SuccessfulResponse(res, newNote))
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

lecturerRouter.delete(
  '/:lecturerId/notes/:noteId',
  loggedIn,
  (req: RequestExtend, res: Response) => {
    const { lecturerId, noteId } = req.params;
    if (!isValidObjectId(lecturerId) || !isValidObjectId(noteId)) {
      return BadRequest(res);
    }

    return DeleteNote(noteId)
      .then(() => RemoveNote(lecturerId, noteId))
      .then(() => SuccessfulResponse(res, { deleted: true }))
      .catch(({ errors }) => {
        console.error(errors);
        return ServerError(res, errors);
      });
  }
);

lecturerRouter.post(
  '/:lecturerId/avatar',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { lecturerId } = req.params;
    if (!isValidObjectId(lecturerId)) {
      return BadRequest(res, 'Lecturer ID is incorrect');
    }

    const fileToUpload = req.files?.file;

    if (!fileToUpload) {
      return BadRequest(res, 'No file was provided');
    }

    return GetSingleLecturer(Queries.ById(lecturerId))
      .then((lecturer) => {
        if (!lecturer.avatar?._id) {
          return Promise.resolve();
        }
        return Delete(Queries.ById(lecturer.avatar._id), false);
      })
      .then(() => Upload(fileToUpload, false))
      .then((fileUploaded) =>
        UpdateLecturerAvatar(lecturerId, fileUploaded._id)
      )
      .then((lecturer) => SuccessfulResponse(res, lecturer))
      .catch((errors) => ServerError(res, errors));
  }
);

lecturerRouter.post(
  '/:lecturerId/file',
  allow(scope),
  allow('files'),
  (req: RequestExtend, res: Response) => {
    const { lecturerId } = req.params;
    if (!isValidObjectId(lecturerId)) {
      return BadRequest(res, 'Lecturer ID is incorrect');
    }

    const fileToUpload = req.files?.file;

    if (!fileToUpload) {
      return BadRequest(res, 'No file was provided');
    }

    return GetSingleLecturer(Queries.ById(lecturerId))
      .then(() => Upload(fileToUpload, true))
      .then((fileUploaded) => PushLecturerFiles(lecturerId, fileUploaded._id))
      .then((lecturer) => SuccessfulResponse(res, lecturer || {}))
      .catch((errors) => ServerError(res, errors));
  }
);

lecturerRouter.delete(
  '/:lecturerId/file/:fileId',
  allow(scope),
  allow('files'),
  (req: RequestExtend, res: Response) => {
    const { lecturerId, fileId } = req.params;
    if (!isValidObjectId(lecturerId)) {
      return BadRequest(res, 'Lecturer ID is incorrect');
    }

    if (!isValidObjectId(fileId)) {
      return BadRequest(res, 'File ID is incorrect');
    }

    return GetSingleLecturer(Queries.ById(lecturerId))
      .then(() => Delete(Queries.ById(fileId), true))
      .then(() => PullLecturerFiles(lecturerId, fileId))
      .then((lecturer) => SuccessfulResponse(res, lecturer || {}))
      .catch((errors) => ServerError(res, errors));
  }
);

export default lecturerRouter;
