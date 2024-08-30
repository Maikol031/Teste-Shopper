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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseMeasureRepository = void 0;
const AppErro_1 = require("../entities/AppErro");
const Measure_1 = require("../entities/Measure");
const MeasureModel_1 = __importDefault(require("./models/MeasureModel"));
class MongooseMeasureRepository {
    save(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            const { imageUrl: image_url, createdAt: created_at, hasConfirmed: has_confirmed, id, type, value, customer } = measure;
            yield MeasureModel_1.default.create({
                customer_code: customer.id,
                image_url,
                created_at,
                has_confirmed,
                id,
                type,
                value,
            });
            return new Measure_1.Measure(measure, measure.id);
        });
    }
    ;
    confirm(measure_uuid, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const measure = yield MeasureModel_1.default.findOne({
                id: measure_uuid
            }).exec();
            if (!measure) {
                throw new AppErro_1.AppError("Leitura não encontrada", 404, "MEASURE_NOT_FOUND");
            }
            ;
            if (measure.has_confirmed) {
                throw new AppErro_1.AppError("Leitura do mês já realizada", 409, "CONFIRMATION_DUPLICATE");
            }
            else {
                yield MeasureModel_1.default.updateOne({ id: measure_uuid }, { $set: { has_confirmed: true, value: value } });
                return true;
            }
            ;
        });
    }
    ;
    list(customer_code, measure_type) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter;
            if (measure_type) {
                filter = {
                    customer_code: customer_code,
                    type: measure_type
                };
            }
            else {
                filter = {
                    customer_code: customer_code,
                };
            }
            ;
            const measure = yield MeasureModel_1.default.find(filter);
            if (!measure.length) {
                throw new AppErro_1.AppError("Nenhuma leitura encontrada", 404, "MEASURES_NOT_FOUND");
            }
            ;
            return measure;
        });
    }
    findByMeasure(type, currentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const convertCurrentDate = new Date(currentDate);
            const firstDayOfMonth = new Date(convertCurrentDate.getFullYear(), convertCurrentDate.getMonth(), 1);
            const firstDayOfNextMonth = new Date(convertCurrentDate.getFullYear(), convertCurrentDate.getMonth() + 1, 1);
            try {
                const measure = yield MeasureModel_1.default.findOne({
                    type: type,
                    created_at: {
                        $gte: firstDayOfMonth,
                        $lt: firstDayOfNextMonth
                    }
                }).exec();
                if (measure) {
                    return true;
                }
                else {
                    return false;
                }
                ;
            }
            catch (error) {
                throw new Error("Error checking measure existence");
            }
            ;
        });
    }
    ;
}
exports.MongooseMeasureRepository = MongooseMeasureRepository;
;
