import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    subTotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    shipping: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    shippingInfo: {
      phoneNo: { type: Number, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true, default: "India" },
      pinCode: { type: Number, required: true },
    },
    paymentInfo: {
      id: { type: String, required: true },
      status: { type: String, required: true },
    },
    paidAt: { type: Date, required: true },
    orderStatus: { type: String, required: true, default: "processing" },
    deliveredAt: Date,
  },
  { timestamps: true }
);
const model = mongoose.model("Order", orderSchema);
export default model;
