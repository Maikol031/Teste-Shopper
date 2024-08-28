import { validate, v4 } from 'uuid';
import { Customer } from './Customer';

export interface MeasureProps {
    customer: Customer
    value: number
    imageUrl: string
    type: 'WATER' | 'GAS'
    hasConfirmed: boolean
    createdAt: Date
}

export class Measure {

    private Id: string;
    private Customer: Customer;
    private Value: number;
    private ImageUrl: string;
    private Type: 'WATER' | 'GAS';
    private HasConfirmed?: boolean;
    private CreatedAt: Date;

    constructor(props: MeasureProps, id?: string){

        if(id && !validate(id)) {
            throw new Error("INVALID_ID");
        }

        this.Id = id || v4();

        this.Customer = props.customer;
        this.Value = props.value;
        this.ImageUrl = props.imageUrl;
        this.Type = props.type;
        this.HasConfirmed = props.hasConfirmed;
        this.CreatedAt = props.createdAt;
    
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

}