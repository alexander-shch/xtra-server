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
var express_1 = require("express");
var user_permission_1 = __importDefault(require("../../helper/user-permission"));
var mongoose_1 = require("mongoose");
var http_1 = require("../../helper/http");
var controller_1 = require("../../db/v1/classes/controller");
var controller_2 = require("../../db/v1/classes/availability/controller");
var classesRouter = express_1.Router();
var scope = 'classes';
// Get all class rooms
classesRouter.get('/', user_permission_1.default(scope), function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, controller_1.GetAllClassRooms()
                .then(function (data) {
                return http_1.SuccessfulResponse(res, data);
            })
                .catch(function (error) { return http_1.ServerError(res, error); })];
    });
}); });
// Get single class rooms
classesRouter.get('/:classId', user_permission_1.default(scope), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var classId;
    return __generator(this, function (_a) {
        classId = req.params.classId;
        if (!mongoose_1.isValidObjectId(classId)) {
            return [2 /*return*/, http_1.BadRequest(res)];
        }
        return [2 /*return*/, controller_1.GetSingleClassRoom({ _id: classId })
                .then(function (data) {
                if (!data) {
                    return http_1.NotFound(res);
                }
                return http_1.SuccessfulResponse(res, data);
            })
                .catch(function (error) { return http_1.ServerError(res, error); })];
    });
}); });
// Create a class rooms
classesRouter.post('/', user_permission_1.default(scope), function (req, res) {
    var classId = req.params.classId;
    if (!mongoose_1.isValidObjectId(classId)) {
        return http_1.BadRequest(res);
    }
    return controller_1.CreateClass(req.body)
        .then(function (_a) {
        var _id = _a._id;
        return controller_1.GetSingleClassRoom({ _id: _id });
    })
        .then(function (classRoom) {
        if (!classRoom) {
            return http_1.ServerError(res, 'Trying to retrieve class room after creation failed');
        }
        return http_1.SuccessfulResponse(res, classRoom);
    })
        .catch(function (_a) {
        var errors = _a.errors;
        return http_1.ServerError(res, errors);
    });
});
// Delete a class rooms
classesRouter.delete('/:classId', user_permission_1.default(scope), function (req, res) {
    var classId = req.params.classId;
    if (!mongoose_1.isValidObjectId(classId)) {
        return http_1.BadRequest(res);
    }
    return controller_1.DeleteClass(classId)
        .then(function (deleted) {
        http_1.SuccessfulResponse(res, { deleted: deleted });
    })
        .catch(function (_a) {
        var error = _a.error;
        return http_1.ServerError(res, error);
    });
});
// Update a class rooms
classesRouter.put('/:classId', user_permission_1.default(scope), function (req, res) {
    var classId = req.params.classId;
    if (!mongoose_1.isValidObjectId(classId)) {
        return http_1.BadRequest(res);
    }
    return controller_1.UpdateClass(classId, req.body)
        .then(function (updatedData) {
        if (!updatedData) {
            return http_1.ServerError(res, "No class was found with the id " + classId + " or failed to update");
        }
        return http_1.SuccessfulResponse(res, updatedData);
    })
        .catch(function (_a) {
        var error = _a.error;
        return http_1.ServerError(res, error);
    });
});
// Create availability for a class rooms
classesRouter.post('/:classId/availability', user_permission_1.default(scope), function (req, res) {
    var classId = req.params.classId;
    if (!mongoose_1.isValidObjectId(classId)) {
        return http_1.BadRequest(res);
    }
    return controller_2.Create(classId, req.body)
        .then(function (d) {
        http_1.SuccessfulResponse(res, d);
    })
        .catch(function (_a) {
        var errors = _a.errors;
        return http_1.ServerError(res, errors);
    });
});
// Get availability for a class rooms
classesRouter.get('/:classId/availability', user_permission_1.default(scope), function (req, res) {
    var classId = req.params.classId;
    if (!mongoose_1.isValidObjectId(classId)) {
        return http_1.BadRequest(res);
    }
    return controller_2.GetAllClassAvailability(classId)
        .then(function (d) {
        http_1.SuccessfulResponse(res, d);
    })
        .catch(function (_a) {
        var errors = _a.errors;
        return http_1.ServerError(res, errors);
    });
});
// Get a specific availability for a class rooms
classesRouter.get('/availability/:availabilityId', user_permission_1.default(scope), function (req, res) {
    var availabilityId = req.params.availabilityId;
    if (!mongoose_1.isValidObjectId(availabilityId)) {
        return http_1.BadRequest(res);
    }
    return controller_2.FindOneClassAvailability(availabilityId)
        .then(function (data) {
        if (!data) {
            return http_1.NotFound(res, "No availability was found with the id " + availabilityId + " or failed to update");
        }
        return http_1.SuccessfulResponse(res, data);
    })
        .catch(function (_a) {
        var errors = _a.errors;
        return http_1.ServerError(res, errors);
    });
});
// Update a specific availability for a class rooms
classesRouter.put('/availability/:availabilityId', user_permission_1.default(scope), function (req, res) {
    var availabilityId = req.params.availabilityId;
    if (!mongoose_1.isValidObjectId(availabilityId)) {
        return http_1.BadRequest(res);
    }
    return controller_2.UpdateAvailability(availabilityId, req.body)
        .then(function (data) {
        if (!data) {
            return http_1.NotFound(res, "No availability was found with the id " + availabilityId + " or failed to update");
        }
        return http_1.SuccessfulResponse(res, data);
    })
        .catch(function (_a) {
        var errors = _a.errors;
        return http_1.ServerError(res, errors);
    });
});
// Update a specific availability for a class rooms
classesRouter.delete('/availability/:availabilityId', user_permission_1.default(scope), function (req, res) {
    var availabilityId = req.params.availabilityId;
    if (!mongoose_1.isValidObjectId(availabilityId)) {
        return http_1.BadRequest(res);
    }
    return controller_2.DeleteAvailability(availabilityId)
        .then(function (deleted) {
        return http_1.SuccessfulResponse(res, { deleted: deleted });
    })
        .catch(function (_a) {
        var errors = _a.errors;
        return http_1.ServerError(res, errors);
    });
});
exports.default = classesRouter;
