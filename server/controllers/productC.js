import { asyncHandler, customError } from "../error/globalError.js";
import Product from "../models/ProductM.js";

const getAllProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find();
  const numOfProduct = await Product.countDocuments();
  res.status(200).json({ numOfProduct, product });
});

const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
});

const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new customError("Product not Found", 404);
  res.status(200).json({ product });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const productExist = await Product.findById(req.params.id);
  if (!productExist) throw new customError("Product not Found", 404);
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ product });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const productExist = await Product.findById(req.params.id);
  if (!productExist) throw new customError("Product not Found", 404);
  const product = await Product.findByIdAndDelete(req.params.id);
  console.log("🚀 ~ file: productC.js:33 ~ deleteProduct ~ req.params.id:", req.params.id)
  if (!product) throw new customError("Product Not found", 404);
  res.status(200).json({ msg: "deleted successfully" });
});

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
