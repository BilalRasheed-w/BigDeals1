import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      minLength: [4, "product name should have atleast 4 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [8, "product price should be less than 8 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    category: {
      type: String,
      required: [true, "Please enter product category"],
    },
    ratings: {
      type: Number,
      required: true,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    images: [
      {
        imageUrl: { type: String, required: true },
      },
    ],
    reviews: [
      {
        user: { type: mongoose.Schema.ObjectId, required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    user: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);
const model = mongoose.model("Product", productSchema);
export default model;
