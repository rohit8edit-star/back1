import { Router } from "express";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/create-order", authenticate, createRazorpayOrder);
router.post("/verify", authenticate, verifyPayment);

export default router;
