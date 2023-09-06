import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name"],
    minLength: [4, `name should have atleast 4 characters`],
  },
  password: {
    type: String,
    required: [true, "Please enter Your password"],
    minLength: [8, `password must contain 8 characters`],
  },
  email: {
    type: String,
    required: [true, "Please enter Your email"],
    validate: [validator.isEmail, "Please enter valid email"],
  },
  image: {
    imageUrl: { type: String, required: true },
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
},{timestamps:true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getJwtToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const model = mongoose.model("User", userSchema);
export default model;
