import { MeasureRepository } from "../../repositories/MeasureRepository";
import { CreateMeasureRequestDto, CreateMeasureResponseDto } from "./CreateMeasureDtos";
import { writeFileSync } from 'fs';
import path from "path";
import { Customer } from "../../entities/Customer";
import { Measure, MeasureProps } from "../../entities/Measure";
import { AppError } from "../../entities/AppErro";
import { GenerativeAI } from "../../AI/GenerativeAI";

export class CreateMeasureUseCase {

    private measureRepository: MeasureRepository;
    private generativeAI: GenerativeAI;

    constructor(measureRepository: MeasureRepository, generativeAI: GenerativeAI) {
        this.measureRepository = measureRepository;
        this.generativeAI = generativeAI;
    }

    private async verifyIsBase64(image: string) {
        const mimeTypeMatch = image.match(/^data:(.+);base64,/);
        
        let mimeType: string | undefined;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
        
        if (!mimeTypeMatch) {
            throw new AppError("Imagem inválida ou não informada", 400);
        }

        mimeType = mimeTypeMatch[1];

        if(mimeType && !validImageTypes.includes(mimeType)) {
            throw new AppError("Tipo da imagem não é válido", 400, "INVALID_DATA");
        }

        return mimeType;
    }

    async execute(createMeasureDto: CreateMeasureRequestDto): Promise<CreateMeasureResponseDto> {
        const { image, customer_code, measure_datetime, measure_type } = createMeasureDto;
        const imageName = new Date().getTime();

        const mimeTypeMatch = await this.verifyIsBase64(image);

        console.log('imageName: ', imageName);

        if(!mimeTypeMatch) {
            throw new AppError("mime-type inválido ou não informado!", 400, "INVALID_DATA");
        }
        
        const encodedImage = image.replace(/^data:.+;base64,/, '');
        const decodedImage = Buffer.from(encodedImage, 'base64');
        const filename = path.join(__dirname, '../../', 'uploads', `${imageName}.png`);
        
        const checkExistsMeasure = await this.measureRepository.findByMeasure(measure_type, measure_datetime);
        
        if (checkExistsMeasure) {
            throw new AppError("Leitura do mês já realizada", 409, "DOUBLE_REPORT");
        }
        
        writeFileSync(filename, decodedImage);

        const readMeasure = await this.generativeAI.run(mimeTypeMatch, filename, measure_type);
        
        const customer = new Customer(customer_code);
        const measureProps: MeasureProps = {
            value: Number(readMeasure),
            customer: customer,
            imageUrl: filename,
            type: measure_type,
            hasConfirmed: false,
            createdAt: new Date(measure_datetime)
        };
        
        const measure = new Measure(measureProps);
        await this.measureRepository.save(measure);

        return {
            image_url: filename,
            measure_value: measure.value,
            measure_uuid: measure.id
        };
    }
}
