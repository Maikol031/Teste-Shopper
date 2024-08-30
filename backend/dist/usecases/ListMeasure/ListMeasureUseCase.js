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
exports.ListMeasureUseCase = void 0;
const AppErro_1 = require("../../entities/AppErro");
class ListMeasureUseCase {
    constructor(measureRepository) {
        this.measureRepository = measureRepository;
    }
    execute(listMeasureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customer_code, measure_type } = listMeasureDto;
            if (measure_type !== "WATER" && measure_type !== "GAS" && measure_type !== undefined) {
                throw new AppErro_1.AppError("Tipo de medição não permitida", 400, "INVALID_TYPE");
            }
            ;
            const results = yield this.measureRepository.list(customer_code, measure_type || '');
            return {
                customer_code,
                measures: results.map((result) => ({
                    measure_uuid: result.id,
                    measure_datetime: result.created_at.toISOString(),
                    measure_type: result.type,
                    has_confirmed: result.has_confirmed,
                    image_url: result.image_url
                }))
            };
        });
    }
    ;
}
exports.ListMeasureUseCase = ListMeasureUseCase;
;
