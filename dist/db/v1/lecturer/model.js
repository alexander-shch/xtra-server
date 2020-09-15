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
exports.ILecturerSchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var validators_1 = require("../../validators");
var schema_1 = require("../../schema");
exports.ILecturerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    idNumber: { type: Number, required: true },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: validators_1.Validators.email,
        },
    },
    phone: { type: Number, required: true },
    address: { type: schema_1.AddressSchema, required: false },
    hourlyRate: { type: Number, required: true },
    duplicator: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    active: { type: Boolean, required: false, default: true },
    details: { type: String, required: false },
    avatar: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    description: { type: String, required: false },
    experience: { type: String, required: false },
    teaching: { type: String, required: false },
    notes: { type: String, required: false },
    files: { type: [mongoose_1.Schema.Types.ObjectId], required: false },
    internalNotes: { type: [mongoose_1.Schema.Types.ObjectId], required: false },
});
exports.default = mongoose_1.default.model('lecturer', exports.ILecturerSchema);
