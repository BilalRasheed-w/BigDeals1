import React from "react";
import { HStack, chakra, Heading } from "@chakra-ui/react";
import Navbar from "./screens/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./screens/Hero";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Car from "./screens/Car";
import NewProduct from "./screens/ProductUpload";
import Profile from "./screens/Profile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route index element={<Hero />} /> */}
        <Route index element={<Car />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/product/new" element={<NewProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
