import { MeasureRepository } from "../../repositories/MeasureRepository";
import { CreateMeasureRequestDto, CreateMeasureResponseDto } from "./CreateMeasureDtos";
import { GenerativeAI } from "../../AI/GenerativeAI";
export declare class CreateMeasureUseCase {
    private measureRepository;
    private generativeAI;
    constructor(measureRepository: MeasureRepository, generativeAI: GenerativeAI);
    private verifyIsBase64;
    execute(createMeasureDto: CreateMeasureRequestDto): Promise<CreateMeasureResponseDto>;
}
//# sourceMappingURL=CreateMeasureUseCase.d.ts.map