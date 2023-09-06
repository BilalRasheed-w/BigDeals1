import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productC.js";
const router = express.Router();

router.get("/products", getAllProducts);

router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router.post("/product/new", createProduct);

export default router;
