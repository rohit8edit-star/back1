import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authenticate, isAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", authenticate, isAdmin, upload.single("image"), createProduct);
router.put("/:id", authenticate, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProduct);

export default router;
