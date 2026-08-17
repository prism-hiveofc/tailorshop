"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCustomerAction = void 0;
const customer_repository_1 = require("../repositories/customer.repository");
const searchCustomerAction = async (keyword) => {
    return (0, customer_repository_1.searchCustomer)(keyword);
};
exports.searchCustomerAction = searchCustomerAction;
//# sourceMappingURL=search-customer.action.js.map