import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Navbar from "../Component/Navbar";
import { toast } from "react-toastify";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaBolt, FaArrowLeft } from "react-icons/fa";
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

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleBuyNow = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }
    
    // Pass cart data to checkout page
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
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:hidden">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaArrowLeft />
                <span>Back</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Cart</h1>
              <div className="w-10"></div> {/* Spacer for balance */}
            </div>
            
            <h1 className="hidden sm:block text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Shopping Cart
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow-sm mx-2 sm:mx-0">
              <FaShoppingBag className="text-gray-300 text-5xl sm:text-6xl mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-3 sm:mb-4">
                Your cart is empty
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">
                Add some beautiful timepieces to your cart
              </p>
              <button 
                onClick={() => navigate("/shop")}
                className="bg-yellow-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300 text-sm sm:text-base"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 gap-4 sm:gap-0"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg sm:rounded-xl shadow-sm flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 truncate">
                            {item.name}
                          </h3>
                          <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-900">
                            ${item.price}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Row - Quantity and Remove */}
                      <div className="flex items-center justify-between sm:hidden">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                          >
                            <FaMinus className="text-gray-600 text-xs" />
                          </button>
                          <span className="text-base font-semibold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                          >
                            <FaPlus className="text-gray-600 text-xs" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-base font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(item)}
                          className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                          title="Remove item"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>

                      {/* Desktop Row - Quantity, Total, and Remove */}
                      <div className="hidden sm:flex items-center gap-4 lg:gap-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 lg:gap-4">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                          >
                            <FaMinus className="text-gray-600 text-sm" />
                          </button>
                          <span className="text-base lg:text-lg font-semibold w-6 lg:w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                          >
                            <FaPlus className="text-gray-600 text-sm" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right w-24 lg:w-32">
                          <p className="text-base lg:text-lg font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-500 hidden lg:block">
                            ${item.price} × {item.quantity}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(item)}
                          className="w-9 h-9 lg:w-10 lg:h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                          title="Remove item"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:w-96">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 sticky top-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="text-xl sm:text-2xl font-light text-gray-900">Order Summary</h3>
                    <button
                      onClick={handleClearCart}
                      className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                    >
                      <FaTrash />
                      Clear Cart
                    </button>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                      <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
                      <span className="text-sm sm:text-base text-gray-900 font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                      <span className="text-sm sm:text-base text-gray-600">Shipping</span>
                      <span className="text-green-600 font-semibold text-sm sm:text-base">FREE</span>
                    </div>
                    <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                      <span className="text-sm sm:text-base text-gray-600">Tax (8%)</span>
                      <span className="text-sm sm:text-base text-gray-900 font-semibold">
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 sm:py-3">
                      <span className="text-lg sm:text-xl font-light text-gray-900">Total</span>
                      <span className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <button
                      onClick={handleBuyNow}
                      className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black py-3 sm:py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg shadow-lg hover:shadow-yellow-500/25"
                    >
                      <FaBolt />
                      Buy Now - ${total.toFixed(2)}
                    </button>
                    <button
                      onClick={() => navigate("/shop")}
                      className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors duration-300 text-sm sm:text-base"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  {/* Mobile Quick Actions */}
                  <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate("/shop")}
                        className="flex-1 text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        ← Back to Shop
                      </button>
                      <button
                        onClick={() => navigate("/wishlist")}
                        className="flex-1 text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Wishlist →
                      </button>
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