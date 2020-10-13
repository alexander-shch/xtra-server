import { populateAdmin } from './controllers/admin';
import { populateAppSettings } from './controllers/appSettings';

export default async function populate() {
  await populateAdmin().catch((error) => console.error(error));
  await populateAppSettings().catch((error) => console.error(error));
}
