import { asyncHandler, customError } from "../error/globalError.js";
import User from "../models/userM.js";
import { sendToken } from "../utils/SendToken.js";
import { sendEmail } from "../utils/sendEmail.js";

// @ user
const registerUser = asyncHandler(async (req, res, next) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) throw new customError("User already exist", 409);
  const { name, email, password } = req.body;
  let image = { imageUrl: "sample id", id: Date.now() };
  if (req.file) {
    image = { imageUrl: req.file.location, id: Date.now() };
  }
  const user = await User.create({
    name,
    email,
    password,
    image,
  });
  sendToken(user, 200, res);
});

const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new customError("Email or Password is Invalid", 404);
  const isMatched = await user.comparePassword(req.body.password);
  if (!isMatched) throw new customError("Email or password is Invalid", 401);
  sendToken(user, 200, res);
});

const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) });
  res.status(200).json({ msg: "logged out successfully" });
});

const myDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ user });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    validateBeforeSave: false,
    new: true,
  });
  res.status(200).json({ success: true, user });
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const isMatched = await user.comparePassword(oldPassword);
  if (!isMatched) throw new customError("OldPassword is Incorrect", 400);
  if (newPassword.length < 8)
    throw new customError("password must contain 8 characters", 400);
  if (newPassword !== confirmPassword)
    throw new customError("password doesn't match", 400);
  user.password = newPassword;
  await user.save({ new: true, validateBeforeSave: false });
  res.status(200).json({ msg: "password updated successfully" });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new customError("No account exists with that email", 404);
  await sendEmail(user);
  res.status(200).json({ msg: `email sent to ${user.name} successfully` });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { password, confirmPassword } = req.body;
  if (password.length < 8)
    throw new customError("Password must contain 8 characters", 400);
  if (password !== confirmPassword)
    throw new customError("password doesn't match", 400);
  user.password = password;
  await user.save({ validateBeforeSave: false, new: true });
  res.status(200).json({ msg: "password updated successfully" });
});

export {
  registerUser,
  myDetails,
  updateProfile,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
};

// !admin

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  const numOfUsers = await User.countDocuments();
  res.status(200).json({ numOfUsers, users });
});

const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new customError("User not  Found", 404);
  res.status(200).json({ user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new customError("User not  Found", 404);
  user.role = req.body.role;
  await user.save({ new: true, validateBeforeSave: false });
  res.status(200).json({ user });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const userExist = await User.findById(req.params.id);
  if (!userExist) throw new customError("User not  Found", 404);
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: `user ${user.name} deleted successfully ` });
});

// const redirect = asyncHandler(async (req, res, next) => {
//   res.redirect("http://localhost:5000/api/users");
// });

export { getAllUsers, updateUser, deleteUser, getUserDetails };
