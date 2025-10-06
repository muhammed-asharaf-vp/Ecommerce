
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Navbar from "../Component/Navbar";
import { toast } from "react-toastify";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaBolt } from "react-icons/fa";
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-light text-gray-900 mb-4">Shopping Cart</h1>
            <p className="text-gray-600">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <FaShoppingBag className="text-gray-300 text-6xl mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-500 mb-4">Your cart is empty</h3>
              <p className="text-gray-400 mb-8">Add some beautiful timepieces to your cart</p>
              <button 
                onClick={() => navigate("/shop")}
                className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-6 flex-1">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl shadow-sm"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-2xl font-light text-gray-900">${item.price}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mr-8">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right mr-8">
                      <p className="text-lg font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => handleRemoveItem(item)}
                      className="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-light text-gray-900">Order Summary</h3>
                  <button
                    onClick={handleClearCart}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center gap-2"
                  >
                    <FaTrash />
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  {/* <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="text-gray-900 font-semibold">${tax.toFixed(2)}</span>
                  </div> */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-xl font-light text-gray-900">Total</span>
                    <span className="text-3xl font-light text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-yellow-500/25"
                  >
                    <FaBolt />
                    Buy Now - ${total.toFixed(2)}
                  </button>
                  <button
                    onClick={() => navigate("/shop")}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;