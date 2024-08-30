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
exports.CreateMeasureUseCase = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const Customer_1 = require("../../entities/Customer");
const Measure_1 = require("../../entities/Measure");
const AppErro_1 = require("../../entities/AppErro");
class CreateMeasureUseCase {
    constructor(measureRepository, generativeAI) {
        this.measureRepository = measureRepository;
        this.generativeAI = generativeAI;
    }
    verifyIsBase64(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const mimeTypeMatch = image.match(/^data:(.+);base64,/);
            let mimeType;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
            if (!mimeTypeMatch) {
                throw new AppErro_1.AppError("Imagem inválida ou não informada", 400);
            }
            mimeType = mimeTypeMatch[1];
            if (mimeType && !validImageTypes.includes(mimeType)) {
                throw new AppErro_1.AppError("Tipo da imagem não é válido", 400, "INVALID_DATA");
            }
            return mimeType;
        });
    }
    execute(createMeasureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, customer_code, measure_datetime, measure_type } = createMeasureDto;
            const imageName = new Date().getTime();
            const mimeTypeMatch = yield this.verifyIsBase64(image);
            console.log('imageName: ', imageName);
            if (!mimeTypeMatch) {
                throw new AppErro_1.AppError("mime-type inválido ou não informado!", 400, "INVALID_DATA");
            }
            const encodedImage = image.replace(/^data:.+;base64,/, '');
            const decodedImage = Buffer.from(encodedImage, 'base64');
            const filename = path_1.default.join(__dirname, '../../', 'uploads', `${imageName}.png`);
            const checkExistsMeasure = yield this.measureRepository.findByMeasure(measure_type, measure_datetime);
            if (checkExistsMeasure) {
                throw new AppErro_1.AppError("Leitura do mês já realizada", 409, "DOUBLE_REPORT");
            }
            (0, fs_1.writeFileSync)(filename, decodedImage);
            const readMeasure = yield this.generativeAI.run(mimeTypeMatch, filename, measure_type);
            const customer = new Customer_1.Customer(customer_code);
            const measureProps = {
                value: Number(readMeasure),
                customer: customer,
                imageUrl: filename,
                type: measure_type,
                hasConfirmed: false,
                createdAt: new Date(measure_datetime)
            };
            const measure = new Measure_1.Measure(measureProps);
            yield this.measureRepository.save(measure);
            return {
                image_url: filename,
                measure_value: measure.value,
                measure_uuid: measure.id
            };
        });
    }
}
exports.CreateMeasureUseCase = CreateMeasureUseCase;
