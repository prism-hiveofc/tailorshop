"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_app_1 = require("./init/init-app");
const auth_route_1 = __importDefault(require("./modules/auth/routes/auth.route"));
const customer_route_1 = __importDefault(require("./modules/customer/routes/customer.route"));
const order_route_1 = __importDefault(require("./modules/order/routes/order.route"));
const payment_route_1 = __importDefault(require("./modules/payment/routes/payment.route"));
const dashboard_router_1 = __importDefault(require("./modules/dashboard/routes/dashboard.router"));
const report_route_1 = __importDefault(require("./modules/report/routes/report.route"));
const error_middleware_1 = require("./shared/middleware/error.middleware");
const app = (0, express_1.default)();
(0, init_app_1.initApp)(app);
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