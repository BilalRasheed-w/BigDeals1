import { asyncHandler, customError } from "../error/globalError.js";
import Product from "../models/ProductM.js";
import ApiFeatures from "../utils/apiFeatures.js";

const getAllProducts = asyncHandler(async (req, res, next) => {
  const totalProducts = await Product.countDocuments();
  const resultsPerPage = 5;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeatures.query;
  const filtered = products.length;
  res.status(200).json({ totalProducts, filtered, products });
});

const createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, stock, category } = req.body;
  const data = {
    name,
    price,
    description,
    category,
    stock,
    images: [{ imageUrl: req.file.location }],
    user: req.user._id,
  };
  const product = await Product.create(data);
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
  console.log(
    "🚀 ~ file: productC.js:33 ~ deleteProduct ~ req.params.id:",
    req.params.id
  );
  if (!product) throw new customError("Product Not found", 404);
  res.status(200).json({ msg: "deleted successfully" });
});

const createReview = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { rating, comment, productId } = req.body;
  const review = {
    user: user._id,
    name: user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) throw new customError("Product Not found", 404);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  product.ratings = avg / product.reviews.length;
  await product.save({ new: true, validateBeforeSave: false });

  if (isReviewed) {
    res.status(200).json({ msg: "review updated successfully" });
  } else {
    res.status(200).json({ msg: "review submitted successfully" });
  }
});

const deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) throw new customError("Product not found", 404);

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, ratings },
    { new: true, runValidators: true }
  );

  await product.save({ new: true, validateBeforeSave: false });
  res.status(200).json({ product });
});

const getReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new customError("Product Not found", 404);
  const numberOfReviews = product.reviews.length;
  res.status(200).json({ numberOfReviews, reviews: product.reviews });
});

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getReviews,
  createReview,
  deleteReview,
};
