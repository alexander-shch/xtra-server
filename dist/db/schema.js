"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
var mongoose_1 = require("mongoose");
exports.AddressSchema = new mongoose_1.Schema({
    address: { type: String, required: false },
    zip: { type: String, required: false },
    city: { type: String, required: false },
    region: { type: String, required: false },
    country: { type: String, required: false },
    houseNumber: { type: Number, required: false },
    entry: { type: String, required: false },
    floor: { type: Number, required: false },
    flatNumber: { type: Number, required: false },
});
