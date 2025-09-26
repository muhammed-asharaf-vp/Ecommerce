// Navbar.jsx
import React from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import logo from "../assets/new.png";
import { useNavigate } from "react-router-dom"; // import hook

function Navbar() {
  const navigate = useNavigate(); // hook to change route

  return (
    <nav className="w-full shadow-sm bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="Chrono Mart Logo" 
            className="h-12 w-auto object-contain" 
          />
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li className="group relative">
            <button className="hover:text-gray-700">HOME</button>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <button className="hover:text-gray-700">SHOP ▾</button>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <button className="hover:text-gray-700">PRODUCTS ▾</button>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <button className="hover:text-gray-700">ABOUT US ▾</button>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
          </li>
        </ul>

        {/* Icons + Login */}
        <div className="flex items-center space-x-6 text-lg">
          <FaSearch className="cursor-pointer hover:text-gray-600" />
          <FaUser className="cursor-pointer hover:text-gray-600" />

          {/* Wishlist */}
          <div className="relative cursor-pointer hover:text-gray-600">
            <FaHeart />
            <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs px-[6px] rounded-full">
              0
            </span>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer hover:text-gray-600">
            <FaShoppingBag />
            <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs px-[6px] rounded-full">
              0
            </span>
          </div>

          {/* Login Button */}
          <button
            onClick={() => navigate("/login")} // 👈 navigate to login page
            className="ml-4 px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
