import express from "express";
import { initApp } from "./init/init-app";

import authRoutes from "./modules/auth/routes/auth.route";
import customerRoutes from "./modules/customer/routes/customer.route";
import orderRoutes from "./modules/order/routes/order.route";
import paymentRoutes from "./modules/payment/routes/payment.route";
import dashboardRouter from "./modules/dashboard/routes/dashboard.router";
import reportRouter from "./modules/report/routes/report.route";

import { errorMiddleware } from "./shared/middleware/error.middleware";

const app = express();

initApp(app);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Tailor Shop API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/reports", reportRouter);

app.use(errorMiddleware);

export default app;