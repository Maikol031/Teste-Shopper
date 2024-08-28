import { Measure, MeasureProps } from "../entities/Measure";
import { MeasureRepository } from "./MeasureRepository";
import MeasureModel from "./models/MeasureModel";

export class MongooseMeasureRepository implements MeasureRepository {
    
    async save(measure: Measure): Promise<Measure> {
        const { customer, ...measureProps } = measure

        await MeasureModel.create({
            customer_code: customer.id,
            measureProps
        });

        return new Measure(measure as MeasureProps, measure.id)
    }
    
    confirm(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    list(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}