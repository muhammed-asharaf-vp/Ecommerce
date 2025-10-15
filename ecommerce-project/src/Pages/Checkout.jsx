import React, { useState, useContext, useEffect } from "react";
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
  FaExclamationTriangle,
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaGlobe
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

    const processingToast = toast.info("🔄 Processing your payment...", {
      autoClose: false,
      closeButton: false
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const isSuccess = paymentMethod === "credit";
      
      if (isSuccess) {
        toast.dismiss(processingToast);
        toast.success("🎉 Payment Successful! Your order is confirmed.", {
          autoClose: 3000
        });

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
          toast.error("❌ Failed to create order. Please try again.");
          setIsProcessing(false);
        }
        
      } else {
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
      toast.dismiss(processingToast);
      toast.error("❌ An error occurred during payment processing. Please try again.");
      setIsProcessing(false);
    }
  };

  // if (cart.length === 0) {
  //   return (
  //     <>
  //       <Navbar />
  //       <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822] flex items-center justify-center">
  //         <div className="text-center">
  //           <div className="w-24 h-24 bg-[#002822]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#FFEDA8]/20">
  //             <FaExclamationTriangle className="text-3xl text-[#FFEDA8]" />
  //           </div>
  //           <h2 className="text-xl font-light text-white mb-4">Your cart is empty</h2>
  //           <button 
  //             onClick={() => navigate("/shop")}
  //             className="bg-[#FFEDA8] text-[#003631] px-6 py-3 rounded-lg hover:bg-[#FFEDA8]/90 transition-colors font-medium border border-[#FFEDA8]"
  //           >
  //             Continue Shopping
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full mb-6 border border-[#FFEDA8]/20">
              <div className="w-2 h-2 bg-[#FFEDA8] rounded-full animate-pulse"></div>
              <span className="text-sm font-light tracking-widest text-[#FFEDA8]">
                SECURE CHECKOUT
              </span>
            </div>

            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mr-4 border border-[#FFEDA8]/20">
                <FaLock className="text-[#FFEDA8] text-xl" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl lg:text-3xl font-light text-white">Secure Checkout</h1>
                <p className="text-gray-300 text-sm mt-1">Complete your purchase with confidence</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Payment Form */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h2 className="text-lg font-light text-white mb-4 flex items-center gap-3">
                    <FaEnvelope className="text-[#FFEDA8]" />
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h2 className="text-lg font-light text-white mb-4 flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#FFEDA8]" />
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name *"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address *"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="md:col-span-2 px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code *"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="md:col-span-2 px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                      required
                      disabled={isProcessing}
                    >
                
                      <option value="" className="text-gray-400">Select Country *</option>
                            <option value="AU" className="text-gray-800">India</option>
                      <option value="US" className="text-gray-800">United States</option>
                      <option value="UK" className="text-gray-800">United Kingdom</option>
                      <option value="CA" className="text-gray-800">Canada</option>
                      <option value="AU" className="text-gray-800">Australia</option>
                      

                    </select>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h2 className="text-lg font-light text-white mb-4 flex items-center gap-3">
                    <FaCreditCard className="text-[#FFEDA8]" />
                    Payment Method
                  </h2>
                  
                  {/* Payment Options */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("credit")}
                      disabled={isProcessing}
                      className={`p-4 border rounded-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                        paymentMethod === "credit" 
                          ? "border-[#FFEDA8] bg-[#FFEDA8]/10 shadow-md" 
                          : "border-white/10 hover:border-[#FFEDA8]/30"
                      } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <FaCreditCard className={paymentMethod === "credit" ? "text-[#FFEDA8]" : "text-gray-400"} />
                      <span className={paymentMethod === "credit" ? "text-[#FFEDA8]" : "text-gray-300"}>Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      disabled={isProcessing}
                      className={`p-4 border rounded-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                        paymentMethod === "paypal" 
                          ? "border-[#FFEDA8] bg-[#FFEDA8]/10 shadow-md" 
                          : "border-white/10 hover:border-[#FFEDA8]/30"
                      } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <FaPaypal className={paymentMethod === "paypal" ? "text-[#FFEDA8]" : "text-gray-400"} />
                      <span className={paymentMethod === "paypal" ? "text-[#FFEDA8]" : "text-gray-300"}>PayPal</span>
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
                        className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                        disabled={isProcessing}
                      />
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card number * (4242 4242 4242 4242)"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength="19"
                        className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
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
                          className="px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                          disabled={isProcessing}
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV *"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength="4"
                          className="px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400 transition-all duration-300"
                          disabled={isProcessing}
                        />
                      </div>
                    </div>
                  )}

                  {/* Security Badge */}
                  <div className="flex items-center gap-3 mt-6 p-4 bg-[#FFEDA8]/10 rounded-lg border border-[#FFEDA8]/20">
                    <FaShieldAlt className="text-[#FFEDA8] text-lg" />
                    <div>
                      <p className="text-[#FFEDA8] font-medium text-sm">Secure Payment</p>
                      <p className="text-gray-300 text-xs">Your payment information is encrypted</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-8">
                  <h2 className="text-lg font-light text-white mb-6">Order Summary</h2>
                  
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-white/10">
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-white/10"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-white text-sm">{item.name}</h3>
                          <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-[#FFEDA8]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Subtotal</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Shipping</span>
                      <span className="text-[#FFEDA8]">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Tax</span>
                      <span className="text-white">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-light pt-3 border-t border-white/10">
                      <span className="text-white">Total</span>
                      <span className="text-xl text-[#FFEDA8]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Purchase Protection */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-4 bg-[#FFEDA8]/10 rounded-lg border border-[#FFEDA8]/20">
                      <FaTruck className="text-[#FFEDA8]" />
                      <div>
                        <p className="text-[#FFEDA8] font-medium text-sm">Free Express Shipping</p>
                        <p className="text-gray-300 text-xs">2-3 business days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-[#FFEDA8]/10 rounded-lg border border-[#FFEDA8]/20">
                      <FaUndo className="text-[#FFEDA8]" />
                      <div>
                        <p className="text-[#FFEDA8] font-medium text-sm">30-Day Returns</p>
                        <p className="text-gray-300 text-xs">No questions asked</p>
                      </div>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 border ${
                      isProcessing 
                        ? "bg-gray-500/20 text-gray-400 border-gray-500/30 cursor-not-allowed" 
                        : "bg-[#FFEDA8] text-[#003631] border-[#FFEDA8] hover:bg-[#FFEDA8]/90"
                    }`}
                  >
                    <FaLock />
                    {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </button>

                  <p className="text-center text-gray-400 text-xs mt-4">
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