import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import {
  FaShoppingBag,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaBox,
  FaStar,
  FaDownload,
  FaEye,
  FaUndo,
  FaCalendarAlt,
  FaCreditCard,
  FaShoppingCart
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MyOrders() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Load user and orders from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    
    if (storedUser && storedUser.order) {
      setOrders(storedUser.order);
    }
  }, []);

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
    
    // Simulate invoice generation delay
    setTimeout(() => {
      // Create invoice content
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

      // Create a blob and download link
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
    // Update order status in local state
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    );
    setOrders(updatedOrders);
    
    // Update user data in localStorage
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaShoppingBag className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-serif font-light text-gray-900 mb-4">Please Login</h3>
            <p className="text-gray-600 max-w-sm mb-6">Sign in to view your order history</p>
            <button 
              onClick={() => navigate("/login")}
              className="bg-amber-500 text-white px-6 py-3 rounded-2xl hover:bg-amber-600 transition-colors"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaShoppingBag className="text-2xl text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900">
                  My Orders
                </h1>
                <p className="text-gray-600 mt-2">Track and manage your purchases</p>
              </div>
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">{orders.length}</div>
              <div className="text-gray-600 text-sm">Total Orders</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {orders.filter(o => o.status === 'delivered').length}
              </div>
              <div className="text-gray-600 text-sm">Delivered</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {orders.filter(o => o.status === 'shipped').length}
              </div>
              <div className="text-gray-600 text-sm">In Transit</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                ${orders.reduce((total, order) => total + (order.payment?.grandTotal || 0), 0).toFixed(2)}
              </div>
              <div className="text-gray-600 text-sm">Total Spent</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Orders", count: orders.length },
                { id: "confirmed", label: "Confirmed", count: orders.filter(o => o.status === 'confirmed').length },
                { id: "shipped", label: "Shipped", count: orders.filter(o => o.status === 'shipped').length },
                { id: "delivered", label: "Delivered", count: orders.filter(o => o.status === 'delivered').length },
                { id: "cancelled", label: "Cancelled", count: orders.filter(o => o.status === 'cancelled').length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    filter === tab.id
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      filter === tab.id ? "bg-white text-amber-500" : "bg-gray-300 text-gray-700"
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
              filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <div key={order.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 text-white">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <FaShoppingCart className="text-amber-300" />
                          </div>
                          <div>
                            <h3 className="text-xl font-serif font-light">Order #{order.id}</h3>
                            <p className="text-slate-300 text-sm flex items-center gap-2">
                              <FaCalendarAlt className="w-3 h-3" />
                              {formatDate(order.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Confirmed'}
                          </span>
                          <p className="text-2xl font-serif font-light text-amber-300">
                            ${order.payment?.grandTotal?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Content */}
                    <div className="p-6">
                      {/* Shipping Info */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Shipping Address</h4>
                            <p className="text-gray-600 text-sm">
                              {order.shipping?.name}<br />
                              {order.shipping?.address}<br />
                              {order.shipping?.city}, {order.shipping?.country}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FaCreditCard className="text-amber-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Payment</h4>
                            <p className="text-gray-600 text-sm">
                              {order.payment?.method || 'Credit Card'}<br />
                              Paid: ${order.payment?.grandTotal?.toFixed(2) || '0.00'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FaTruck className="text-amber-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Delivery</h4>
                            <p className="text-gray-600 text-sm">
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
                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-4">
                          {order.items?.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-gray-200/50 hover:shadow-md transition-all duration-300">
                              <div className="flex-shrink-0">
                                <img
                                  src={item.images?.[0]}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-xl shadow-sm"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h5>
                                <p className="text-gray-500 text-xs mb-2">{item.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-600">
                                  <span>Category: {item.category}</span>
                                  <span>Warranty: {item.warranty}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-serif font-light text-gray-900 mb-1">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  ${item.price} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                        <button 
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-xl hover:bg-amber-600 transition-colors"
                        >
                          <FaEye className="w-4 h-4" />
                          View Details
                        </button>
                        <button 
                          onClick={() => handleDownloadInvoice(order)}
                          className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors"
                        >
                          <FaDownload className="w-4 h-4" />
                          Download Invoice
                        </button>
                        {order.status === 'delivered' && (
                          <button 
                            onClick={() => handleRateProduct(order)}
                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors"
                          >
                            <FaStar className="w-4 h-4" />
                            Rate Product
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button 
                            onClick={() => handleCancelOrder(order.id)}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors"
                          >
                            <FaUndo className="w-4 h-4" />
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaShoppingBag className="text-5xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-serif font-light text-gray-900 mb-4">
                  {filter === 'all' ? 'No Orders Yet' : `No ${filter} Orders`}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {filter === 'all' 
                    ? "You haven't placed any orders yet. Start shopping to see your order history here."
                    : `You don't have any ${filter} orders at the moment.`
                  }
                </p>
                {filter === 'all' && (
                  <button 
                    onClick={() => navigate("/shop")}
                    className="bg-amber-500 text-white px-8 py-3 rounded-2xl hover:bg-amber-600 transition-colors font-semibold shadow-lg hover:shadow-xl"
                  >
                    Start Shopping
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Load More Button (if needed) */}
          {filteredOrders.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-3 rounded-2xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 font-semibold">
                Load More Orders
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyOrders;