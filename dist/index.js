"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./auth"));
var routing_1 = __importDefault(require("./routing"));
var v1_1 = __importDefault(require("./db/v1"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cors = require('cors');
var app = express_1.default();
// Simple check if body contains well defined content
app.use(function (req, res, next) {
    return express_1.default.json()(req, res, function (err) { return (err ? res.sendStatus(400) : next()); });
});
app.use(cors());
app.use(express_fileupload_1.default({
    createParentPath: true,
}));
app.use(auth_1.default);
app.use(routing_1.default);
app.all('*', function (_, res) {
    res.status(404).json({
        message: 'Nothing here',
    });
});
app.listen(process.env.PORT, function () {
    console.log("Running at localhost:" + process.env.PORT);
});
v1_1.default();
