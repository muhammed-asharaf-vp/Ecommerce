// src/components/Admin/Orders/AllOrders.jsx
import React, { useEffect, useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaShoppingCart, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import api from '../../../Api/Axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await api.get("/users");
        const allOrders = [];
        const usersData = res.data;
        
        usersData.forEach(user => {
          if (user.order && user.order.length > 0) {
            user.order.forEach(order => {
              allOrders.push({
                ...order,
                userId: user.id, 
                user: {
                  id: user.id,
                  name: `${user.firstname} ${user.lastname}`,
                  email: user.email
                }
              });
            });
          }
        });

        setOrders(allOrders);
        setUsers(usersData);
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  // View Order Details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  // Edit Order Status
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setShowEditModal(true);
  };

  // Update Order Status
  const handleUpdateStatus = async () => {
    if (!selectedOrder || !editStatus) return;

    try {
      // Find the user that owns this order
      const user = users.find(u => u.id === selectedOrder.userId);
      if (!user) {
        alert('User not found');
        return;
      }

      // Update the order status in the user's orders
      const updatedOrders = user.order.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: editStatus }
          : order
      );

      // Update the user with the modified orders
      await api.put(`/users/${selectedOrder.userId}`, {
        ...user,
        order: updatedOrders
      });

      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === selectedOrder.id 
            ? { ...order, status: editStatus }
            : order
        )
      );

      // Also update users state
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === selectedOrder.userId
            ? { ...u, order: updatedOrders }
            : u
        )
      );

      setShowEditModal(false);
      setSelectedOrder(null);
      setEditStatus('');
      
      // Show success message
      alert('Order status updated successfully!');
    } catch (error) {
      console.log("Error updating order status:", error);
      alert('Failed to update order status');
    }
  };

  // Delete Order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      // Find the order to get user ID
      const orderToDelete = orders.find(order => order.id === orderId);
      if (!orderToDelete) {
        alert('Order not found');
        return;
      }

      // Find the user that owns this order
      const user = users.find(u => u.id === orderToDelete.userId);
      if (!user) {
        alert('User not found');
        return;
      }

      // Remove the order from user's orders
      const updatedOrders = user.order.filter(order => order.id !== orderId);

      // Update the user with the filtered orders
      await api.put(`/users/${orderToDelete.userId}`, {
        ...user,
        order: updatedOrders
      });

      // Update local state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      
      // Also update users state
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === orderToDelete.userId
            ? { ...u, order: updatedOrders }
            : u
        )
      );

      // Show success message
      alert('Order deleted successfully!');
    } catch (error) {
      console.log("Error deleting order:", error);
      alert('Failed to delete order');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
            <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
          </div>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
            Total Orders: {orders.length}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID, customer name, email, or status..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.user?.name}</div>
                      <div className="text-sm text-gray-500">{order.user?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items?.length || 0} items
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${order.payment?.grandTotal?.toLocaleString() || '0'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <FaEye className="mr-1" />
                          View
                        </button>
                        <button 
                          onClick={() => handleEditOrder(order)}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <FaEdit className="mr-1" />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FaShoppingCart className="text-4xl text-gray-300 mx-auto mb-2" />
              <p>No orders found</p>
            </div>
          )}
        </div>

        {/* View Order Modal */}
        {showViewModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold">Order ID:</label>
                    <p>{selectedOrder.id}</p>
                  </div>
                  <div>
                    <label className="font-semibold">Status:</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1 capitalize">{selectedOrder.status}</span>
                    </span>
                  </div>
                  <div>
                    <label className="font-semibold">Customer:</label>
                    <p>{selectedOrder.user?.name}</p>
                  </div>
                  <div>
                    <label className="font-semibold">Email:</label>
                    <p>{selectedOrder.user?.email}</p>
                  </div>
                  <div>
                    <label className="font-semibold">Total Amount:</label>
                    <p>${selectedOrder.payment?.grandTotal?.toLocaleString() || '0'}</p>
                  </div>
                  <div>
                    <label className="font-semibold">Order Date:</label>
                    <p>{selectedOrder.date ? new Date(selectedOrder.date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
                
                {/* Order Items */}
                {selectedOrder.items && selectedOrder.items.length > 0 && (
                  <div>
                    <label className="font-semibold">Order Items:</label>
                    <div className="mt-2 space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between border-b pb-2">
                          <span>{item.name || `Item ${index + 1}`}</span>
                          <span>Qty: {item.quantity || 1}</span>
                          <span>${item.price || '0'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Order Modal */}
        {showEditModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Order Status</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateStatus}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllOrders;