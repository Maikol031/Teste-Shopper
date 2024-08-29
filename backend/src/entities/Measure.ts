import { validate, v4 } from 'uuid';
import { Customer } from './Customer';

export interface MeasureProps {
    customer: Customer
    value: number
    imageUrl: string
    type: 'WATER' | 'GAS'
    hasConfirmed: boolean
    createdAt: Date
    measureIdentification: string
}

export class Measure {

    private Id: string;
    private Customer: Customer;
    private Value: number;
    private ImageUrl: string;
    private Type: 'WATER' | 'GAS';
    private HasConfirmed?: boolean;
    private CreatedAt: Date;
    private MeasureIdentification: string

    constructor(props: MeasureProps, id?: string){
        if(id && !validate(id)) {
            throw new Error("INVALID_ID");
        }

        this.Id = id || v4();

        if (!props.customer || !(props.customer instanceof Customer)) {
            throw new Error("INVALID_CUSTOMER");
        }
        this.Customer = props.customer;

        if (typeof props.value !== 'number' || isNaN(props.value)) {
            throw new Error("INVALID_VALUE");
        }
        this.Value = props.value;

        if (typeof props.imageUrl !== 'string' || props.imageUrl.trim() === '') {
            throw new Error("INVALID_IMAGE_URL");
        }
        this.ImageUrl = props.imageUrl;

        const validTypes = ['WATER', 'GAS'];
        if (!validTypes.includes(props.type)) {
            throw new Error("INVALID_TYPE");
        }
        this.Type = props.type;

        if (typeof props.hasConfirmed !== 'boolean') {
            throw new Error("INVALID_HAS_CONFIRMED");
        }
        this.HasConfirmed = props.hasConfirmed;

        if (!(props.createdAt instanceof Date) || isNaN(props.createdAt.getTime())) {
            throw new Error("INVALID_CREATED_AT");
        }
        this.CreatedAt = props.createdAt;

        if (typeof props.measureIdentification !== 'string' || props.measureIdentification.trim() === '') {
            throw new Error("INVALID_MEASURE_IDENTIFICATION");
        }
        this.MeasureIdentification = props.measureIdentification;
    }

    get id() {
        return this.Id;
    }

    get customer() {
        return this.Customer;
    }
    
    get value() {
        return this.Value;
    }
    
    get imageUrl() {
        return this.ImageUrl;
    }
    
    get type() {
        return this.Type;
    }
    
    get hasConfirmed() {
        return this.HasConfirmed;
    }
    
    get createdAt() {
        return this.CreatedAt;
    }

    get measureIdentification() {
        return this.MeasureIdentification;
    }

}