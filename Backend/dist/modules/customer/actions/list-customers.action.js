"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCustomersAction = void 0;
const customer_repository_1 = require("../repositories/customer.repository");
const listCustomersAction = async () => {
    return (0, customer_repository_1.listCustomers)();
};
exports.listCustomersAction = listCustomersAction;
//# sourceMappingURL=list-customers.action.js.map