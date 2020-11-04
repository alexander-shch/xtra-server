import { Router } from 'express';
import vatRouter from './vat';

const settingsRouter = Router();

settingsRouter.use('/vat', vatRouter)

export default settingsRouter