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
exports.CategorySchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var OptionSchema = new mongoose_1.Schema({
    value: { type: String, required: false },
    title: { type: String, required: false },
});
var SessionSchema = new mongoose_1.Schema({
    count: { type: OptionSchema, required: false },
    length: { type: OptionSchema, required: false },
});
var CourseDefaultsSchema = new mongoose_1.Schema({
    preliminaryKnowledge: { type: OptionSchema, required: false },
    goals: { type: OptionSchema, required: false },
    promotion: { type: OptionSchema, required: false },
    marketing: { type: String, required: false, default: '' },
    session: { type: SessionSchema, required: false },
    minStudents: { type: Number, required: false, default: 0 },
    maxStudents: { type: Number, required: false, default: 0 },
    price: { type: Number, required: false, default: 0 },
    studentPrice: { type: Number, required: false, default: 0 },
});
exports.CategorySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    active: { type: Boolean, required: false, default: true },
    courseDefaults: { type: CourseDefaultsSchema, required: false },
});
exports.default = mongoose_1.default.model('categories', exports.CategorySchema);
