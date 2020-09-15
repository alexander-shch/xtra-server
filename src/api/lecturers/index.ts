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
      .then((data) => {
        console.log(data);

        return SuccessfulResponse(res, data);
      })
      .catch((err) => {
        console.error(err.errors);
        return ServerError(res);
      });
  }
);

lecturerRouter.get(
  '/:id',
  allow(scope),
  async (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }

    return GetSingleLecturer({ _id: id })
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
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }
    return UpdateLecturer(id, req.body)
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
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return BadRequest(res);
    }
    return DeleteLecturer(id)
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

    return GetSingleLecturer(Queries.ById(lecturerId))
      .then((lecturer) => lecturer?.notes || [])
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
      .then((newNote) => AddNote(lecturerId, newNote._id))
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
        return Delete(Queries.ById(lecturer.avatar._id));
      })
      .then(() => Upload(fileToUpload))
      .then((fileUploaded) =>
        UpdateLecturer(lecturerId, { avatar: fileUploaded._id })
      )
      .then((lecturer) => SuccessfulResponse(res, lecturer))
      .catch((errors) => ServerError(res, errors));
  }
);

export default lecturerRouter;
