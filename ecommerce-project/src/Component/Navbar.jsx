// Navbar.jsx
import React, { useContext, useState } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/new.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Chrono Mart Logo"
            className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-10 font-medium text-gray-700">
          <li className="group relative">
            <button
              className="hover:text-yellow-600 transition-colors"
              onClick={() => navigate("/")}
            >
              HOME
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-600 transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <button
              className="hover:text-yellow-600 transition-colors"
              onClick={() => navigate("/Shop")}
            >
              PRODUCTS ▾
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-600 transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <button className="hover:text-yellow-600 transition-colors">
              ABOUT US ▾
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-600 transition-all group-hover:w-full"></span>
          </li>
        </ul>

        {/* Icons + Profile (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 text-xl text-gray-700">
          <FaSearch className="cursor-pointer hover:text-yellow-600 transition-colors" />

          {/* Wishlist */}
          <div className="relative cursor-pointer hover:text-yellow-600 transition-colors">
            <FaHeart />
            <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs px-[6px] rounded-full shadow">
              0
            </span>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer hover:text-yellow-600 transition-colors">
            <FaShoppingBag />
            <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs px-[6px] rounded-full shadow">
              0
            </span>
          </div>

          {/* Profile or Login */}
          {user ? (
            <div className="relative">
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:text-yellow-600 transition-colors"
                onClick={toggleProfileDropdown}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-600 text-white rounded-full">
                  <FaUser className="text-sm" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.firstname} {user.lastname}
                </span>
              </div>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/orders")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <FaSignOutAlt className="text-xs" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 bg-yellow-600 text-white font-medium rounded-full shadow-md hover:bg-yellow-700 transition-transform transform hover:scale-105"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-2xl cursor-pointer text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Modal Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Chrono Mart Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-700 hover:text-yellow-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col h-full">
              {/* Navigation Links */}
              <ul className="flex flex-col space-y-2 p-4 font-medium text-gray-700">
                <li>
                  <button
                    className="w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => handleNavigation("/")}
                  >
                    HOME
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => handleNavigation("/Shop")}
                  >
                    PRODUCTS ▾
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ABOUT US ▾
                  </button>
                </li>
              </ul>

              {/* Icons Section */}
              <div className="p-4 border-t flex justify-around text-xl text-gray-700 mb-4">
                <FaSearch className="cursor-pointer hover:text-yellow-600 transition-colors p-2" />
                <div className="relative cursor-pointer hover:text-yellow-600 transition-colors p-2">
                  <FaHeart />
                  <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs px-[6px] rounded-full shadow">
                    0
                  </span>
                </div>
                <div className="relative cursor-pointer hover:text-yellow-600 transition-colors p-2">
                  <FaShoppingBag />
                  <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs px-[6px] rounded-full shadow">
                    0
                  </span>
                </div>
              </div>

              {/* Profile Section (Mobile, always last) */}
              {user ? (
                <div className="space-y-3 p-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-yellow-600 text-white rounded-full">
                      <FaUser className="text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.firstname} {user.lastname}</p>
                      <p className="text-sm text-gray-500">Welcome back!</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => handleNavigation("/orders")}
                      className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <FaSignOutAlt className="text-xs" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation("/login")}
                  className="w-full py-3 bg-yellow-600 text-white font-medium rounded-lg shadow-md hover:bg-yellow-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Backdrop Click to Close */}
          <div 
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
