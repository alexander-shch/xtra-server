import { Router } from 'express';
import { authenticateToken } from './auth';

import userRouter from './api/user';
import permissionsRouter from './api/permissions';
import buildingsRouter from './api/buildings';
import classesRouter from './api/classes';
import categoriesRouter from './api/categories';

const appRouter = Router();

appRouter.use(authenticateToken);
appRouter.use('/user', userRouter);
appRouter.use('/permissions', permissionsRouter);
appRouter.use('/buildings', buildingsRouter);
appRouter.use('/classes', classesRouter);
appRouter.use('/categories', categoriesRouter);

export default appRouter;
