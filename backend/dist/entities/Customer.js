"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const uuid_1 = require("uuid");
class Customer {
    constructor(id) {
        this.Id = id || (0, uuid_1.v4)();
    }
    ;
    get id() {
        return this.Id;
    }
    ;
}
exports.Customer = Customer;
;
