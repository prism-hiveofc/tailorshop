"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileController = exports.loginController = exports.registerController = void 0;
const login_validation_1 = require("../validations/login.validation");
const login_action_1 = require("../actions/login.action");
const async_handler_1 = require("../../../shared/utils/async.handler");
const error_response_1 = require("../../../shared/responses/error.response");
const success_response_1 = require("../../../shared/responses/success.response");
const get_profile_action_1 = require("../actions/get-profile.action");
const register_action_1 = require("../actions/register.action");
const register_validation_1 = require("../validations/register.validation");
exports.registerController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { error, value } = register_validation_1.registerValidation.validate(req.body);
    if (error) {
        (0, error_response_1.errorResponse)(res, error.details[0].message, 400);
        return;
    }
    const user = await (0, register_action_1.registerAction)(value);
    (0, success_response_1.successResponse)(res, "Registration Successful", user, 201);
});
exports.loginController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { error, value } = login_validation_1.loginValidation.validate(req.body);
    if (error) {
        (0, error_response_1.errorResponse)(res, error.details[0].message, 400);
        return;
    }
    const result = await (0, login_action_1.loginAction)(value);
    (0, success_response_1.successResponse)(res, "Login Successful", result);
});
exports.getProfileController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const user = await (0, get_profile_action_1.getProfileAction)(req.user.userId);
    (0, success_response_1.successResponse)(res, "Profile fetched successfully", user);
});
//# sourceMappingURL=auth.controller.js.map