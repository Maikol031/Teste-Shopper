import { Measure } from "../entities/Measure";

export interface MeasureRepository {
    save(measure: Measure): Promise<Measure>;
    confirm(): Promise<any>;
    list(): Promise<any>;
}