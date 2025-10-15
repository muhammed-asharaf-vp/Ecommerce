import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import Navbar from "../Component/Navbar";
import { toast } from "react-toastify";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);
  
  const navigate = useNavigate();
  const [touchDevice, setTouchDevice] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(isTouchDevice());
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }
    
    navigate("/payment", { 
      state: { 
        cartItems: cart,
        subtotal: subtotal,
        tax: tax,
        total: total
      } 
    });
  };

  const handleClearCart = () => {
    if (cart.length === 0) {
      toast.info("Your cart is already empty!");
      return;
    }

    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      clearCart();
      toast.success("Cart cleared successfully!");
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    toast.info(`"${item.name}" removed from cart`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            {/* Mobile Back Button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-300 hover:text-[#FFEDA8] transition-colors px-4 py-2 rounded-lg border border-white/10 hover:border-[#FFEDA8]/30"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Back</span>
              </button>
              <div className="w-8"></div>
            </div>

            {/* Page Title */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full mb-6 border border-[#FFEDA8]/20">
                <div className="w-2 h-2 bg-[#FFEDA8] rounded-full animate-pulse"></div>
                <span className="text-sm font-light tracking-widest text-[#FFEDA8]">
                  SHOPPING CART
                </span>
              </div>

              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mr-4 border border-[#FFEDA8]/20">
                  <FaShoppingBag className="text-[#FFEDA8] text-xl" />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl lg:text-3xl font-light text-white">Shopping Cart</h1>
                  <p className="text-gray-300 text-sm mt-1">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your collection
                  </p>
                </div>
              </div>
            </div>
          </div>

          {cart.length === 0 ? (
            /* Empty State */
            <div className="max-w-md mx-auto text-center">
              <div className="bg-[#002822]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-20 h-20 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FFEDA8]/20">
                  <FaShoppingBag className="text-[#FFEDA8] text-2xl" />
                </div>
                <h3 className="text-xl font-light text-white mb-3">Your cart is empty</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  Discover our exclusive collection of luxury timepieces and start building your collection.
                </p>
                <button 
                  onClick={() => navigate("/shop")}
                  className="w-full bg-[#FFEDA8] text-[#003631] py-3 px-6 rounded-lg font-medium hover:bg-[#FFEDA8]/90 transition-colors duration-300 border border-[#FFEDA8]"
                >
                  Browse Collection
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items Section */}
              <div className="flex-1">
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                  {/* Cart Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-light text-white">Cart Items</h2>
                      <span className="text-sm text-gray-300">
                        {cart.length} items
                      </span>
                    </div>
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-white/10">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 hover:bg-white/5 transition-colors duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.images?.[0]}
                              alt={item.name}
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-white/10"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-normal text-white mb-2 line-clamp-2">
                              {item.name}
                            </h3>
                            
                            {/* Brand and Category */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {item.brand && (
                                <span className="text-xs font-medium text-[#FFEDA8] bg-[#FFEDA8]/10 px-2 py-1 rounded border border-[#FFEDA8]/20">
                                  {item.brand}
                                </span>
                              )}
                              {item.category && (
                                <span className="text-xs font-medium text-gray-300 bg-[#003631] px-2 py-1 rounded border border-[#003631]">
                                  {item.category}
                                </span>
                              )}
                            </div>

                            {/* Price */}
                            <p className="text-xl font-light text-[#FFEDA8]">
                              ${item.price?.toLocaleString()}
                            </p>
                          </div>

                          {/* Quantity Controls and Actions */}
                          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => decreaseQuantity(item.id)}
                                className="w-9 h-9 bg-[#003631] border border-white/10 hover:border-[#FFEDA8]/30 rounded-lg flex items-center justify-center transition-all duration-300 text-gray-300 hover:text-white"
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <span className="text-base font-medium text-white w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQuantity(item.id)}
                                className="w-9 h-9 bg-[#003631] border border-white/10 hover:border-[#FFEDA8]/30 rounded-lg flex items-center justify-center transition-all duration-300 text-gray-300 hover:text-white"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <p className="text-lg font-light text-[#FFEDA8]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <button 
                              onClick={() => handleRemoveItem(item)}
                              className="w-9 h-9 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:border-red-500 text-red-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                              title="Remove item"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="lg:w-96">
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-light text-white mb-4">Order Summary</h3>
                    
                    {/* Summary Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-300">Subtotal</span>
                        <span className="text-white font-medium">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-300">Shipping</span>
                        <span className="text-[#FFEDA8] font-medium">FREE</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-300">Tax (8%)</span>
                        <span className="text-white font-medium">
                          ${tax.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="border-t border-white/10 pt-3 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-light text-white">Total</span>
                          <span className="text-2xl font-light text-[#FFEDA8]">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#FFEDA8] text-[#003631] py-3 rounded-lg font-medium hover:bg-[#FFEDA8]/90 transition-all duration-300 border border-[#FFEDA8]"
                    >
                      Proceed to Checkout
                    </button>
                    
                    <button
                      onClick={handleClearCart}
                      className="w-full bg-red-500/10 text-red-400 py-3 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 hover:border-red-500 flex items-center justify-center gap-2"
                    >
                      <FaTrash />
                      Clear Cart
                    </button>
                    
                    <button
                      onClick={() => navigate("/shop")}
                      className="w-full bg-transparent border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/5 transition-all duration-300"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">
                        Free worldwide shipping • 30-day returns • Secure checkout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;