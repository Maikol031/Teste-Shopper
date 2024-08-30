import { AppError } from "../entities/AppErro";
import { Measure, MeasureProps } from "../entities/Measure";
import { MeasureRepository } from "./MeasureRepository";
import MeasureModel from "./models/MeasureModel";
export class MongooseMeasureRepository implements MeasureRepository {

    async save(measure: Measure): Promise<Measure> {
        const { imageUrl: image_url, createdAt: created_at, hasConfirmed: has_confirmed, id, type, value, customer } = measure

        await MeasureModel.create({
            customer_code: customer.id,
            image_url,
            created_at,
            has_confirmed,
            id,
            type,
            value,
        });

        return new Measure(measure as MeasureProps, measure.id);
    };

    async confirm(measure_uuid: string, value: number): Promise<boolean> {
        const measure = await MeasureModel.findOne({
            id: measure_uuid
        }).exec();
        if (!measure) {
            throw new AppError("Leitura não encontrada", 404, "MEASURE_NOT_FOUND");
        };

        if (measure.has_confirmed) {
            throw new AppError("Leitura do mês já realizada", 409, "CONFIRMATION_DUPLICATE");
        }else {
            await MeasureModel.updateOne(
                { id: measure_uuid },
                { $set: { has_confirmed: true, value: value } }
            );

            return true;
        };
    };

    async list(customer_code: string, measure_type: string): Promise<any> {
        let filter: object;
        if (measure_type) {
            filter = {
                customer_code: customer_code,
                type: measure_type
            };
        } else {
            filter = {
                customer_code: customer_code,
            };
        };
        const measure = await MeasureModel.find(filter);
        if (!measure.length) {
            throw new AppError("Nenhuma leitura encontrada", 404, "MEASURES_NOT_FOUND");
        };

        return measure;
    }

    async findByMeasure(type: string, currentDate: Date): Promise<boolean> {
        const convertCurrentDate = new Date(currentDate);
        const firstDayOfMonth = new Date(convertCurrentDate.getFullYear(), convertCurrentDate.getMonth(), 1);
        const firstDayOfNextMonth = new Date(convertCurrentDate.getFullYear(), convertCurrentDate.getMonth() + 1, 1);

        try {
            const measure = await MeasureModel.findOne({
                type: type,
                created_at: {
                    $gte: firstDayOfMonth,
                    $lt: firstDayOfNextMonth
                }
            }).exec();

            if (measure) {
                return true;
            } else {
                return false;
            };

        } catch (error: any) {
            throw new Error("Error checking measure existence");
        };

    };
};