"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPermissionsSuperUser = exports.DefaultPermissions = void 0;
var helper_1 = require("./helper");
exports.DefaultPermissions = helper_1.createPermissionsList(false);
exports.DefaultPermissionsSuperUser = helper_1.createPermissionsList(true);
