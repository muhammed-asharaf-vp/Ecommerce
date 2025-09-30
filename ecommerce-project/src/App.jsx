import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/signUp";
import Shop from "./Pages/Shop";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
