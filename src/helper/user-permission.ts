import { Response, NextFunction } from 'express';
import { RequestExtend } from '../auth';
import { PermissionOptions, PermissionsScope, User } from '../models';

function hasPermission(
  user: User,
  scope: PermissionsScope,
  permission: PermissionOptions
): boolean {
  return (
    user?.role.permissions &&
    user?.role.permissions[scope] &&
    user?.role.permissions[scope][permission]
  );
}

function methodMapper(method: string): PermissionOptions | undefined {
  switch (method.toLowerCase()) {
    case 'get':
      return 'read';
    case 'post':
      return 'create';
    case 'delete':
      return 'delete';
    case 'put':
      return 'update';
    default:
      return undefined;
  }
}

export function loggedIn(
  req: RequestExtend,
  res: Response,
  next: NextFunction
) {
  const { user } = req;
  if (!user) {
    return res.status(401).json({
      message: `Action is not allowed`,
    });
  }
  return next();
}

export default function allow(scope: PermissionsScope) {
  return (req: RequestExtend, res: Response, next: NextFunction) => {
    const method = req.method;
    const { user } = req;
    if (!user) {
      return res.status(401).json({
        message: `Action is not allowed`,
      });
    }
    const permissionAction = methodMapper(method);
    if (permissionAction === undefined) {
      return res.sendStatus(405);
    }
    if (hasPermission(user, scope, permissionAction) === false) {
      return res.status(403).json({
        message: `Action ${permissionAction} on ${scope} is not allowed`,
      });
    }
    return next();
  };
}
