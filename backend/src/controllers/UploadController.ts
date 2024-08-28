import { Request, Response } from "express";
import { CreateMeasureUseCase } from "../usecases/CreateMeasure/CreateMeasureUseCase";
import { MongooseMeasureRepository } from "../repositories/MongooseMeasureRepository";

const measureRepository = new MongooseMeasureRepository();
const createMeasureUseCase = new CreateMeasureUseCase(measureRepository);

export class UploadController {

    async create(req: Request, res: Response) {
        
        const response = await createMeasureUseCase.execute({
            image: req.body.image,
            customer_code: req.body.customer_code,
            measure_datetime: req.body.datatime,
            measure_type: req.body.measure_type,
        });
        console.log(response)
        return res.status(201).json(response);
    }

}