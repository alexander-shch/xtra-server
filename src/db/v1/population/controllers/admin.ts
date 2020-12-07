import { isEqual } from 'lodash';
import { DefaultPermissionsSuperUser } from '../../../../settings/permissions';
import {
  CreateRole,
  FindRole,
  RoleUpdateOne,
} from '../../models/permissions/controller';
import { IRole } from '../../models/permissions/model';
import { CreateUser, FindUser } from '../../models/user/controller';

function createAdminUser(role: IRole) {
  return FindUser({ name: 'admin' }).then((user) => {
    if (!user) {
      return CreateUser({
        name: 'admin',
        lastName: 'admin',
        role: role._id as string,
        email: 'admin@gmail.com',
        password: 'o87y3hu4g',
      });
    }
    return Promise.reject('User admin was already populated');
  });
}

export async function populateAdmin() {
  try {
    let role = await FindRole({ name: 'admin' });
    if (!role) {
      role = await CreateRole({
        name: 'admin',
        permissions: DefaultPermissionsSuperUser,
      });
    } else if (!isEqual(role.permissions, DefaultPermissionsSuperUser)) {
      console.log(`Role ${role._id} update with new permissions`);
      await RoleUpdateOne(role._id, {
        permissions: DefaultPermissionsSuperUser,
      });
    }
    await createAdminUser(role);
  } catch (e) {
    console.error(e);
  }
}
