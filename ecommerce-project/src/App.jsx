import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Shop from "./Pages/Shop";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import About from "./Pages/About";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart/>}/>
         <Route path="/about" element={<About />} />
      </Routes>
       {/* ✅ Toast Notification Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="colored"
      />
      <Footer />
    </div>
  );
}

export default App;
