import { populateAdmin } from './controllers/admin';
import { populateAppSettings } from './controllers/appSettings';

export default async function populate() {
  await populateAdmin();
  await populateAppSettings();
}
