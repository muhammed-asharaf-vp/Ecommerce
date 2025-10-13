
import React, { useState, useContext,useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Component/Navbar";
import { toast } from "react-toastify";
import { 
  FaLock, 
  FaCreditCard, 
  FaPaypal, 
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaExclamationTriangle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart, createOrder } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
    const [touchDevice, setTouchDevice] = useState(false);


  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Detect touch device
  useEffect(() => {
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(isTouchDevice());
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setFormData({
      ...formData,
      cardNumber: value
    });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    setFormData({
      ...formData,
      expiryDate: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to complete your purchase");
      navigate("/login");
      return;
    }
    
    if (isProcessing) return;

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.zipCode || !formData.country) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "credit") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.nameOnCard) {
        toast.error("Please fill in all payment details");
        return;
      }
      
      // Validate card number (basic check)
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
      if (cleanCardNumber.length !== 16 || !/^\d+$/.test(cleanCardNumber)) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      
      // Validate expiry date
      if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        toast.error("Please enter a valid expiry date (MM/YY)");
        return;
      }
      
      // Validate CVV
      if (formData.cvv.length < 3 || formData.cvv.length > 4 || !/^\d+$/.test(formData.cvv)) {
        toast.error("Please enter a valid CVV (3-4 digits)");
        return;
      }
    }

    // Start payment processing
    setIsProcessing(true);
    
    // Show processing toast
    const processingToast = toast.info("🔄 Processing your payment...", {
      autoClose: false,
      closeButton: false
    });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      //  UPDATED: Credit Card always succeeds, PayPal always fails
      const isSuccess = paymentMethod === "credit";
      
      if (isSuccess) {
        // Payment successful - Credit Card
        toast.dismiss(processingToast);
        toast.success("🎉 Payment Successful! Your order is confirmed.", {
          autoClose: 3000
        });

        // Create order in database
        const orderSuccess = await createOrder({
          cartItems: cart,
          subtotal: subtotal,
          tax: tax,
          total: total,
          shippingInfo: {
            name: `${formData.firstName} ${formData.lastName}`,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            zipCode: formData.zipCode
          },
          paymentMethod: "Credit Card"
        });

        if (orderSuccess) {
          // Navigate to confirmation page with order data
          setTimeout(() => {
            navigate("/confirm-order", { 
              state: { 
                cartItems: cart,
                subtotal: subtotal,
                tax: tax,
                total: total,
                shippingInfo: {
                  name: `${formData.firstName} ${formData.lastName}`,
                  address: formData.address,
                  city: formData.city,
                  country: formData.country
                },
                paymentMethod: "Credit Card"
              } 
            });
          }, 2000);
        } else {
          // If order creation failed
          toast.error("❌ Failed to create order. Please try again.");
          setIsProcessing(false);
        }
        
      } else {
        // Payment failed - PayPal
        toast.dismiss(processingToast);
        toast.error(
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="text-red-500" />
            <span>PayPal payment failed. Please use Credit Card for demo.</span>
          </div>, 
          {
            autoClose: 6000,
            closeButton: true
          }
        );
        setIsProcessing(false);
      }
      
    } catch (error) {
      // Handle any errors
      toast.dismiss(processingToast);
      toast.error("❌ An error occurred during payment processing. Please try again.");
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <button 
              onClick={() => navigate("/products")}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaLock className="text-yellow-600 text-2xl mr-3" />
              <h1 className="text-4xl font-serif font-light text-gray-900">Secure Payment</h1>
            </div>
            <p className="text-gray-600">Complete your purchase with confidence</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Payment Form */}
              <div className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-light text-gray-900 mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-light text-gray-900 mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name *"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address *"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code *"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    >
                      <option value="">Select Country *</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-light text-gray-900 mb-6">Payment Method</h2>
                  
                  {/* Payment Options */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("credit")}
                      disabled={isProcessing}
                      className={`p-4 border-2 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${
                        paymentMethod === "credit" 
                          ? "border-yellow-600 bg-yellow-50 shadow-md" 
                          : "border-gray-300 hover:border-gray-400"
                      } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <FaCreditCard className="text-gray-700" />
                      <span>Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      disabled={isProcessing}
                      className={`p-4 border-2 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${
                        paymentMethod === "paypal" 
                          ? "border-yellow-600 bg-yellow-50 shadow-md" 
                          : "border-gray-300 hover:border-gray-400"
                      } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <FaPaypal className="text-blue-600" />
                      <span>PayPal</span>
                    </button>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === "credit" && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="nameOnCard"
                        placeholder="Name on card *"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                        disabled={isProcessing}
                      />
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card number * (4242 4242 4242 4242)"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength="19"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                        disabled={isProcessing}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY *"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          maxLength="5"
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                          disabled={isProcessing}
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV *"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength="4"
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-300"
                          disabled={isProcessing}
                        />
                      </div>
                    </div>
                  )}

                  {/* Security Badge */}
                  <div className="flex items-center gap-3 mt-6 p-4 bg-green-50 rounded-xl">
                    <FaShieldAlt className="text-green-600 text-xl" />
                    <div>
                      <p className="text-green-800 font-semibold">Secure Payment</p>
                      <p className="text-green-600 text-sm">Your payment information is encrypted</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-8">
                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                  <h2 className="text-2xl font-serif font-light text-gray-900 mb-6">Order Summary</h2>
                  
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100">
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-2xl text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Purchase Protection */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <FaTruck className="text-blue-600" />
                      <div>
                        <p className="text-blue-800 font-semibold">Free Express Shipping</p>
                        <p className="text-blue-600 text-sm">2-3 business days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                      <FaUndo className="text-purple-600" />
                      <div>
                        <p className="text-purple-800 font-semibold">30-Day Returns</p>
                        <p className="text-purple-600 text-sm">No questions asked</p>
                      </div>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg ${
                      isProcessing 
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
                        : "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 hover:shadow-green-500/25"
                    }`}
                  >
                    <FaLock />
                    {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </button>

                  <p className="text-center text-gray-500 text-sm mt-4">
                    By completing your purchase, you agree to our Terms of Service
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;