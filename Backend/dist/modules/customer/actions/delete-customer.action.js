"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const customer_repository_1 = require("../repositories/customer.repository");
const deleteCustomerAction = async (customerId, userId) => {
    const customer = await (0, customer_repository_1.findCustomerById)(customerId);
    if (!customer) {
        throw new app_error_1.AppError("Customer not found", 404);
    }
    return (0, customer_repository_1.softDeleteCustomer)(customerId, userId);
};
exports.deleteCustomerAction = deleteCustomerAction;
//# sourceMappingURL=delete-customer.action.js.map