import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
} from "../controllers/orderController";
import { authenticate, isAdmin } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authenticate, createOrder);
router.get("/user", authenticate, getUserOrders);

// Admin routes
router.get("/admin", authenticate, isAdmin, getAllOrders);
router.get("/admin/:id", authenticate, isAdmin, getOrderById);

export default router;
