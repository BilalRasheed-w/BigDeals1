import React, { useState } from "react";

import Navbar from "./screens/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./screens/Hero";

// user

import Signup from "./screens/User/Signup";
import Profile from "./screens/User/Profile";
import UpdatePassword from "./components/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

// Product
import NewProduct from "./screens/Product/NewProduct";
import UpdateProduct from "./screens/Product/UpdateProduct";
import Products from "./screens/Product/Products";
import ProductCard from "./screens/Product/ProductCard";
import Cart from "./screens/Product/Cart";
import Dashboard from "./screens/admin/Dashboard";
import AdminProducts from "./screens/admin/AdminProducts";
import AllUsers from "./screens/admin/AdminUsers";
import Footer from "./components/Footer";
import Log from "./screens/User/Log";
import Order from "./screens/order/Order";
import Shipping from "./screens/order/Shipping";
import PaymentCard from "./screens/order/PaymentCard";
import OrderSuccess from "./screens/order/OrderSuccess";
import MyOrders from "./screens/order/MyOrders";
import AllOrders from "./screens/admin/AllOrders";
import AddReview from "./screens/Product/AddReview";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        {/* //!  user */}
        <Route path="/login" element={<Log />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={<ProtectedRoutes Component={Profile} />}
        />
        <Route
          path="/password"
          element={<ProtectedRoutes Component={UpdatePassword} />}
        />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={<ProtectedRoutes Component={Shipping} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoutes Component={Order} />}
        />
        <Route
          path="/order/confirm/payment"
          element={<ProtectedRoutes Component={PaymentCard} />}
        />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route
          path="/orders/me"
          element={<ProtectedRoutes Component={MyOrders} />}
        />

        {/* //@ Product */}
        <Route path="/product/:id" element={<ProductCard />} />
        <Route
          path="/product/review/:id"
          element={<ProtectedRoutes Component={AddReview} />}
        />
        <Route
          path="/admin/product/new"
          element={<ProtectedRoutes Component={NewProduct} />}
        />

        {/*//! admin */}
        <Route
          path="/admin"
          element={<ProtectedRoutes Component={Dashboard} />}
        />
        <Route
          path="/admin/product/:id"
          element={<ProtectedRoutes Component={UpdateProduct} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoutes Component={AdminProducts} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoutes Component={AllUsers} />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoutes Component={AllOrders} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
