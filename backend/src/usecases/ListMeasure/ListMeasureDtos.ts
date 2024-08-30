export interface ListMeasureRequestDto{
    customer_code:string,
    measure_type?: string
};

interface MeasureResponse {
    measure_uuid: string;
    measure_datetime: string;
    measure_type: 'WATER' | 'GAS';
    has_confirmed: boolean;
    image_url: string;
};

export interface ListMeasureResponseDto {
    customer_code: string;
    measures: MeasureResponse[];
};