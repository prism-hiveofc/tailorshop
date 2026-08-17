import { Router } from "express";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

import {
  createOrderController,
  deleteOrderController,
  getOrderController,
  searchOrdersController,
  updateOrderController,
} from "../controllers/order.controller";
import {
  listOrdersController,
} from "../controllers/order.controller";
const router = Router();
router.post("/", authMiddleware, createOrderController);

router.get("/search", authMiddleware, searchOrdersController);

router.get("/", authMiddleware, listOrdersController);

router.get("/:id", authMiddleware, getOrderController);

router.put("/:id", authMiddleware, updateOrderController);

router.delete( "/:id", authMiddleware, deleteOrderController);

export default router;