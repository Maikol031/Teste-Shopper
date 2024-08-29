import { MeasureRepository } from "../../repositories/MeasureRepository";
import { MongooseMeasureRepository } from "../../repositories/MongooseMeasureRepository";
import { CreateMeasureRequestDto, CreateMeasureResponseDto } from "./CreateMeasureDtos";
import { runGemAI } from "../../AI/geminiIa";
import fs from 'fs';
import path from "path";
import { promisify } from 'util';
import { Customer } from "../../entities/Customer";
import { Measure, MeasureProps } from "../../entities/Measure";
import { AppError } from "../../entities/AppErro";
const writeFile = promisify(fs.writeFile);

export class CreateMeasureUseCase {

    private measureRepository: MeasureRepository;

    constructor(measureRepository: MeasureRepository) {
        this.measureRepository = measureRepository
    }

    async execute(createMeasureDto: CreateMeasureRequestDto): Promise<CreateMeasureResponseDto> {
        const { image, customer_code, measure_datetime, measure_type } = createMeasureDto;
        const imageName = new Date().getTime();
        const textPromp_1 = "retorne a leitura atual, sem strings, apenas o número";
        const textPromp_2 = "retorne apenas o numero da conta, sem strings adicionais";
    
        const mimeTypeMatch = image.match(/^data:(.+);base64,/);
        let mimeType: string | undefined;
    
        if (mimeTypeMatch) {
            mimeType = mimeTypeMatch[1];
        } else {
            throw new AppError("Failed to extract MIME type from the image data", "", 400);
        }
    
        const encodedImage = image.replace(/^data:.+;base64,/, '');
        const decodedImage = Buffer.from(encodedImage, 'base64');
        const filename = path.join(__dirname, '../../', 'uploads', `${imageName}.png`);
    
        await writeFile(filename, decodedImage);
        const readMeasure = await runGemAI(String(mimeType), String(filename), String(measure_type), String(textPromp_1));
        const readIdMeasure = await runGemAI(String(mimeType), String(filename), String(measure_type), String(textPromp_2));
    
        const customer = new Customer(customer_code);
        const mongooseMeasureRepository = new MongooseMeasureRepository();
    
        const measureProps: MeasureProps = {
            value: Number(readMeasure),
            customer: customer,
            imageUrl: filename,
            type: measure_type,
            hasConfirmed: false,
            createdAt: new Date(measure_datetime),
            measureIdentification: readIdMeasure
        };
    
        let measure: Measure;
        try {
            measure = new Measure(measureProps);
        } catch (error) {
            if (error instanceof Error) {
                throw new AppError(error.message, "", 400);
            } else {
                throw new AppError("Internal server error", "", 500);
            }
        }
        try {
            const checkExistsMeasure = await mongooseMeasureRepository.findById(measure.measureIdentification);
    
            if (checkExistsMeasure) {
                throw new AppError("Leitura do mês já realizada", "DOUBLE_REPORT", 409);
            }
    
            await mongooseMeasureRepository.save(measure);
    
            const responseDto: CreateMeasureResponseDto = {
                image_url: filename,
                measure_value: measure.value,
                measure_uuid: measure.id
            };
    
            return responseDto;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError("Internal server error", "", 500);
            }
        }
    }
    
}