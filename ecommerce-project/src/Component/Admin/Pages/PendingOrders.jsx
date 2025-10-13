// src/components/Admin/Orders/PendingOrders.jsx
import React, { useEffect, useState } from 'react';
import { FaClock, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import api from '../../../Api/Axios';
import AdminLayout from '../AdminLayout';


const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const res = await api.get("/users");
        const pendingOrdersList = [];
        
        res.data.forEach(user => {
          if (user.order && user.order.length > 0) {
            user.order.forEach(order => {
              if (order.status === 'pending' || !order.status) {
                pendingOrdersList.push({
                  ...order,
                  user: {
                    id: user.id,
                    name: `${user.firstname} ${user.lastname}`,
                    email: user.email
                  }
                });
              }
            });
          }
        });

        setPendingOrders(pendingOrdersList);
      } catch (error) {
        console.log("Error fetching pending orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Update order status logic
      console.log(`Updating order ${orderId} to ${newStatus}`);
      // Refresh the list after update
      const updatedOrders = pendingOrders.filter(order => order.id !== orderId);
      setPendingOrders(updatedOrders);
    } catch (error) {
      console.log("Error updating order status:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pending Orders</h1>
            <p className="text-gray-600 mt-2">Review and process pending orders</p>
          </div>
          <div className="text-sm text-gray-500 bg-yellow-100 px-3 py-2 rounded-lg">
            Pending Orders: {pendingOrders.length}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-yellow-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-500">{order.user.name}</p>
                  <p className="text-xs text-gray-400">{order.user.email}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <FaClock className="mr-1" />
                  Pending
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600">
                  <strong>Items:</strong> {order.items?.length || 0}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Total:</strong> ${order.payment?.grandTotal?.toLocaleString() || '0'}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Shipping:</strong> {order.shipping?.city}, {order.shipping?.country}
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items:</h4>
                <div className="space-y-1">
                  {order.items?.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-gray-600 truncate">{item.name}</span>
                      <span className="text-gray-900">${item.price} x {item.quantity || 1}</span>
                    </div>
                  ))}
                  {order.items?.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{order.items.length - 3} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => updateOrderStatus(order.id, 'confirmed')}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <FaCheckCircle className="mr-2" />
                  Confirm
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, 'cancelled')}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <FaTimesCircle className="mr-2" />
                  Cancel
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center">
                  <FaEye className="mr-2" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {pendingOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <FaClock className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Orders</h3>
            <p className="text-gray-500">All orders have been processed.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PendingOrders;