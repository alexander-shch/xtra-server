"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = exports.PermissionsSchema = exports.PermissionSchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
exports.PermissionSchema = new mongoose_1.Schema({
    read: Boolean,
    update: Boolean,
    delete: Boolean,
    create: Boolean,
}, {
    _id: false,
});
exports.PermissionsSchema = new mongoose_1.Schema({
    user: { type: exports.PermissionSchema, required: true },
    permissions: { type: exports.PermissionSchema, required: true },
    buildings: { type: exports.PermissionSchema, required: true },
    classes: { type: exports.PermissionSchema, required: true },
    categories: { type: exports.PermissionSchema, required: true },
    payDuplicator: { type: exports.PermissionSchema, required: true },
    lecturer: { type: exports.PermissionSchema, required: true },
}, {
    _id: false,
});
exports.RoleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    permissions: { type: exports.PermissionsSchema, required: true },
});
exports.default = mongoose_1.default.model('Roles', exports.RoleSchema);
