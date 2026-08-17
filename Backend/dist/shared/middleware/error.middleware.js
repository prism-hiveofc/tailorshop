"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const app_error_1 = require("../errors/app.error");
const error_response_1 = require("../responses/error.response");
const errorMiddleware = (error, _req, res, _next) => {
    if (error instanceof app_error_1.AppError) {
        (0, error_response_1.errorResponse)(res, error.message, error.statusCode);
        return;
    }
    console.error(error);
    (0, error_response_1.errorResponse)(res, "Internal Server Error", 500);
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map