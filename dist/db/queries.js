"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
function ByIds(data) {
    return {
        _id: {
            $in: data.map(function (dataLine) { return mongoose_1.Types.ObjectId(dataLine); }),
        },
    };
}
function ById(id) {
    var _id = mongoose_1.Types.ObjectId(id);
    return { _id: _id };
}
var Queries = {
    ById: ById,
    ByIds: ByIds,
};
exports.default = Queries;
