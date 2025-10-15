import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Component/Navbar";
import { toast } from "react-toastify";
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

function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [touchDevice, setTouchDevice] = useState(false); 
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(isTouchDevice());
  }, []);

  const handleDownloadInvoice = () => {
    toast.success("📄 Generating your luxury invoice...");
    setTimeout(() => {
      toast.success("✅ Invoice ready for download!");
    }, 3000);
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
      <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full mb-6 border border-[#FFEDA8]/20">
              <div className="w-2 h-2 bg-[#FFEDA8] rounded-full animate-pulse"></div>
              <span className="text-sm font-light tracking-widest text-[#FFEDA8]">
                ORDER CONFIRMED
              </span>
            </div>

            {/* Main Title */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mr-4 border border-[#FFEDA8]/20">
                <FaAward className="text-[#FFEDA8] text-xl" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl lg:text-3xl font-light text-white">Order Confirmed</h1>
                <p className="text-gray-300 text-sm mt-1">Your Veloce timepiece is being prepared with exceptional care</p>
              </div>
            </div>

            {/* Order Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#002822]/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 mt-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">Order #</span>
                </div>
                <span className="text-lg font-mono font-medium text-white">
                  {orderDetails.orderId}
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/20"></div>
              <div className="text-sm text-gray-300">
                {orderDetails.orderDate}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-12">
            {/* Left Column - Order Details */}
            <div className="xl:col-span-8 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <div className="bg-[#003631] px-6 py-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-light text-white flex items-center gap-3">
                      <FaBox className="text-[#FFEDA8]" />
                      Your Collection
                    </h2>
                    <span className="text-[#FFEDA8] text-xs font-medium bg-[#FFEDA8]/10 px-3 py-1 rounded-full border border-[#FFEDA8]/20">
                      {orderDetails.items.length} ITEM{orderDetails.items.length !== 1 ? 'S' : ''}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {orderDetails.items.length > 0 ? (
                      orderDetails.items.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center gap-4 p-4 bg-[#003631]/50 rounded-lg border border-white/10 hover:border-[#FFEDA8]/30 transition-all duration-300"
                        >
                          <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 bg-[#003631] rounded-lg flex items-center justify-center border border-white/10">
                              <img
                                src={item.images?.[0] || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded"
                              />
                            </div>
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#FFEDA8] rounded-full flex items-center justify-center border border-[#002822]">
                              <span className="text-[#003631] text-xs font-bold">{item.quantity}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white text-sm mb-1">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 text-xs mb-2">Swiss Craftsmanship</p>
                            <div className="flex items-center gap-2">
                              <div className="flex text-[#FFEDA8]">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className="w-3 h-3 fill-current" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400">Luxury Grade</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-light text-[#FFEDA8] mb-1">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-gray-400 text-xs font-mono">
                              ${item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <FaBox className="text-gray-400 text-3xl mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">Your collection awaits</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery & Payment Info Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Delivery Information */}
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                  <div className="bg-[#003631] px-4 py-3 border-b border-white/10">
                    <h3 className="text-base font-light text-white flex items-center gap-2">
                      <FaTruck className="text-[#FFEDA8]" />
                      Delivery Details
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2 text-xs uppercase tracking-wide">
                          Shipping Address
                        </h4>
                        <div className="bg-[#003631]/50 rounded-lg p-3 space-y-1 text-sm">
                          <p className="text-white font-medium">{orderDetails.shipping.name}</p>
                          <p className="text-gray-300">{orderDetails.shipping.address}</p>
                          <p className="text-gray-300">{orderDetails.shipping.city}</p>
                          <p className="text-gray-400">{orderDetails.shipping.country}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2 text-xs uppercase tracking-wide">
                          Estimated Delivery
                        </h4>
                        <div className="bg-[#003631]/50 rounded-lg p-3">
                          <p className="text-base font-light text-white">
                            {orderDetails.estimatedDelivery}
                          </p>
                          <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                            <FaClock className="w-3 h-3" />
                            Express shipping • Fully insured
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                  <div className="bg-[#003631] px-4 py-3 border-b border-white/10">
                    <h3 className="text-base font-light text-white flex items-center gap-2">
                      <FaCreditCard className="text-[#FFEDA8]" />
                      Payment Summary
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-300 text-sm">Subtotal</span>
                        <span className="text-white text-sm">${orderDetails.payment.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-t border-white/10">
                        <span className="text-gray-300 text-sm">Shipping</span>
                        <span className="text-[#FFEDA8] text-sm">COMPLIMENTARY</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <span className="text-base font-light text-white">Total</span>
                        <span className="text-lg font-light text-[#FFEDA8]">
                          ${orderDetails.payment.grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-[#FFEDA8]/10 rounded-lg border border-[#FFEDA8]/20">
                      <div className="flex items-center gap-2 text-xs">
                        <FaShieldAlt className="text-[#FFEDA8] flex-shrink-0" />
                        <span className="text-[#FFEDA8]">
                          <strong>Payment Method:</strong> {orderDetails.payment.method}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Support */}
            <div className="xl:col-span-4 space-y-6">
              {/* Quick Actions */}
              <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h2 className="text-lg font-light text-white mb-4 text-center">
                  Next Steps
                </h2>
                
                <div className="space-y-3">
                  <button
                    onClick={handleDownloadInvoice}
                    className="w-full bg-[#FFEDA8] text-[#003631] py-3 rounded-lg font-medium hover:bg-[#FFEDA8]/90 transition-all duration-300 flex items-center justify-center gap-3 border border-[#FFEDA8]"
                  >
                    <FaDownload />
                    Download Invoice
                  </button>
                  
                  <button
                    onClick={handleTrackOrder}
                    className="w-full bg-[#003631] text-white py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 border border-white/10 hover:border-[#FFEDA8]/30"
                  >
                    <FaTruck />
                    Track Your Order
                  </button>
                  
                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-transparent border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FaShoppingBag />
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Veloce Concierge */}
              <div className="bg-[#003631] rounded-xl p-6 text-white border border-white/10">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-lg flex items-center justify-center mx-auto mb-3 border border-[#FFEDA8]/20">
                    <FaHeadset className="text-[#FFEDA8] text-lg" />
                  </div>
                  <h3 className="font-light text-white mb-1">Veloce Concierge</h3>
                  <p className="text-gray-300 text-xs">
                    Dedicated support for your luxury experience
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-[#002822] rounded-lg">
                    <div className="w-8 h-8 bg-[#FFEDA8]/10 rounded flex items-center justify-center">
                      <FaWhatsapp className="text-[#FFEDA8] text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-xs">Instant Chat</p>
                      <p className="text-gray-300 text-xs">+1 (888) VELOCE-1</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 bg-[#002822] rounded-lg">
                    <div className="w-8 h-8 bg-[#FFEDA8]/10 rounded flex items-center justify-center">
                      <FaEnvelope className="text-[#FFEDA8] text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-xs">Email Support</p>
                      <p className="text-gray-300 text-xs">concierge@veloce.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <h3 className="font-light text-white mb-3 text-center text-sm">
                  Order Timeline
                </h3>
                <div className="space-y-2">
                  {[
                    { status: 'Order Confirmed', active: true, time: 'Now' },
                    { status: 'Quality Check', active: false, time: 'Next' },
                    { status: 'Ready to Ship', active: false, time: '1-2 days' },
                    { status: 'Out for Delivery', active: false, time: '2-3 days' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full border ${
                        step.active 
                          ? 'bg-[#FFEDA8] border-[#FFEDA8]' 
                          : 'bg-gray-500 border-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className={`text-xs font-medium ${
                          step.active ? 'text-white' : 'text-gray-400'
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

          {/* Veloce Promise Section */}
          <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-[#FFEDA8]/20 p-8 text-center mb-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-light text-white mb-6">
                The Veloce Promise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-lg flex items-center justify-center mx-auto mb-3 border border-[#FFEDA8]/20">
                      <feature.icon className="text-[#FFEDA8] text-lg" />
                    </div>
                    <h3 className="font-medium text-white mb-2 text-sm">{feature.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Return Home CTA */}
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white hover:bg-white/5 font-medium transition-all duration-300 px-6 py-3 rounded-lg text-sm"
            >
              <FaHome />
              Return to Veloce Atelier
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderConfirmation;