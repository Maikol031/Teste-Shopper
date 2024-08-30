import { Measure } from "../entities/Measure";
export interface MeasureRepository {
    save(measure: Measure): Promise<Measure>;
    confirm(measure_uuid:string, value:number): Promise<boolean>;
    list(customer_code:string, measure_type:string): Promise<any>;
    findByMeasure(type: string, currentDate: Date): Promise<boolean>;
}