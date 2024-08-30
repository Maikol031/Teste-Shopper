import { MeasureRepository } from "../../repositories/MeasureRepository";
import { ConfirmMeasureRequestDto, ConfirmMeasureResponseDto } from "./ConfirmMeasureDtos";
export declare class ConfirmMeasureUseCase {
    private measureRepository;
    private mongooseMeasureRepository;
    constructor(measureRepository: MeasureRepository);
    private validDto;
    execute(confirmMeasureDto: ConfirmMeasureRequestDto): Promise<ConfirmMeasureResponseDto>;
}
//# sourceMappingURL=ConfirmMeasureUseCase.d.ts.map