import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import {
  FaShoppingBag,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaStar,
  FaDownload,
  FaEye,
  FaUndo,
  FaCalendarAlt,
  FaCreditCard,
  FaShoppingCart,
  FaBox
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

function MyOrders() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 100
    });
  }, []);

  // Load user and orders from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    
    if (storedUser && storedUser.order) {
      setOrders(storedUser.order);
      
      // Refresh AOS after orders load
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }, []);

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  // Refresh AOS when filter or orders change
  useEffect(() => {
    AOS.refresh();
  }, [filter, orders]);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "shipped": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "delivered": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed": return FaCheckCircle;
      case "shipped": return FaTruck;
      case "delivered": return FaBox;
      case "cancelled": return FaUndo;
      default: return FaClock;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadInvoice = (order) => {
    toast.info("📄 Generating your luxury invoice...");
    
    setTimeout(() => {
      const invoiceContent = `
        VELOCE LUXURY WATCHES
        =====================
        
        INVOICE
        Order #: ${order.id}
        Date: ${formatDate(order.date)}
        
        SHIPPING ADDRESS:
        ${order.shipping?.name}
        ${order.shipping?.address}
        ${order.shipping?.city}, ${order.shipping?.country}
        ${order.shipping?.zipCode ? `ZIP: ${order.shipping.zipCode}` : ''}
        
        ORDER ITEMS:
        ${order.items?.map(item => `
          • ${item.name}
            Quantity: ${item.quantity}
            Price: $${item.price} each
            Total: $${(item.price * item.quantity).toFixed(2)}
        `).join('')}
        
        ORDER SUMMARY:
        Subtotal: $${order.payment?.subtotal?.toFixed(2) || '0.00'}
        Tax: $${order.payment?.tax?.toFixed(2) || '0.00'}
        Shipping: $${order.payment?.shipping?.toFixed(2) || '0.00'}
        Total: $${order.payment?.grandTotal?.toFixed(2) || '0.00'}
        
        Payment Method: ${order.payment?.method || 'Credit Card'}
        Order Status: ${order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Confirmed'}
        
        Thank you for your purchase!
        Veloce Luxury Watches
      `;

      const blob = new Blob([invoiceContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${order.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("✅ Invoice downloaded successfully!");
    }, 2000);
  };

  const handleViewDetails = (order) => {
    navigate("/confirm-order", { 
      state: { 
        cartItems: order.items,
        subtotal: order.payment?.subtotal,
        tax: order.payment?.tax,
        total: order.payment?.grandTotal,
        shippingInfo: order.shipping,
        paymentMethod: order.payment?.method
      } 
    });
  };

  const handleCancelOrder = (orderId) => {
    toast.info(
      <div>
        <p>Are you sure you want to cancel this order?</p>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => {
              toast.dismiss();
              confirmCancelOrder(orderId);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Yes, Cancel
          </button>
          <button 
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
          >
            No, Keep
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: true
      }
    );
  };

  const confirmCancelOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    );
    setOrders(updatedOrders);
    
    const updatedUser = { ...user, order: updatedOrders };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast.success("Order cancelled successfully!");
  };

  const handleRateProduct = (order) => {
    toast.info("⭐ Rating feature coming soon!");
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822] flex items-center justify-center">
          <div 
            className="text-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div 
              className="w-24 h-24 bg-[#002822]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#FFEDA8]/20"
              data-aos="pulse"
              data-aos-delay="400"
            >
              <FaShoppingBag className="text-3xl text-[#FFEDA8]" />
            </div>
            <h3 
              className="text-2xl font-light text-white mb-4"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Please Login
            </h3>
            <p 
              className="text-gray-300 max-w-sm mb-6"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              Sign in to view your order history
            </p>
            <button 
              onClick={() => navigate("/login")}
              className="bg-[#FFEDA8] text-[#003631] px-6 py-3 rounded-lg hover:bg-[#FFEDA8]/90 transition-colors font-medium border border-[#FFEDA8] transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="1000"
            >
              Sign In
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div 
            className="text-center mb-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div 
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full mb-6 border border-[#FFEDA8]/20"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <div className="w-2 h-2 bg-[#FFEDA8] rounded-full animate-pulse"></div>
              <span className="text-sm font-light tracking-widest text-[#FFEDA8]">
                ORDER HISTORY
              </span>
            </div>

            <div className="flex items-center justify-center mb-4">
              <div 
                className="w-12 h-12 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mr-4 border border-[#FFEDA8]/20"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <FaShoppingBag className="text-[#FFEDA8] text-xl" />
              </div>
              <div className="text-left">
                <h1 
                  className="text-2xl lg:text-3xl font-light text-white"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  My Orders
                </h1>
                <p 
                  className="text-gray-300 text-sm mt-1"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  Track and manage your luxury purchases
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8 items-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-light text-[#FFEDA8] mb-2">{orders.length}</div>
              <div className="text-gray-300 text-sm">Total Orders</div>
            </div>
            
            <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-light text-[#FFEDA8] mb-2">
                ${orders.reduce((total, order) => total + (order.payment?.grandTotal || 0), 0).toFixed(2)}
              </div>
              <div className="text-gray-300 text-sm">Total Spent</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div 
            className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-8"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Orders", count: orders.length },
                { id: "confirmed", label: "Confirmed", count: orders.filter(o => o.status === 'confirmed').length },
                { id: "shipped", label: "Shipped", count: orders.filter(o => o.status === 'shipped').length },
                { id: "delivered", label: "Delivered", count: orders.filter(o => o.status === 'delivered').length },
                { id: "cancelled", label: "Cancelled", count: orders.filter(o => o.status === 'cancelled').length }
              ].map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 border transform hover:scale-105 ${
                    filter === tab.id
                      ? "bg-[#FFEDA8] text-[#003631] border-[#FFEDA8]"
                      : "bg-[#003631] text-gray-300 border-white/10 hover:border-[#FFEDA8]/30"
                  }`}
                  data-aos="fade-right"
                  data-aos-delay={800 + (index * 100)}
                >
                  <span className="text-sm font-medium">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      filter === tab.id ? "bg-[#003631] text-[#FFEDA8]" : "bg-white/10 text-gray-300"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <div 
                    key={order.id} 
                    className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-[#FFEDA8]/30 transition-all duration-300 transform hover:scale-[1.02]"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    data-aos-duration="800"
                  >
                    {/* Order Header */}
                    <div 
                      className="bg-[#003631] px-6 py-4 border-b border-white/10"
                      data-aos="fade-down"
                      data-aos-delay={index * 100 + 100}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-xl flex items-center justify-center border border-[#FFEDA8]/20">
                            <FaShoppingCart className="text-[#FFEDA8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-light text-white">Order #{order.id}</h3>
                            <p className="text-gray-300 text-sm flex items-center gap-2">
                              <FaCalendarAlt className="w-3 h-3" />
                              {formatDate(order.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border ${getStatusColor(order.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Confirmed'}
                          </span>
                          <p className="text-xl font-light text-[#FFEDA8]">
                            ${order.payment?.grandTotal?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Content */}
                    <div className="p-6">
                      {/* Shipping Info */}
                      <div 
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
                        data-aos="fade-up"
                        data-aos-delay={index * 100 + 200}
                      >
                        <div className="flex items-start gap-3 transform hover:scale-105 transition-all duration-300">
                          <FaMapMarkerAlt className="text-[#FFEDA8] mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-white mb-1 text-sm">Shipping Address</h4>
                            <p className="text-gray-300 text-xs">
                              {order.shipping?.name}<br />
                              {order.shipping?.address}<br />
                              {order.shipping?.city}, {order.shipping?.country}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 transform hover:scale-105 transition-all duration-300">
                          <FaCreditCard className="text-[#FFEDA8] mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-white mb-1 text-sm">Payment</h4>
                            <p className="text-gray-300 text-xs">
                              {order.payment?.method || 'Credit Card'}<br />
                              Paid: ${order.payment?.grandTotal?.toFixed(2) || '0.00'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 transform hover:scale-105 transition-all duration-300">
                          <FaTruck className="text-[#FFEDA8] mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-white mb-1 text-sm">Delivery</h4>
                            <p className="text-gray-300 text-xs">
                              {order.estimatedDelivery ? (
                                <>Est: {new Date(order.estimatedDelivery).toLocaleDateString()}</>
                              ) : (
                                '2-3 business days'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div 
                        className="border-t border-white/10 pt-6"
                        data-aos="fade-up"
                        data-aos-delay={index * 100 + 300}
                      >
                        <h4 className="font-medium text-white mb-4 text-sm">Order Items</h4>
                        <div className="space-y-4">
                          {order.items?.map((item, itemIndex) => (
                            <div 
                              key={itemIndex} 
                              className="flex items-center gap-4 p-4 bg-[#003631]/50 rounded-lg border border-white/10 hover:border-[#FFEDA8]/20 transition-all duration-300 transform hover:scale-105"
                              data-aos="fade-right"
                              data-aos-delay={index * 100 + 400 + (itemIndex * 50)}
                            >
                              <div className="flex-shrink-0">
                                <img
                                  src={item.images?.[0]}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg border border-white/10"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-white text-sm mb-1">{item.name}</h5>
                                <p className="text-gray-400 text-xs mb-2 line-clamp-1">{item.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                  <span>Category: {item.category}</span>
                                  <span>Warranty: {item.warranty}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-light text-[#FFEDA8] mb-1">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  ${item.price} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div 
                        className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/10"
                        data-aos="fade-up"
                        data-aos-delay={index * 100 + 500}
                      >
                        <button 
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center gap-2 bg-[#FFEDA8] text-[#003631] px-4 py-2 rounded-lg hover:bg-[#FFEDA8]/90 transition-colors text-sm font-medium border border-[#FFEDA8] transform hover:scale-105"
                        >
                          <FaEye className="w-3 h-3" />
                          View Details
                        </button>
                        <button 
                          onClick={() => handleDownloadInvoice(order)}
                          className="flex items-center gap-2 bg-[#003631] text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium border border-white/10 hover:border-[#FFEDA8]/30 transform hover:scale-105"
                        >
                          <FaDownload className="w-3 h-3" />
                          Download Invoice
                        </button>
                        {order.status === 'delivered' && (
                          <button 
                            onClick={() => handleRateProduct(order)}
                            className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium border border-green-500/30 hover:border-green-400 transform hover:scale-105"
                          >
                            <FaStar className="w-3 h-3" />
                            Rate Product
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button 
                            onClick={() => handleCancelOrder(order.id)}
                            className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium border border-red-500/30 hover:border-red-400 transform hover:scale-105"
                          >
                            <FaUndo className="w-3 h-3" />
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div 
                className="text-center py-16"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div 
                  className="w-24 h-24 bg-[#002822]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#FFEDA8]/20"
                  data-aos="pulse"
                  data-aos-delay="500"
                >
                  <FaShoppingBag className="text-3xl text-[#FFEDA8]" />
                </div>
                <h3 
                  className="text-xl font-light text-white mb-4"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  {filter === 'all' ? 'No Orders Yet' : `No ${filter} Orders`}
                </h3>
                <p 
                  className="text-gray-300 max-w-md mx-auto mb-8 text-sm"
                  data-aos="fade-up"
                  data-aos-delay="900"
                >
                  {filter === 'all' 
                    ? "You haven't placed any orders yet. Start shopping to see your order history here."
                    : `You don't have any ${filter} orders at the moment.`
                  }
                </p>
                {filter === 'all' && (
                  <button 
                    onClick={() => navigate("/shop")}
                    className="bg-[#FFEDA8] text-[#003631] px-6 py-3 rounded-lg hover:bg-[#FFEDA8]/90 transition-colors font-medium border border-[#FFEDA8] transform hover:scale-105"
                    data-aos="zoom-in"
                    data-aos-delay="1100"
                  >
                    Start Shopping
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrders;