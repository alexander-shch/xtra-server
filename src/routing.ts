import { Router } from 'express';
import { authenticateToken } from './auth';

import userRouter from './api/user';
import permissionsRouter from './api/permissions';
import buildingsRouter from './api/buildings';
import classesRouter from './api/classes';
import categoriesRouter from './api/categories';
import payDuplicatorRouter from './api/pay-duplicator';
import filesRouter from './api/files';
import lecturerRouter from './api/lecturers';
import settingsRouter from './api/settings';

const appRouter = Router();

appRouter.use(authenticateToken);
appRouter.use('/user', userRouter);
appRouter.use('/permissions', permissionsRouter);
appRouter.use('/buildings', buildingsRouter);
appRouter.use('/classes', classesRouter);
appRouter.use('/categories', categoriesRouter);
appRouter.use('/pay-duplicator', payDuplicatorRouter);
appRouter.use('/lecturer', lecturerRouter);
appRouter.use('/files', filesRouter);
appRouter.use('/settings', settingsRouter);

export default appRouter;
