"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UploadController_1 = require("../controllers/UploadController");
const router = express_1.default.Router();
const uploadController = new UploadController_1.UploadController();
router.post('/upload', uploadController.create);
router.patch('/upload', uploadController.confirm);
router.get('/upload/:customer_code', uploadController.list);
exports.default = router;
