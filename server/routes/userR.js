import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserDetails,
  login,
  logout,
  myDetails,
  redirect,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
} from "../controllers/userC.js";
import {
  isAuthenticated as isLoggedIn,
  isAuthorized as isAdmin,
} from "../middleware/isAuth.js";
import { verifyJwt } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/user/new", registerUser);
router.post("/user/login", login);
router.get("/user/logout", logout);
router.get("/user/me", isLoggedIn, myDetails);
router.put("/user/me", isLoggedIn, updateProfile);
router.put("/user/password", isLoggedIn, updatePassword);

router.post("/user/forgot", forgotPassword);

router.post("/user/reset/:token", verifyJwt, resetPassword);

// admin
router.get("/users", isLoggedIn, isAdmin, getAllUsers);
router
  .route("/user/:id")
  .get(isLoggedIn, isAdmin, getUserDetails)
  .put(isLoggedIn, isAdmin, updateUser)
  .delete(isLoggedIn, isAdmin, deleteUser);

// router.get("/redirect", redirect);

export default router;
