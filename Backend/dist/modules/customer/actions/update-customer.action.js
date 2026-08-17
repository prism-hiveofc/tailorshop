"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const customer_repository_1 = require("../repositories/customer.repository");
const updateCustomerAction = async (customerId, data, userId) => {
    const customer = await (0, customer_repository_1.findCustomerById)(customerId);
    if (!customer) {
        throw new app_error_1.AppError("Customer not found", 404);
    }
    const existingCustomer = await (0, customer_repository_1.findCustomerByPhone)(data.phone);
    if (existingCustomer &&
        existingCustomer.id !== customerId) {
        throw new app_error_1.AppError("Phone number already exists", 409);
    }
    return (0, customer_repository_1.updateCustomer)(customerId, {
        ...data,
        updatedBy: userId,
    });
};
exports.updateCustomerAction = updateCustomerAction;
//# sourceMappingURL=update-customer.action.js.map