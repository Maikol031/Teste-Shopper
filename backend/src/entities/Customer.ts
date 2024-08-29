import { v4, validate } from "uuid";

export class Customer {

    private Id: string;

    constructor(id?: string) {
        // if(id && !validate(id)) {
        //     throw new Error('INVALID_CUSTOMER_ID');
        // }

        // this.Id = id || v4();
        this.Id = id || v4();
    }

    get id() {
        return this.Id;
    }

}