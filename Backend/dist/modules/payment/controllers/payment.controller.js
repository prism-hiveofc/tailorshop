"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentPaymentsController = exports.deletePaymentController = exports.updatePaymentController = exports.searchPaymentController = exports.getPaymentController = exports.listPaymentsController = exports.createPaymentController = void 0;
const get_payment_action_1 = require("../actions/get-payment.action");
const async_handler_1 = require("../../../shared/utils/async.handler");
const success_response_1 = require("../../../shared/responses/success.response");
const error_response_1 = require("../../../shared/responses/error.response");
const create_payment_validation_1 = require("../validations/create-payment.validation");
const create_payment_action_1 = require("../actions/create-payment.action");
const list_payment_action_1 = require("../actions/list-payment.action");
const search_payment_action_1 = require("../actions/search-payment.action");
const update_payment_action_1 = require("../actions/update-payment.action");
const update_payment_validation_1 = require("../validations/update-payment.validation");
const delete_payment_action_1 = require("../actions/delete-payment.action");
const get_recent_payments_action_1 = require("../actions/get-recent-payments.action");
exports.createPaymentController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { error, value } = create_payment_validation_1.createPaymentValidation.validate(req.body);
    if (error) {
        (0, error_response_1.errorResponse)(res, error.details[0].message, 400);
        return;
    }
    const payment = await (0, create_payment_action_1.createPaymentAction)(value, req.user.userId);
    (0, success_response_1.successResponse)(res, "Payment created successfully", payment, 201);
});
exports.listPaymentsController = (0, async_handler_1.asyncHandler)(async (_req, res) => {
    const payments = await (0, list_payment_action_1.listPaymentsAction)();
    (0, success_response_1.successResponse)(res, "Payments fetched successfully", payments);
});
exports.getPaymentController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const paymentId = req.params.id;
    if (typeof paymentId !== "string") {
        throw new Error("Invalid payment id");
    }
    const payment = await (0, get_payment_action_1.getPaymentAction)(paymentId);
    (0, success_response_1.successResponse)(res, "Payment fetched successfully", payment);
});
exports.searchPaymentController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const keyword = String(req.query.keyword || "");
    const payments = await (0, search_payment_action_1.searchPaymentAction)(keyword);
    (0, success_response_1.successResponse)(res, "Payments fetched successfully", payments);
});
exports.updatePaymentController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { error, value } = update_payment_validation_1.updatePaymentValidation.validate(req.body);
    if (error) {
        (0, error_response_1.errorResponse)(res, error.details[0].message, 400);
        return;
    }
    const payment = await (0, update_payment_action_1.updatePaymentAction)(req.params.id, value, req.user.userId);
    (0, success_response_1.successResponse)(res, "Payment updated successfully", payment);
});
exports.deletePaymentController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await (0, delete_payment_action_1.deletePaymentAction)(req.params.id, req.user.userId);
    (0, success_response_1.successResponse)(res, "Payment deleted successfully", null);
});
exports.getRecentPaymentsController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const payments = await (0, get_recent_payments_action_1.getRecentPaymentsAction)();
    (0, success_response_1.successResponse)(res, "Recent payments fetched successfully", payments);
});
//# sourceMappingURL=payment.controller.js.map