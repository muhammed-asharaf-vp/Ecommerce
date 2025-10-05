// src/Pages/OrderConfirmation.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import { 
  FaCheckCircle, 
  FaDownload, 
  FaEnvelope, 
  FaTruck, 
  FaShieldAlt,
  FaHome,
  FaShoppingBag,
  FaStar,
  FaWhatsapp,
  FaAward,
  FaGem,
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBox,
  FaHeadset
} from "react-icons/fa";
import { toast } from "react-toastify";

function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderData = location.state || {};
  
  const [orderDetails, setOrderDetails] = useState({
    orderId: `VEL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    orderDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }),
    items: orderData.cartItems || [],
    shipping: orderData.shippingInfo || {
      name: "Your Name",
      address: "Your Address",
      city: "Your City",
      country: "Your Country"
    },
    payment: {
      method: orderData.paymentMethod || "Credit Card",
      subtotal: orderData.subtotal || 0,
      shipping: 0.00,
      grandTotal: orderData.total || 0
    }
  });

  useEffect(() => {
    if (orderData.cartItems && orderData.cartItems.length > 0) {
      const subtotal = orderData.cartItems.reduce((acc, item) => 
        acc + (item.price * item.quantity), 0
      );
      const grandTotal = subtotal;

      setOrderDetails(prev => ({
        ...prev,
        items: orderData.cartItems,
        payment: {
          ...prev.payment,
          subtotal: subtotal,
          grandTotal: grandTotal
        }
      }));
    }
  }, [orderData.cartItems]);

  const handleDownloadInvoice = () => {
    toast.success("📄 Generating your luxury invoice...");
    setTimeout(() => {
      toast.success("✅ Invoice ready for download!");
    }, 2000);
  };

  const handleTrackOrder = () => {
    toast.info("🛰️ Tracking will activate once your order ships!");
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Premium Header Section */}
          <div className="text-center mb-16 relative">
            {/* Animated Success Icon */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-300/50 border-4 border-white">
                <FaCheckCircle className="text-white text-4xl" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <FaGem className="text-white text-sm" />
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4 mb-8">
              <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 tracking-tight">
               Order Confirmed
              </h1>
              <div className="w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Your Veloce timepiece is being prepared with exceptional care
              </p>
            </div>

            {/* Order Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/90 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl border border-gray-200/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Order #</span>
                </div>
                <span className="text-2xl font-mono font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {orderDetails.orderId}
                </span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
              <div className="text-sm text-gray-500 font-medium">
                {orderDetails.orderDate}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-16">
            {/* Left Column - Order Details */}
            <div className="xl:col-span-8 space-y-8">
              {/* Luxury Order Summary Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-serif font-light text-white flex items-center gap-3">
                      <FaAward className="text-yellow-300" />
                      Your Curated Collection
                    </h2>
                    <span className="text-yellow-300 text-sm font-semibold bg-yellow-500/20 px-3 py-1 rounded-full">
                      {orderDetails.items.length} ITEM{orderDetails.items.length !== 1 ? 'S' : ''}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    {orderDetails.items.length > 0 ? (
                      orderDetails.items.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center gap-6 p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-500 group hover:border-amber-200/50"
                        >
                          <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-xl flex items-center justify-center shadow-inner border border-amber-200/30">
                              <img
                                src={item.images?.[0] || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md border border-amber-200">
                              <span className="text-white text-xs font-bold">{item.quantity}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-serif font-light text-gray-900 mb-1 truncate">
                              {item.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">Swiss Craftsmanship</p>
                            <div className="flex items-center gap-2">
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className="w-3 h-3 fill-current" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400">Luxury Grade</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xl font-serif font-light text-gray-900 mb-1">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-400 font-mono">
                              ${item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <FaBox className="text-gray-300 text-5xl mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Your collection awaits</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery & Payment Info Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Delivery Information */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
                    <h3 className="text-lg font-serif font-light text-white flex items-center gap-2">
                      <FaTruck className="text-blue-200" />
                      Delivery Details
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide text-gray-500">
                          Shipping Address
                        </h4>
                        <div className="bg-blue-50/50 rounded-xl p-4 space-y-2 text-sm">
                          <p className="text-gray-900 font-medium">{orderDetails.shipping.name}</p>
                          <p className="text-gray-700">{orderDetails.shipping.address}</p>
                          <p className="text-gray-700">{orderDetails.shipping.city}</p>
                          <p className="text-gray-600">{orderDetails.shipping.country}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide text-gray-500">
                          Estimated Delivery
                        </h4>
                        <div className="bg-green-50/50 rounded-xl p-4">
                          <p className="text-lg font-serif font-light text-gray-900">
                            {orderDetails.estimatedDelivery}
                          </p>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            <FaClock className="w-3 h-3" />
                            Express shipping • Fully insured
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
                    <h3 className="text-lg font-serif font-light text-white flex items-center gap-2">
                      <FaCreditCard className="text-emerald-200" />
                      Payment Summary
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900 font-semibold">${orderDetails.payment.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-gray-100">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-600 font-semibold">COMPLIMENTARY</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <span className="text-lg font-serif font-light text-gray-900">Total</span>
                        <span className="text-2xl font-serif font-light text-gray-900">
                          ${orderDetails.payment.grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-amber-50/50 rounded-xl border border-amber-200/50">
                      <div className="flex items-center gap-2 text-sm">
                        <FaShieldAlt className="text-amber-500 flex-shrink-0" />
                        <span className="text-amber-700">
                          <strong>Payment Method:</strong> {orderDetails.payment.method}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Support */}
            <div className="xl:col-span-4 space-y-8">
              {/* Quick Actions */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8">
                <h2 className="text-2xl font-serif font-light text-gray-900 mb-6 text-center">
                  Next Steps
                </h2>
                
                <div className="space-y-4">
                  <button
                    onClick={handleDownloadInvoice}
                    className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-4 rounded-2xl font-semibold hover:from-slate-800 hover:to-slate-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 border border-slate-600/20"
                  >
                    <FaDownload className="text-amber-300" />
                    Download Invoice
                  </button>
                  
                  <button
                    onClick={handleTrackOrder}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 border border-amber-400/20"
                  >
                    <FaTruck />
                    Track Your Order
                  </button>
                  
                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-white text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300"
                  >
                    <FaShoppingBag />
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Veloce Concierge */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl border border-slate-700/50">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaHeadset className="text-white text-2xl" />
                  </div>
                  <h3 className="font-serif text-xl font-light mb-2">Veloce Concierge</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Dedicated support for your luxury experience
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-xl">
                    <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                      <FaWhatsapp className="text-green-300 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Instant Chat</p>
                      <p className="text-slate-300 text-xs">+1 (888) VELOCE-1</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-xl">
                    <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-blue-300 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Email Support</p>
                      <p className="text-slate-300 text-xs">concierge@veloce.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-6">
                <h3 className="font-serif text-lg font-light text-gray-900 mb-4 text-center">
                  Order Timeline
                </h3>
                <div className="space-y-3">
                  {[
                    { status: 'Order Confirmed', active: true, time: 'Now' },
                    { status: 'Quality Check', active: false, time: 'Next' },
                    { status: 'Ready to Ship', active: false, time: '1-2 days' },
                    { status: 'Out for Delivery', active: false, time: '2-3 days' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        step.active 
                          ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30' 
                          : 'bg-gray-200 border-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          step.active ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.status}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">{step.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Guarantee Section */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50/30 rounded-3xl shadow-2xl border border-amber-200/50 p-12 text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-light text-gray-900 mb-6">
                The Veloce Promise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: FaShieldAlt,
                    title: "Authenticity Guaranteed",
                    description: "Every timepiece is 100% authentic with certification"
                  },
                  {
                    icon: FaAward,
                    title: "Lifetime Service",
                    description: "Comprehensive after-sales support and maintenance"
                  },
                  {
                    icon: FaStar,
                    title: "White Glove Experience",
                    description: "Premium packaging and personalized delivery"
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <feature.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Return Home CTA */}
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-3 bg-white text-gray-700 hover:text-gray-900 font-semibold text-lg transition-all duration-300 group cursor-pointer px-8 py-4 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-amber-200 hover:bg-amber-50/30"
            >
              <FaHome className="transition-transform duration-300 group-hover:scale-110" />
              Return to Veloce Atelier
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderConfirmation;