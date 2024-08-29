import { Request, Response } from "express";
import { CreateMeasureUseCase } from "../usecases/CreateMeasure/CreateMeasureUseCase";
import { MongooseMeasureRepository } from "../repositories/MongooseMeasureRepository";
import { AppError } from "../entities/AppErro";

const measureRepository = new MongooseMeasureRepository();
const createMeasureUseCase = new CreateMeasureUseCase(measureRepository);

export class UploadController {

    async create(req: Request, res: Response) {
        try {
            
            const result = await createMeasureUseCase.execute({
                image: req.body.image,
                customer_code: req.body.customer_code,
                measure_datetime: req.body.measure_datetime,
                measure_type: req.body.measure_type,
            });
         
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ 
                    error_code: error.errorCode || "",
                    error_description: error.message
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

}