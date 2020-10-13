import { populateAdmin } from './controllers/admin';


export default async function populate() {
  await populateAdmin();
}
