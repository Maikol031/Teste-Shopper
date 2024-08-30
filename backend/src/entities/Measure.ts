import { validate, v4 } from 'uuid';
import { Customer } from './Customer';
import { AppError } from './AppErro';

export interface MeasureProps {
    customer: Customer
    value: number
    type: 'WATER' | 'GAS'
    createdAt: Date
    hasConfirmed: boolean
    imageUrl?: string
};

export class Measure {

    private Id: string;
    private Customer: Customer;
    private Value: number;
    private ImageUrl: string;
    private Type: 'WATER' | 'GAS';
    private HasConfirmed: boolean;
    private CreatedAt: Date;

    constructor(props: MeasureProps, id?: string) {
        if (id && !validate(id)) {
            throw new Error("INVALID_ID");
        }

        this.Id = id || v4();

        if (!props.customer || !(props.customer instanceof Customer)) {
            throw new AppError("Customer inválido", 400, "INVALID_DATA");
        }
        this.Customer = props.customer;

        if (typeof props.value !== 'number' || isNaN(props.value)) {
            throw new AppError("Valor da leitura inválido", 400, "INVALID_DATA");
        }
        this.Value = props.value;

        this.ImageUrl = props.imageUrl || `/files/${this.Id}`;

        const validTypes = ['WATER', 'GAS'];
        if (!validTypes.includes(props.type)) {
            throw new AppError("Tipo da conta inválido", 400, "INVALID_DATA");
        }
        this.Type = props.type;

        if (typeof props.hasConfirmed !== 'boolean') {
            throw new AppError("Confirmação inválida", 400, "INVALID_DATA");
        }
        this.HasConfirmed = props.hasConfirmed;

        if (!(props.createdAt instanceof Date) || isNaN(props.createdAt.getTime())) {
            throw new AppError("Data da criação inválida", 400, "INVALID_DATA");
        }
        this.CreatedAt = props.createdAt;
    };

    get id() {
        return this.Id;
    };

    get customer() {
        return this.Customer;
    };

    get value() {
        return this.Value;
    };

    get imageUrl() {
        return this.ImageUrl;
    };

    get type() {
        return this.Type;
    };

    get hasConfirmed() {
        return this.HasConfirmed;
    };

    get createdAt() {
        return this.CreatedAt;
    };

};