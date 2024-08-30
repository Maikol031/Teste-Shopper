"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measure = void 0;
const uuid_1 = require("uuid");
const Customer_1 = require("./Customer");
;
class Measure {
    constructor(props, id) {
        if (id && !(0, uuid_1.validate)(id)) {
            throw new Error("INVALID_ID");
        }
        this.Id = id || (0, uuid_1.v4)();
        if (!props.customer || !(props.customer instanceof Customer_1.Customer)) {
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
    }
    ;
    get id() {
        return this.Id;
    }
    ;
    get customer() {
        return this.Customer;
    }
    ;
    get value() {
        return this.Value;
    }
    ;
    get imageUrl() {
        return this.ImageUrl;
    }
    ;
    get type() {
        return this.Type;
    }
    ;
    get hasConfirmed() {
        return this.HasConfirmed;
    }
    ;
    get createdAt() {
        return this.CreatedAt;
    }
    ;
}
exports.Measure = Measure;
;
