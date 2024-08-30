import { Measure } from "../entities/Measure";
import { MeasureRepository } from "./MeasureRepository";
export declare class MongooseMeasureRepository implements MeasureRepository {
    save(measure: Measure): Promise<Measure>;
    confirm(measure_uuid: string, value: number): Promise<boolean>;
    list(customer_code: string, measure_type: string): Promise<any>;
    findByMeasure(type: string, currentDate: Date): Promise<boolean>;
}
//# sourceMappingURL=MongooseMeasureRepository.d.ts.map