import { MeasureRepository } from "../../repositories/MeasureRepository";
import { MongooseMeasureRepository } from "../../repositories/MongooseMeasureRepository";
import { CreateMeasureRequestDto, CreateMeasureResponseDto } from "./CreateMeasureDtos";
import { run } from "../../AI/geminiIa";
import fs from 'fs';
import path from "path";
import { promisify } from 'util';
import { Measure, MeasureProps } from "../../entities/Measure";
const writeFile = promisify(fs.writeFile);

export class CreateMeasureUseCase {

    private measureRepository: MeasureRepository;

    constructor(measureRepository: MeasureRepository) {
        this.measureRepository = measureRepository
    }

    async execute(createMeasureDto: CreateMeasureRequestDto): Promise<CreateMeasureResponseDto> {
        const { image, customer_code, measure_datetime, measure_type } = createMeasureDto;
        const imageName = new Date().getTime();

        const mimeTypeMatch  = image.match(/^data:(.+);base64,/);
    
        let mimeType: string | undefined;
        if (mimeTypeMatch) {
            mimeType = mimeTypeMatch[1];
        } else {
            throw new Error("Failed to extract MIME type from the image data");
        }

        const encodedImage = image.replace(/^data:.+;base64,/, '');
        const decodedImage = Buffer.from(encodedImage, 'base64');
        const filename = path.join(__dirname, '../../', 'uploads', `${imageName}.png`);

        await writeFile(filename, decodedImage);
        await run(String(mimeType), String(filename), String(measure_type))

        const teste = new MongooseMeasureRepository()
        // const measureProps: MeasureProps = {
        //     customer: customer_code , 
        //     imageUrl: filename,           
        //     type: measure_type,        
        //     hasConfirmed: false,       
        //     createdAt: new Date(measure_datetime),
        //   };
          
        //   const measure = new Measure(measureProps);
        // teste.save(measure)
        return {
            image_url: 'string',
            measure_value: 1000,
            measure_uuid: 'abc123'
        }
    }

}