"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const error_response_1 = require("../responses/error.response");
const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole) {
            (0, error_response_1.errorResponse)(res, "Unauthorized", 401);
            return;
        }
        if (!allowedRoles.includes(userRole)) {
            (0, error_response_1.errorResponse)(res, "Forbidden", 403);
            return;
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=role.middleware.js.map