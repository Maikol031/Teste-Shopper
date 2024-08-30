import { MeasureRepository } from "../../repositories/MeasureRepository";
import { CreateMeasureRequestDto, CreateMeasureResponseDto } from "./CreateMeasureDtos";
import fs from 'fs';
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

        if (mimeType && !validImageTypes.includes(mimeType)) {
            throw new AppError("Tipo da imagem não é válido", 400, "INVALID_DATA");
        }

        return mimeType;
    }

    private async validateRequestDto(createMeasureDto: any) {
        const { customer, measure_datetime, measure_type } = createMeasureDto;
        const measure_date = new Date(measure_datetime);
        const validTypes = ['WATER', 'GAS'];

        if (!customer || !(customer instanceof Customer)) {
            throw new AppError("Customer inválido", 400, "INVALID_DATA");
        };

        if (!(measure_date instanceof Date) || isNaN(measure_date.getTime())) {
            throw new AppError("Data da criação inválida", 400, "INVALID_DATA");
        };

        if (!validTypes.includes(measure_type)) {
            throw new AppError("Tipo da conta inválido", 400, "INVALID_DATA");
        };
    }


    async execute(createMeasureDto: CreateMeasureRequestDto): Promise<CreateMeasureResponseDto> {
        const { image, customer_code, measure_datetime, measure_type } = createMeasureDto;

        const mimeTypeMatch = await this.verifyIsBase64(image);
        const customer = new Customer(customer_code);

        await this.validateRequestDto({ customer, measure_datetime, measure_type });

        if (!mimeTypeMatch) {
            throw new AppError("mime-type inválido ou não informado!", 400, "INVALID_DATA");
        };

        const encodedImage = image.replace(/^data:.+;base64,/, '');
        const decodedImage = Buffer.from(encodedImage, 'base64');
        const uploadsFolderPath = path.join(__dirname, '../../', 'uploads');
        const imageName = `${new Date().getTime()}.${mimeTypeMatch.replace('image/', '')}`
        const filename = path.join(uploadsFolderPath, imageName);

        const checkExistsMeasure = await this.measureRepository.findByMeasure(measure_type, measure_datetime);

        if (checkExistsMeasure) {
            throw new AppError("Leitura do mês já realizada", 409, "DOUBLE_REPORT");
        };

        fs.writeFileSync(filename, decodedImage);

        const readMeasure = await this.generativeAI.run(mimeTypeMatch, filename, measure_type);


        const measureProps: MeasureProps = {
            value: Number(readMeasure),
            customer: customer,
            type: measure_type,
            hasConfirmed: false,
            imageUrl: `/files/${imageName}`,
            createdAt: new Date(measure_datetime)
        };
        const measure = new Measure(measureProps);
        await this.measureRepository.save(measure);

        return {
            image_url: measure.imageUrl,
            measure_value: measure.value,
            measure_uuid: measure.id
        };
    };
};
