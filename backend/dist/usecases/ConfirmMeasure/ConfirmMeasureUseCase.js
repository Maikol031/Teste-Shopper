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
exports.ConfirmMeasureUseCase = void 0;
const uuid_1 = require("uuid");
const AppErro_1 = require("../../entities/AppErro");
const MongooseMeasureRepository_1 = require("../../repositories/MongooseMeasureRepository");
class ConfirmMeasureUseCase {
    constructor(measureRepository) {
        this.measureRepository = measureRepository;
        this.mongooseMeasureRepository = new MongooseMeasureRepository_1.MongooseMeasureRepository();
    }
    ;
    validDto(measure_uuid, confirmed_value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof confirmed_value !== 'number' || isNaN(confirmed_value)) {
                throw new AppErro_1.AppError("Valor da leitura inválido", 400, "INVALID_DATA");
            }
            ;
            if (!(0, uuid_1.validate)(measure_uuid)) {
                throw new AppErro_1.AppError("UUID inválido", 400, "INVALID_DATA");
            }
            ;
        });
    }
    ;
    execute(confirmMeasureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { measure_uuid, confirmed_value } = confirmMeasureDto;
            yield this.validDto(measure_uuid, confirmed_value);
            const confirmValue = yield this.mongooseMeasureRepository.confirm(measure_uuid, confirmed_value);
            return { sucess: confirmValue };
        });
    }
    ;
}
exports.ConfirmMeasureUseCase = ConfirmMeasureUseCase;
;
