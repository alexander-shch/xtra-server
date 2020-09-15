"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPermissionsList = exports.createPermissionTableWithStatus = void 0;
function createPermissionTableWithStatus(allow) {
    return {
        read: allow,
        create: allow,
        delete: allow,
        update: allow,
    };
}
exports.createPermissionTableWithStatus = createPermissionTableWithStatus;
function createPermissionsList(allow) {
    return {
        buildings: createPermissionTableWithStatus(allow),
        classes: createPermissionTableWithStatus(allow),
        categories: createPermissionTableWithStatus(allow),
        lecturer: createPermissionTableWithStatus(allow),
        permissions: createPermissionTableWithStatus(allow),
        payDuplicator: createPermissionTableWithStatus(allow),
        user: createPermissionTableWithStatus(allow),
    };
}
exports.createPermissionsList = createPermissionsList;
