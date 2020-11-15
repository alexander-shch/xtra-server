import { Response, Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { RequestExtend } from '../../auth';
import Queries from '../../db/queries';
import {
  CreateSemester,
  DeleteSemester,
  GetAllSemesters,
  GetSemester,
  UpdateSemester,
} from '../../db/v1/models/semester/controller';
import { BadRequest, ServerError, SuccessfulResponse } from '../../helper/http';
import allow from '../../helper/user-permission';

const scope = 'semesters';
const SemesterRouter = Router();
SemesterRouter.use(allow(scope));

SemesterRouter.get('/', (_: RequestExtend, res: Response) => {
  return GetAllSemesters()
    .then((data) => SuccessfulResponse(res, data))
    .catch(({ errors }) => ServerError(res, errors));
});

SemesterRouter.get('/:id', (req: RequestExtend, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return BadRequest(res);
  }
  return GetSemester(Queries.ById(id))
    .then((data) => SuccessfulResponse(res, data))
    .catch(({ errors }) => ServerError(res, errors));
});

SemesterRouter.post('/', (req: RequestExtend, res: Response) => {
  const semesterData = req.body;
  return CreateSemester(semesterData)
    .then((data) => SuccessfulResponse(res, data))
    .catch(({ errors }) => ServerError(res, errors));
});

SemesterRouter.put('/:id', (req: RequestExtend, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return BadRequest(res);
  }
  const semesterData = req.body;
  return UpdateSemester(id, semesterData)
    .then((data) => SuccessfulResponse(res, data))
    .catch(({ errors }) => ServerError(res, errors));
});

SemesterRouter.delete('/:id', (req: RequestExtend, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return BadRequest(res);
  }
  return DeleteSemester(id)
    .then((deleted) => SuccessfulResponse(res, { deleted }))
    .catch(({ errors }) => ServerError(res, errors));
});

export default SemesterRouter;
