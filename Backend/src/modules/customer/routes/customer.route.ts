import { Router } from "express";
import {
  createCustomerController,
  deleteCustomerController,
  getCustomerController,
  listCustomersController,
  searchCustomerController,
  updateCustomerController,
} from "../controllers/customer.controller";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();
router.post("/", authMiddleware, createCustomerController);

router.get("/search", authMiddleware, searchCustomerController);

router.get("/", authMiddleware, listCustomersController);

router.get("/:id", authMiddleware, getCustomerController);
router.put( "/:id", authMiddleware, updateCustomerController);

router.post( "/:id", authMiddleware,  deleteCustomerController);
export default router;