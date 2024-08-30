import { AppError } from "../../entities/AppErro";
import { MeasureRepository } from "../../repositories/MeasureRepository";
import { ListMeasureRequestDto, ListMeasureResponseDto } from "./ListMeasureDtos";

interface MeasureResult {
    id: string;
    created_at: Date;
    type: 'WATER' | 'GAS';
    has_confirmed: boolean;
    image_url: string;
}
export class ListMeasureUseCase {

    private measureRepository: MeasureRepository;

    constructor(measureRepository: MeasureRepository) {
        this.measureRepository = measureRepository;
    }

    async execute(listMeasureDto: ListMeasureRequestDto): Promise<ListMeasureResponseDto> {

        const { customer_code, measure_type } = listMeasureDto;

        if (measure_type !== "WATER" && measure_type !== "GAS" && measure_type !== undefined) {
            throw new AppError("Tipo de medição não permitida", 400, "INVALID_TYPE");
        };

        const results: MeasureResult[] = await this.measureRepository.list(customer_code, measure_type || '');

        return {
            customer_code,
            measures: results.map((result: MeasureResult) => ({
                measure_uuid: result.id,
                measure_datetime: result.created_at.toISOString(),
                measure_type: result.type,
                has_confirmed: result.has_confirmed,
                image_url: result.image_url
            }))
        };
    };
};