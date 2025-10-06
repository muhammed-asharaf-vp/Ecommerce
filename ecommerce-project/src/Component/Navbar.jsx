import React, { useContext, useState } from "react";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { WishlistContext } from "../Context/WishListContext";
import { CartContext } from "../Context/CartContext";
import logo from "../assets/new.png";

function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // ✅ Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/shop?search=${searchTerm}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
  };

  // ✅ Fixed navigation mapping
  const getNavigationPath = (item) => {
    switch (item) {
      case "HOME":
        return "/";
      case "SHOP":
        return "/shop";
      case "ABOUT US":
        return "/about"; // Change this to match your route
      case "CONTACT":
        return "/contact";
      default:
        return "/";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* Navbar Top Row */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-widest text-yellow-600 hover:text-yellow-500 transition-colors duration-300">
            Veloce
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-medium text-gray-700">
          {["HOME", "SHOP", "ABOUT US", "CONTACT"].map((item, idx) => (
            <li key={idx} className="group relative">
              <button
                className="hover:text-yellow-600 transition-colors"
                onClick={() => handleNavigation(getNavigationPath(item))}
              >
                {item}
              </button>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-600 transition-all group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6 text-xl text-gray-700">
          {/* Premium Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                className="w-48 lg:w-64 px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-4 w-4 text-gray-400 hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* Wishlist */}
          <div
            className="relative cursor-pointer hover:text-yellow-600 transition-colors"
            onClick={() => (user ? navigate("/wishlist") : navigate("/login"))}
          >
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs px-[6px] rounded-full shadow">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div
            onClick={() => (user ? navigate("/cart") : navigate("/login"))}
            className="relative cursor-pointer hover:text-yellow-600 transition-colors"
          >
            <FaShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs px-[6px] rounded-full shadow">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile */}
          {user ? (
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-yellow-600 transition-colors"
                onClick={toggleProfileDropdown}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-600 text-white rounded-full">
                  <FaUser className="text-sm" />
                </div>
                <span className="text-sm font-medium">
                  {user.firstname} {user.lastname}
                </span>
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavigation("/my-profile")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-orders")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
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

        {/* Mobile Buttons (search + menu) */}
        <div className="md:hidden flex items-center gap-4 text-2xl text-gray-700">
          <div
            className="cursor-pointer hover:text-yellow-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Always visible on mobile */}
      <div className="md:hidden px-4 pb-3 bg-white border-t border-gray-200 shadow-sm">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gray-50"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-4 w-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-40">
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg transition-transform duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-yellow-600">Menu</h2>
              <FaTimes
                className="text-xl cursor-pointer hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* Links */}
            <ul className="flex flex-col space-y-2 p-4 font-medium text-gray-700">
              {["HOME", "SHOP", "ABOUT US", "CONTACT"].map((item, idx) => (
                <li key={idx}>
                  <button
                    className="w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => handleNavigation(getNavigationPath(item))}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Bottom Icons */}
            <div className="p-4 border-t flex justify-around text-xl text-gray-700 mb-4">
              <div
                className="relative cursor-pointer hover:text-yellow-600 p-2"
                onClick={() =>
                  user ? navigate("/wishlist") : navigate("/login")
                }
              >
                <FaHeart />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs px-[6px] rounded-full shadow">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <div
                className="relative cursor-pointer hover:text-yellow-600 p-2"
                onClick={() => (user ? navigate("/cart") : navigate("/login"))}
              >
                <FaShoppingBag />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs px-[6px] rounded-full shadow">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Profile */}
            {user ? (
              <div className="p-4 border-t space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 bg-yellow-600 text-white rounded-full">
                    <FaUser />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-sm text-gray-500">Welcome back!</p>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigation("/my-profile")}
                  className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg"
                >
                  My Profile
                </button>
                <button
                  onClick={() => handleNavigation("/my-orders")}
                  className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg"
                >
                  My Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="p-4 border-t">
                <button
                  onClick={() => handleNavigation("/login")}
                  className="w-full py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;