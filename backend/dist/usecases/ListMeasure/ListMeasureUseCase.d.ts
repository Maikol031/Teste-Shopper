import { MeasureRepository } from "../../repositories/MeasureRepository";
import { ListMeasureRequestDto, ListMeasureResponseDto } from "./ListMeasureDtos";
export declare class ListMeasureUseCase {
    private measureRepository;
    constructor(measureRepository: MeasureRepository);
    execute(listMeasureDto: ListMeasureRequestDto): Promise<ListMeasureResponseDto>;
}
//# sourceMappingURL=ListMeasureUseCase.d.ts.map