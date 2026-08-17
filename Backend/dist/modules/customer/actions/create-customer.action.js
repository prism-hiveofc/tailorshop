"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const customer_repository_1 = require("../../customer/repositories/customer.repository");
const createCustomerAction = async (data, userId) => {
    const existingCustomer = await (0, customer_repository_1.findCustomerByPhone)(data.phone);
    if (existingCustomer) {
        throw new app_error_1.AppError("Customer already exists with this phone number", 409);
    }
    return (0, customer_repository_1.createCustomer)({
        ...data,
        createdBy: userId,
        updatedBy: userId,
    });
};
exports.createCustomerAction = createCustomerAction;
//# sourceMappingURL=create-customer.action.js.map