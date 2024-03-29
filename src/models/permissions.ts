export type PermissionOptions = 'read' | 'update' | 'delete' | 'create';
export type PermissionsScope =
  | 'user'
  | 'permissions'
  | 'buildings'
  | 'classes'
  | 'categories'
  | 'payDuplicator'
  | 'lecturer'
  | 'files'
  | 'settings'
  | 'semesters'
  | 'courses'
  | 'coupons'
  | 'students';
export type PermissionTable = Record<PermissionOptions, boolean>;
export type PermissionList = Record<PermissionsScope, PermissionTable>;
export interface Role {
  _id: string;
  name: string;
  permissions: PermissionList;
}
