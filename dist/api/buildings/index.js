"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_permission_1 = __importDefault(require("../../helper/user-permission"));
var mongoose_1 = require("mongoose");
var http_1 = require("../../helper/http");
var controller_1 = require("../../db/v1/buildings/controller");
var buildingsRouter = express_1.Router();
var scope = 'buildings';
buildingsRouter.get('/', user_permission_1.default(scope), function (req, res) {
    if (!mongoose_1.isValidObjectId(req.params.id)) {
        return http_1.BadRequest(res);
    }
    return controller_1.GetAllBuildings()
        .then(function (data) {
        return http_1.SuccessfulResponse(res, data);
    })
        .catch(function (err) {
        console.error(err.errors);
        return http_1.ServerError(res);
    });
});
buildingsRouter.get('/:id', user_permission_1.default(scope), function (req, res) {
    var id = req.params.id;
    if (!mongoose_1.isValidObjectId(id)) {
        return http_1.BadRequest(res);
    }
    return controller_1.GetBuildingById(id)
        .then(function (data) {
        return http_1.SuccessfulResponse(res, data);
    })
        .catch(function (_a) {
        var errors = _a.errors;
        console.error(errors);
        return http_1.ServerError(res, errors);
    });
});
buildingsRouter.post('/', user_permission_1.default(scope), function (req, res) {
    return controller_1.CreateBuildingRecord(req.body)
        .then(function (data) {
        return http_1.SuccessfulResponse(res, data);
    })
        .catch(function (_a) {
        var errors = _a.errors;
        console.error(errors);
        return http_1.ServerError(res, errors);
    });
});
buildingsRouter.put('/:id', user_permission_1.default(scope), function (req, res) {
    var id = req.params.id;
    if (!mongoose_1.isValidObjectId(id)) {
        return http_1.BadRequest(res);
    }
    return controller_1.FindAndUpdate(id, req.body)
        .then(function (data) {
        return http_1.SuccessfulResponse(res, data);
    })
        .catch(function (_a) {
        var errors = _a.errors;
        console.error(errors);
        return http_1.ServerError(res, errors);
    });
});
buildingsRouter.delete('/:id', user_permission_1.default(scope), function (req, res) {
    var id = req.params.id;
    if (!mongoose_1.isValidObjectId(id)) {
        return http_1.BadRequest(res);
    }
    return controller_1.DeleteBuildingRecord(id)
        .then(function (deleted) {
        return http_1.SuccessfulResponse(res, { deleted: deleted });
    })
        .catch(function (_a) {
        var errors = _a.errors;
        console.error(errors);
        return http_1.ServerError(res, errors);
    });
});
exports.default = buildingsRouter;
