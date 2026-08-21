"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const login_validation_1 = require("../validations/login.validation");
const register_validation_1 = require("../validations/register.validation");
const login_action_1 = require("../actions/login.action");
const register_action_1 = require("../actions/register.action");
const get_profile_action_1 = require("../actions/get-profile.action");
const async_handler_1 = require("../../../shared/utils/async.handler");
const error_response_1 = require("../../../shared/responses/error.response");
const success_response_1 = require("../../../shared/responses/success.response");
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
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("accessToken", result.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    (0, success_response_1.successResponse)(res, "Login Successful", {
        user: result.user,
    });
});
exports.logoutController = (0, async_handler_1.asyncHandler)(async (_req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
    (0, success_response_1.successResponse)(res, "Logout successful", null);
});
exports.getProfileController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const user = await (0, get_profile_action_1.getProfileAction)(req.user.userId);
    (0, success_response_1.successResponse)(res, "Profile fetched successfully", user);
});
//# sourceMappingURL=auth.controller.js.map