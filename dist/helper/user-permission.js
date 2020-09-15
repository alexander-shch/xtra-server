"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedIn = void 0;
function hasPermission(user, scope, permission) {
    return ((user === null || user === void 0 ? void 0 : user.role.permissions) && (user === null || user === void 0 ? void 0 : user.role.permissions[scope]) && (user === null || user === void 0 ? void 0 : user.role.permissions[scope][permission]));
}
function methodMapper(method) {
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
function loggedIn(req, res, next) {
    var user = req.user;
    if (!user) {
        return res.status(401).json({
            message: "Action is not allowed",
        });
    }
    return next();
}
exports.loggedIn = loggedIn;
function allow(scope) {
    return function (req, res, next) {
        var method = req.method;
        var user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "Action is not allowed",
            });
        }
        var permissionAction = methodMapper(method);
        if (!permissionAction) {
            return res.sendStatus(405);
        }
        var allowed = hasPermission(user, scope, permissionAction);
        if (!allowed) {
            return res.status(403).json({
                message: "Action " + permissionAction + " on " + scope + " is not allowed",
            });
        }
        return next();
    };
}
exports.default = allow;
