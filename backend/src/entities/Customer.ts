import { v4 } from "uuid";
export class Customer {

    private Id: string;

    constructor(id?: string) {
        this.Id = id || v4();
    };

    get id() {
        return this.Id;
    };
    
};