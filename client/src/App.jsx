import React from "react";
import { HStack, chakra, Heading } from "@chakra-ui/react";
import Navbar from "./screens/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./screens/Hero";
import Login from "./screens/Login";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Hero />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
