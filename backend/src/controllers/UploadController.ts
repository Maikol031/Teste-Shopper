import { Request, Response } from "express";
import { CreateMeasureUseCase } from "../usecases/CreateMeasure/CreateMeasureUseCase";
import { MongooseMeasureRepository } from "../repositories/MongooseMeasureRepository";
import { AppError } from "../entities/AppErro";
import { ConfirmMeasureUseCase } from "../usecases/ConfirmMeasure/ConfirmMeasureUseCase";
import { ListMeasureUseCase } from "../usecases/ListMeasure/ListMeasureUseCase";
import { GeminiGenerativeAI } from "../AI/GeminiGenerativeAI";

const measureRepository = new MongooseMeasureRepository();
const generativeAI = new GeminiGenerativeAI();
const createMeasureUseCase = new CreateMeasureUseCase(measureRepository, generativeAI);
const confirmeMeasureUseCase = new ConfirmMeasureUseCase(measureRepository);
const listMeasureUseCase = new ListMeasureUseCase(measureRepository);

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
            };
        };
    };

    async confirm(req: Request, res: Response) {
        try {
            const reqValues = req.body
            const result = await confirmeMeasureUseCase.execute({
                ...reqValues
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
            };
        };
    };

    async list(req: Request, res: Response) {
        try {
            const { customer_code } = req.params;
            const measure_type = req.query.measure_type as string | undefined;

            const result = await listMeasureUseCase.execute({ 
                customer_code: customer_code || '', 
                measure_type: measure_type 
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
            };
        };
    };
};