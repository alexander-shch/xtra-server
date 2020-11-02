import { Response, Router } from 'express';
import { RequestExtend } from '../../auth';
import {
  findSingleSettings,
  updateSetting,
} from '../../db/v1/models/settings/controller';
import { NotFound, ServerError, SuccessfulResponse } from '../../helper/http';
import allow from '../../helper/user-permission';
import { PermissionsScope } from '../../models';
import settings from '../../settings/appSettings';

const vatRouter = Router();
const scope: PermissionsScope = 'settings';
const allowPath = allow(scope);

vatRouter.get('/', allowPath, async (_: RequestExtend, res: Response) => {
  return findSingleSettings({ name: settings.VAT.name })
    .then((vatValue) => {
      if (!vatValue) {
        return NotFound(res);
      }
      return SuccessfulResponse(res, vatValue);
    })
    .catch((err) => ServerError(res, err));
});

vatRouter.post('/', allowPath, async (req: RequestExtend, res: Response) => {
  const { value } = req.body;
  return findSingleSettings({ name: settings.VAT.name })
    .then((vatValue) => {
      if (!vatValue) {
        throw new Error('Not found');
      }
      return updateSetting(vatValue._id, { name: 'VAT', value });
    })
    .catch(() => NotFound(res))
    .then((updatedValue) => {
      if (updatedValue) {
        return SuccessfulResponse(res, updatedValue);
      }
      return Promise.reject({ errors: 'Entry could not be updated' });
    })
    .catch(({ errors }) => ServerError(res, errors));
});

export default vatRouter;
