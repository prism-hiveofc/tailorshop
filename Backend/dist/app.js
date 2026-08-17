"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const customer_route_1 = __importDefault(require("./modules/customer/routes/customer.route"));
const auth_route_1 = __importDefault(require("./modules/auth/routes/auth.route"));
const error_middleware_1 = require("./shared/middleware/error.middleware");
const order_route_1 = __importDefault(require("./modules/order/routes/order.route"));
const payment_route_1 = __importDefault(require("./modules/payment/routes/payment.route"));
const dashboard_router_1 = __importDefault(require("./modules/dashboard/routes/dashboard.router"));
const report_route_1 = __importDefault(require("./modules/report/routes/report.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Tailor Shop API Running",
    });
});
app.use("/api/auth", auth_route_1.default);
app.use("/api/customers", customer_route_1.default);
app.use("/api/orders", order_route_1.default);
app.use("/api/payments", payment_route_1.default);
app.use("/api/dashboard", dashboard_router_1.default);
app.use("/api/reports", report_route_1.default);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map