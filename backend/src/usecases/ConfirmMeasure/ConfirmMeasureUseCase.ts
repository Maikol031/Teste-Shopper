import { validate } from "uuid";
import { AppError } from "../../entities/AppErro";
import { MeasureRepository } from "../../repositories/MeasureRepository";
import { ConfirmMeasureRequestDto, ConfirmMeasureResponseDto } from "./ConfirmMeasureDtos";
import { MongooseMeasureRepository } from "../../repositories/MongooseMeasureRepository";

export class ConfirmMeasureUseCase {
    private measureRepository: MeasureRepository;
    private mongooseMeasureRepository: MongooseMeasureRepository;

    constructor(measureRepository: MeasureRepository) {
        this.measureRepository = measureRepository;
        this.mongooseMeasureRepository = new MongooseMeasureRepository();
    };

    private async validDto(measure_uuid: string, confirmed_value: number) {
        if (typeof confirmed_value !== 'number' || isNaN(confirmed_value)) {
            throw new AppError("Valor da leitura inválido", 400, "INVALID_DATA");
        };
        if (!validate(measure_uuid)) {
            throw new AppError("UUID inválido", 400, "INVALID_DATA");
        };
    };

    async execute(confirmMeasureDto: ConfirmMeasureRequestDto): Promise<ConfirmMeasureResponseDto> {
        const { measure_uuid, confirmed_value } = confirmMeasureDto;
        await this.validDto(measure_uuid, confirmed_value);
        const confirmValue = await this.mongooseMeasureRepository.confirm(measure_uuid, confirmed_value);

        return { sucess: confirmValue };
    };
};