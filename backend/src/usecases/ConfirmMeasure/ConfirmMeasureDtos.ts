export interface ConfirmMeasureRequestDto{
    measure_uuid: string,
    confirmed_value: number
};

export interface ConfirmMeasureResponseDto{
    sucess: boolean
};