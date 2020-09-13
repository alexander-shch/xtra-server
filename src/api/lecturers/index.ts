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
import { GetNotes, CreateNote, DeleteNote } from '../../db/v1/notes/controller';
import Queries from '../../db/queries';

const lecturerRouter = Router();
const scope = 'lecturer';

lecturerRouter.get('/', allow(scope), (req: RequestExtend, res: Response) => {
  if (!isValidObjectId(req.params.id)) {
    return BadRequest(res);
  }

  return GetAllLecturers()
    .then((data) => {
      return SuccessfulResponse(res, data);
    })
    .catch((err) => {
      console.error(err.errors);
      return ServerError(res);
    });
});

lecturerRouter.get(
  '/:id',
  allow(scope),
  (req: RequestExtend, res: Response) => {
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
      .then((notes) => GetNotes(Queries.ByIds(notes as string[])))
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

export default lecturerRouter;
