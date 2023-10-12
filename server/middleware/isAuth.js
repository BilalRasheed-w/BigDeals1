import { asyncHandler, customError } from "../error/globalError.js";
import Jwt from "jsonwebtoken";
import User from "../models/userM.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    throw new customError("Your Session has expired ,pls Login Again", 400);
  const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData) throw new customError("Invalid token", 401);
  req.user = await User.findById(decodedData.id);
  next();
});

const isAuthorized = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") throw new customError("Forbidden request despa", 403);
  next();
});

export { isAuthenticated, isAuthorized };
