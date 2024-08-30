"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MeasureSchema = new mongoose_1.default.Schema({
    customer_code: { type: String, required: true, ref: 'Customer' },
    id: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    image_url: { type: String, required: true },
    has_confirmed: { type: Boolean, default: false },
    created_at: { type: Date, required: true },
});
exports.default = mongoose_1.default.model('Measure', MeasureSchema);
