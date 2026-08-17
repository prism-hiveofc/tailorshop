"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../shared/middleware/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const order_controller_2 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, order_controller_1.createOrderController);
router.get("/search", auth_middleware_1.authMiddleware, order_controller_1.searchOrdersController);
router.get("/", auth_middleware_1.authMiddleware, order_controller_2.listOrdersController);
router.get("/:id", auth_middleware_1.authMiddleware, order_controller_1.getOrderController);
router.put("/:id", auth_middleware_1.authMiddleware, order_controller_1.updateOrderController);
router.delete("/:id", auth_middleware_1.authMiddleware, order_controller_1.deleteOrderController);
exports.default = router;
//# sourceMappingURL=order.route.js.map