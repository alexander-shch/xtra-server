"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var lodash_1 = require("lodash");
var controller_1 = require("./permissions/controller");
var permissions_1 = require("../../settings/permissions");
var controller_2 = require("./user/controller");
exports.default = (function () {
    var connect = function () {
        mongoose_1.default
            .connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/" + process.env.DB_NAME, {
            dbName: process.env.DB_NAME,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        })
            .then(function () {
            populate();
            return console.info("Successfully connected to " + process.env.DB_NAME);
        })
            .catch(function (error) {
            console.error('Error connecting to database: ', error);
            return process.exit(1);
        });
    };
    // Exec connection
    connect();
    // In case of disconnection reconnect
    mongoose_1.default.connection.on('disconnected', connect);
});
function createAdminUser(role) {
    return controller_2.FindUser({ name: 'admin' }).then(function (user) {
        if (!user) {
            return controller_2.CreateUser({
                name: 'admin',
                lastName: 'admin',
                role: role._id,
                email: 'admin@gmail.com',
                password: 'o87y3hu4g',
            });
        }
        return Promise.reject('User admin was already populated');
    });
}
function populate() {
    return __awaiter(this, void 0, void 0, function () {
        var role, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, controller_1.FindRole({ name: 'admin' })];
                case 1:
                    role = _a.sent();
                    if (!!role) return [3 /*break*/, 3];
                    return [4 /*yield*/, controller_1.CreateRole({
                            name: 'admin',
                            permissions: permissions_1.DefaultPermissionsSuperUser,
                        })];
                case 2:
                    role = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!!lodash_1.isEqual(role.permissions, permissions_1.DefaultPermissionsSuperUser)) return [3 /*break*/, 5];
                    console.log("Role " + role._id + " update with new permissions");
                    return [4 /*yield*/, controller_1.RoleUpdateOne(role._id, {
                            permissions: permissions_1.DefaultPermissionsSuperUser,
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, createAdminUser(role)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
