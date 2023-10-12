import express from "express";
import {
  AdminProducts,
  createProduct,
  createReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getReviews,
  getSingleProduct,
  updateProduct,
} from "../controllers/productC.js";
import {
  isAuthenticated as isLoggedIn,
  isAuthorized as isAdmin,
} from "../middleware/isAuth.js";
import upload from "../config/s3.js";

const router = express.Router();

router.get("/admin/products", isLoggedIn, isAdmin, AdminProducts);
router.get("/products", getAllProducts);
router.put("/product/review", isLoggedIn, createReview);

router.get("/product/reviews/:id", isLoggedIn, isAdmin, getReviews);
router.delete("/product/review", isLoggedIn, isAdmin, deleteReview);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(isLoggedIn, isAdmin, upload.single("image"), updateProduct)
  .delete(isLoggedIn, isAdmin, deleteProduct);

router.post(
  "/product/new",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  createProduct
);

export default router;
