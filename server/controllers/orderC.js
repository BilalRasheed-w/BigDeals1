import { asyncHandler, customError } from "../error/globalError.js";
import Order from "../models/orderM.js";
import Product from "../models/ProductM.js";

// @ user
const newOrder = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const {
    orderItems,
    subTotal,
    tax,
    shipping,
    total,
    shippingInfo,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    user: user._id,
    orderItems,
    subTotal,
    tax,
    shipping,
    total,
    shippingInfo,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({ msg: "order placed successfully", order });
});

const myOrders = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const orders = await Order.find({ user: user._id });
  const totalOrders = await Order.find({ user: user._id }).countDocuments();
  if (!orders) throw new customError("no orders yet", 404);
  res.status(200).json({ totalOrders, orders });
});

const getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new customError("order Not found", 404);
  res.status(200).json({ order });
});

export { newOrder, myOrders, getSingleOrder };

//! admin

const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  const totalOrders = await Order.countDocuments();
  let totalAmount = 0;
  orders.forEach((ord) => {
    totalAmount = totalAmount + ord.total;
  });
  res.status(200).json({ totalAmount, totalOrders, orders });
});

const getOrderDetails = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) throw new customError("order Not found", 404);
  res.status(200).json({ order });
});

const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new customError("order Not found", 404);
  if (order.orderStatus === "delivered")
    throw new customError("order is already delivered", 400);
  order.orderStatus = req.body.status;

  order.orderItems.forEach(async (ord) => {
    console.log(ord.product, ord.quantity);
    await updateStock(ord.product, ord.quantity);
  });

  if(req.body.status==='delivered'){
    order.deliveredAt= Date.now()
  }

  await order.save({ new: true, validateBeforeSave: false });
  res.status(200).json({ msg: `${order.orderStatus}` });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity ;
  await product.save({ new: true, validateBeforeSave: false });
}

const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) throw new customError("order Not found", 404);
  res.status(200).json({ msg: "order deleted successfully" });
});

export { getAllOrders, getOrderDetails, updateOrder, deleteOrder };
