"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.NotFound = exports.BadRequest = exports.SuccessfulResponse = void 0;
function SuccessfulResponse(res, data) {
    return res.status(200).json(data);
}
exports.SuccessfulResponse = SuccessfulResponse;
function BadRequest(res, message) {
    if (message === void 0) { message = ''; }
    return res.status(400).json({
        error: message || "Your request can't be processed, please check the request data"
    });
}
exports.BadRequest = BadRequest;
function NotFound(res, message) {
    if (message === void 0) { message = ''; }
    return res.status(404).json({
        error: message || "Not found"
    });
}
exports.NotFound = NotFound;
function ServerError(res, message) {
    if (message === void 0) { message = ''; }
    return res.status(500).json({
        error: message || "Some server error occurred"
    });
}
exports.ServerError = ServerError;
