import { Router, Response } from 'express';
import { PermissionsScope } from '../../models';
import allow from '../../helper/user-permission';
import { RequestExtend } from '../../auth';
import { isValidObjectId } from 'mongoose';
import { GetFileById } from '../../db/v1/files/controller';
import { ServerError } from '../../helper/http';
import path from 'path';
import { getPath } from '../../services/files';

const filesRouter = Router();
const scope: PermissionsScope = 'files';
const allowPath = allow(scope);

filesRouter.get(
  '/:fileId',
  allowPath,
  async (req: RequestExtend, res: Response) => {
    const { fileId } = req.params;
    if (!isValidObjectId(fileId)) {
      return res.sendStatus(400);
    }
    return GetFileById(fileId)
      .then((fileData) => {
        res.attachment(fileData.name);
        res.download(path.join(getPath(fileData.secure), fileData.name));
      })
      .catch((errors) => ServerError(res, errors));
  }
);

export default filesRouter;
