import { PermissionTable, PermissionList } from '../models';

export function createPermissionTableWithStatus(
  allow: boolean
): PermissionTable {
  return {
    read: allow,
    create: allow,
    delete: allow,
    update: allow,
  };
}

export function createPermissionsList(allow: boolean): PermissionList {
  return {
    buildings: createPermissionTableWithStatus(allow),
    classes: createPermissionTableWithStatus(allow),
    categories: createPermissionTableWithStatus(allow),
    lecturer: createPermissionTableWithStatus(allow),
    permissions: createPermissionTableWithStatus(allow),
    payDuplicator: createPermissionTableWithStatus(allow),
    user: createPermissionTableWithStatus(allow),
    files: createPermissionTableWithStatus(allow),
    settings: createPermissionTableWithStatus(allow),
    semesters: createPermissionTableWithStatus(allow),
  };
}
