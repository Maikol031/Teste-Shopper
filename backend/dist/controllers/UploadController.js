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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const CreateMeasureUseCase_1 = require("../usecases/CreateMeasure/CreateMeasureUseCase");
const MongooseMeasureRepository_1 = require("../repositories/MongooseMeasureRepository");
const AppErro_1 = require("../entities/AppErro");
const ConfirmMeasureUseCase_1 = require("../usecases/ConfirmMeasure/ConfirmMeasureUseCase");
const ListMeasureUseCase_1 = require("../usecases/ListMeasure/ListMeasureUseCase");
const GeminiGenerativeAI_1 = require("../AI/GeminiGenerativeAI");
const measureRepository = new MongooseMeasureRepository_1.MongooseMeasureRepository();
const generativeAI = new GeminiGenerativeAI_1.GeminiGenerativeAI();
const createMeasureUseCase = new CreateMeasureUseCase_1.CreateMeasureUseCase(measureRepository, generativeAI);
const confirmeMeasureUseCase = new ConfirmMeasureUseCase_1.ConfirmMeasureUseCase(measureRepository);
const listMeasureUseCase = new ListMeasureUseCase_1.ListMeasureUseCase(measureRepository);
class UploadController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield createMeasureUseCase.execute({
                    image: req.body.image,
                    customer_code: req.body.customer_code,
                    measure_datetime: req.body.measure_datetime,
                    measure_type: req.body.measure_type,
                });
                res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof AppErro_1.AppError) {
                    res.status(error.statusCode).json({
                        error_code: error.errorCode || "",
                        error_description: error.message
                    });
                }
                else {
                    res.status(500).json({ message: "Internal server error" });
                }
                ;
            }
            ;
        });
    }
    ;
    confirm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqValues = req.body;
                const result = yield confirmeMeasureUseCase.execute(Object.assign({}, reqValues));
                res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof AppErro_1.AppError) {
                    res.status(error.statusCode).json({
                        error_code: error.errorCode || "",
                        error_description: error.message
                    });
                }
                else {
                    res.status(500).json({ message: "Internal server error" });
                }
                ;
            }
            ;
        });
    }
    ;
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer_code } = req.params;
                const measure_type = req.query.measure_type;
                const result = yield listMeasureUseCase.execute({
                    customer_code: customer_code || '',
                    measure_type: measure_type
                });
                res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof AppErro_1.AppError) {
                    res.status(error.statusCode).json({
                        error_code: error.errorCode || "",
                        error_description: error.message
                    });
                }
                else {
                    res.status(500).json({ message: "Internal server error" });
                }
                ;
            }
            ;
        });
    }
    ;
}
exports.UploadController = UploadController;
;
