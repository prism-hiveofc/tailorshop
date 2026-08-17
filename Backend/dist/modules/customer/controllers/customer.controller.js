"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerController = exports.searchCustomerController = exports.getCustomerController = exports.listCustomersController = exports.updateCustomerController = exports.createCustomerController = void 0;
const list_customers_action_1 = require("../actions/list-customers.action");
const get_customer_action_1 = require("../actions/get-customer.action");
const search_customer_action_1 = require("../actions/search-customer.action");
const async_handler_1 = require("../../../shared/utils/async.handler");
const success_response_1 = require("../../../shared/responses/success.response");
const error_response_1 = require("../../../shared/responses/error.response");
const create_customer_validation_1 = require("../validations/create-customer.validation");
const create_customer_action_1 = require("../actions/create-customer.action");
const update_customer_validation_1 = require("../validations/update-customer.validation");
const update_customer_action_1 = require("../actions/update-customer.action");
const delete_customer_action_1 = require("../actions/delete-customer.action");
exports.createCustomerController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { error, value } = create_customer_validation_1.createCustomerValidation.validate(req.body);
    if (error) {
        (0, error_response_1.errorResponse)(res, error.details[0].message, 400);
        return;
    }
    const customer = await (0, create_customer_action_1.createCustomerAction)(value, req.user.userId);
    (0, success_response_1.successResponse)(res, "Customer created successfully", customer, 201);
});
exports.updateCustomerController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const customerId = req.params.id;
    if (typeof customerId !== "string") {
        throw new Error("Invalid customer id");
    }
    const { error, value } = update_customer_validation_1.updateCustomerValidation.validate(req.body);
    if (error) {
        (0, error_response_1.errorResponse)(res, error.details[0].message, 400);
        return;
    }
    const customer = await (0, update_customer_action_1.updateCustomerAction)(customerId, value, req.user.userId);
    (0, success_response_1.successResponse)(res, "Customer updated successfully", customer);
});
exports.listCustomersController = (0, async_handler_1.asyncHandler)(async (_req, res) => {
    const customers = await (0, list_customers_action_1.listCustomersAction)();
    (0, success_response_1.successResponse)(res, "Customers fetched successfully", customers);
});
exports.getCustomerController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const customerId = req.params.id;
    if (typeof customerId !== "string") {
        throw new Error("Invalid customer id");
    }
    const customer = await (0, get_customer_action_1.getCustomerAction)(customerId);
    (0, success_response_1.successResponse)(res, "Customer fetched successfully", customer);
});
exports.searchCustomerController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    console.log("✅ Search Controller Called");
    const keyword = String(req.query.keyword || "");
    const customers = await (0, search_customer_action_1.searchCustomerAction)(keyword);
    (0, success_response_1.successResponse)(res, "Customers fetched successfully", customers);
});
exports.deleteCustomerController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const customerId = req.params.id;
    if (typeof customerId !== "string") {
        throw new Error("Invalid customer id");
    }
    await (0, delete_customer_action_1.deleteCustomerAction)(customerId, req.user.userId);
    (0, success_response_1.successResponse)(res, "Customer deleted successfully", null);
});
//# sourceMappingURL=customer.controller.js.map