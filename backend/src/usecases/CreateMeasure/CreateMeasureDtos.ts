export interface CreateMeasureRequestDto {
    image: string,
    customer_code: string,
    measure_datetime: Date,
    measure_type: string
}

export interface CreateMeasureResponseDto {
    image_url: string,
    measure_value: number,
    measure_uuid: string
}