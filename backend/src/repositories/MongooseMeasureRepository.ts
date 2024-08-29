import { Measure, MeasureProps } from "../entities/Measure";
import { MeasureRepository } from "./MeasureRepository";
import MeasureModel from "./models/MeasureModel";

export class MongooseMeasureRepository implements MeasureRepository {
    
    async save(measure: Measure): Promise<Measure> {
       const {imageUrl: image_url, createdAt: created_at, hasConfirmed: has_confirmed, id, type, value, customer, measureIdentification: measure_identification } = measure
        
        await MeasureModel.create({
            customer_code: customer.id,
            image_url,
            created_at,
            has_confirmed,
            id, 
            type, 
            value,
            measure_identification
        });
 
        return new Measure(measure as MeasureProps, measure.id)
    }
    
    confirm(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    async list(value?:string): Promise<any> {
    }

    async findById(value?:string): Promise<any>{
        try {
            const measure = await MeasureModel.findOne({ measure_identification: value });
            console.log(measure); 
    
            if (measure !== null) {
                console.log('Document found, throwing error');
                return true;
            } else {
            
                return false;
            }
            
        } catch (error:any) {
            console.error('Error in checking measure existence:', error.message);
            throw new Error("Error checking measure existence");
        }

    }

}