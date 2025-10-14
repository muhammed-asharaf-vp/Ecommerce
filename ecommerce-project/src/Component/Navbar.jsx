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

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
  };

  //  Fixed navigation mapping
  const getNavigationPath = (item) => {
    switch (item) {
      case "HOME":
        return "/";
      case "SHOP":
        return "/shop";
      case "ABOUT US":
        return "/about";
      case "CONTACT":
        return "/contact";
      default:
        return "/";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50 border-b border-[#FFEDA8]/20">
      {/* Navbar Top Row */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-widest text-[#003631] group-hover:text-[#003631]/80 transition-colors duration-300">
            Veloce
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-light text-[#003631]">
          {["HOME", "SHOP", "ABOUT US", "CONTACT"].map((item, idx) => (
            <li key={idx} className="group relative">
              <button
                className="hover:text-[#FFEDA8] transition-colors duration-300 text-sm tracking-wider uppercase"
                onClick={() => handleNavigation(getNavigationPath(item))}
              >
                {item}
              </button>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#FFEDA8] transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6 text-lg text-[#003631]">
          {/* Wishlist */}
          <div
            className="relative cursor-pointer hover:text-[#FFEDA8] transition-colors duration-300 p-2"
            onClick={() => (user ? navigate("/wishlist") : navigate("/login"))}
          >
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FFEDA8] text-[#003631] text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg border border-[#003631]/10">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div
            onClick={() => (user ? navigate("/cart") : navigate("/login"))}
            className="relative cursor-pointer hover:text-[#FFEDA8] transition-colors duration-300 p-2"
          >
            <FaShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FFEDA8] text-[#003631] text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg border border-[#003631]/10">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile */}
          {user ? (
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-[#FFEDA8] transition-colors duration-300 p-2"
                onClick={toggleProfileDropdown}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-[#003631] text-[#FFEDA8] rounded-full border border-[#003631]/20">
                  <FaUser className="text-sm" />
                </div>
                <span className="text-sm font-light text-[#003631]">
                  {user.firstname}
                </span>
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-sm shadow-xl border border-[#FFEDA8]/20 py-2 z-50 backdrop-blur-sm">
                  <div className="px-4 py-3 border-b border-[#FFEDA8]/10">
                    <p className="text-sm font-medium text-[#003631]">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-xs text-[#003631]/60">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavigation("/my-profile")}
                    className="w-full text-left px-4 py-2 text-sm text-[#003631] hover:bg-[#FFEDA8]/10 transition-colors duration-200"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-orders")}
                    className="w-full text-left px-4 py-2 text-sm text-[#003631] hover:bg-[#FFEDA8]/10 transition-colors duration-200"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#003631] hover:bg-[#FFEDA8]/10 flex items-center space-x-2 transition-colors duration-200"
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
              className="px-6 py-2 bg-[#003631] text-[#FFEDA8] font-light rounded-sm shadow-lg hover:bg-[#003631]/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 tracking-wide border border-[#003631]"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Buttons (menu) */}
        <div className="md:hidden flex items-center gap-4 text-xl text-[#003631]">
          <div
            className="cursor-pointer hover:text-[#FFEDA8] transition-colors duration-300 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#003631]/80 backdrop-blur-sm">
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 border-l border-[#FFEDA8]/20">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#FFEDA8]/10 bg-[#003631]">
              <h2 className="text-xl font-light text-[#FFEDA8] tracking-wider">MENU</h2>
              <FaTimes
                className="text-xl cursor-pointer text-[#FFEDA8] hover:text-white transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* Links */}
            <ul className="flex flex-col space-y-1 p-4 font-light text-[#003631]">
              {["HOME", "SHOP", "ABOUT US", "CONTACT"].map((item, idx) => (
                <li key={idx}>
                  <button
                    className="w-full text-left py-4 px-4 hover:bg-[#FFEDA8]/10 rounded-sm transition-all duration-300 text-sm tracking-wider uppercase border-b border-[#FFEDA8]/5"
                    onClick={() => handleNavigation(getNavigationPath(item))}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Bottom Icons */}
            <div className="p-4 border-t border-[#FFEDA8]/10 flex justify-around text-xl text-[#003631] mb-4">
              <div
                className="relative cursor-pointer hover:text-[#FFEDA8] p-3 transition-colors duration-300"
                onClick={() =>
                  user ? navigate("/wishlist") : navigate("/login")
                }
              >
                <FaHeart />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFEDA8] text-[#003631] text-xs w-5 h-5 flex items-center justify-center rounded-full shadow border border-[#003631]/10">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <div
                className="relative cursor-pointer hover:text-[#FFEDA8] p-3 transition-colors duration-300"
                onClick={() => (user ? navigate("/cart") : navigate("/login"))}
              >
                <FaShoppingBag />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFEDA8] text-[#003631] text-xs w-5 h-5 flex items-center justify-center rounded-full shadow border border-[#003631]/10">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Profile */}
            {user ? (
              <div className="p-4 border-t border-[#FFEDA8]/10 space-y-2">
                <div className="flex items-center space-x-3 p-4 bg-[#FFEDA8]/10 rounded-sm border border-[#FFEDA8]/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#003631] text-[#FFEDA8] rounded-full border border-[#003631]/20">
                    <FaUser />
                  </div>
                  <div>
                    <p className="font-light text-[#003631]">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-sm text-[#003631]/60">Welcome back!</p>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigation("/my-profile")}
                  className="w-full text-left py-3 px-4 hover:bg-[#FFEDA8]/10 rounded-sm transition-colors duration-200 text-[#003631] text-sm"
                >
                  My Profile
                </button>
                <button
                  onClick={() => handleNavigation("/my-orders")}
                  className="w-full text-left py-3 px-4 hover:bg-[#FFEDA8]/10 rounded-sm transition-colors duration-200 text-[#003631] text-sm"
                >
                  My Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 px-4 hover:bg-[#FFEDA8]/10 rounded-sm transition-colors duration-200 text-[#003631] text-sm flex items-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="p-4 border-t border-[#FFEDA8]/10">
                <button
                  onClick={() => handleNavigation("/login")}
                  className="w-full py-3 bg-[#003631] text-[#FFEDA8] font-light rounded-sm hover:bg-[#003631]/90 transition-all duration-300 shadow-lg hover:shadow-xl tracking-wide"
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