import { validate, v4 } from 'uuid';
import { Customer } from './Customer';
export interface MeasureProps {
    customer: Customer
    value: number
    imageUrl: string
    type: 'WATER' | 'GAS'
    hasConfirmed: boolean
    createdAt: Date
};
export class Measure {

    private Id: string;
    private Customer: Customer;
    private Value: number;
    private ImageUrl: string;
    private Type: 'WATER' | 'GAS';
    private HasConfirmed?: boolean;
    private CreatedAt: Date;

    constructor(props: MeasureProps, id?: string) {
        if (id && !validate(id)) {
            throw new Error("INVALID_ID");
        }

        this.Id = id || v4();

        if (!props.customer || !(props.customer instanceof Customer)) {
            throw new Error("Customer inválido");
        }
        this.Customer = props.customer;

        if (typeof props.value !== 'number' || isNaN(props.value)) {
            throw new Error("Valor da leitura inválido");
        }
        this.Value = props.value;

        if (typeof props.imageUrl !== 'string' || props.imageUrl.trim() === '') {
            throw new Error("Url da imagem inválido");
        }
        this.ImageUrl = props.imageUrl;

        const validTypes = ['WATER', 'GAS'];
        if (!validTypes.includes(props.type)) {
            throw new Error("Tipo da conta inválido");
        }
        this.Type = props.type;

        if (typeof props.hasConfirmed !== 'boolean') {
            throw new Error("Confirmação inválida");
        }
        this.HasConfirmed = props.hasConfirmed;

        if (!(props.createdAt instanceof Date) || isNaN(props.createdAt.getTime())) {
            throw new Error("Data da criação inválida");
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