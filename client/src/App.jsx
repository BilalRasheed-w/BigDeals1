import React, { useState } from "react";
import { HStack, chakra, Heading } from "@chakra-ui/react";
import Navbar from "./screens/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./screens/Hero";

// user
import Login from "./screens/User/Login";
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

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route index element={<Products />} />
        {/* <Route index element={<Car />} /> */}
        {/* //!  user */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password" element={<UpdatePassword />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* //@ Product */}
        <Route path="/product/:id" element={<ProductCard />} />
        <Route path="/admin/product/new" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
