import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getOrderDetails,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderC.js";
import {
  isAuthenticated as isLoggedIn,
  isAuthorized as isAdmin,
} from "../middleware/isAuth.js";

const router = express.Router();

// @ user
router.post("/order/new", isLoggedIn, newOrder);
router.get("/orders/me", isLoggedIn, myOrders);
router.get("/order/:id", isLoggedIn, getSingleOrder);

// ! admin

router.get("/orders", isLoggedIn, isAdmin, getAllOrders);
router.get("/orders/:id", isLoggedIn, isAdmin, getOrderDetails);
router
  .route("/order/:id")
  .put(isLoggedIn, isAdmin, updateOrder)
  .delete(isLoggedIn, isAdmin, deleteOrder);

export default router;
