// src/components/Admin/Orders/CompletedOrders.jsx
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaEye, FaPrint, FaSearch } from 'react-icons/fa';
import api from '../../../Api/Axios';
import AdminLayout from '../AdminLayout';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const res = await api.get("/users");
        const completedOrdersList = [];
        
        res.data.forEach(user => {
          if (user.order && user.order.length > 0) {
            user.order.forEach(order => {
              if (order.status === 'confirmed') {
                completedOrdersList.push({
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

        setCompletedOrders(completedOrdersList);
      } catch (error) {
        console.log("Error fetching completed orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedOrders();
  }, []);

  const filteredOrders = completedOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalRevenue = () => {
    return completedOrders.reduce((total, order) => total + (order.payment?.grandTotal || 0), 0);
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
            <h1 className="text-3xl font-bold text-gray-900">Completed Orders</h1>
            <p className="text-gray-600 mt-2">View all successfully processed orders</p>
          </div>
          <div className="text-sm text-gray-500 bg-green-100 px-3 py-2 rounded-lg">
            Completed Orders: {completedOrders.length}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedOrders.length}</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <FaCheckCircle className="text-2xl text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${getTotalRevenue().toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <FaCheckCircle className="text-2xl text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${completedOrders.length > 0 ? (getTotalRevenue() / completedOrders.length).toFixed(2) : '0'}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <FaCheckCircle className="text-2xl text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search completed orders..."
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
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">
                        {order.items?.length || 0} items
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                      <div className="text-sm text-gray-500">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-green-600">
                        ${order.payment?.grandTotal?.toLocaleString() || '0'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.date).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center">
                          <FaEye className="mr-1" />
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center">
                          <FaPrint className="mr-1" />
                          Print
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
              <FaCheckCircle className="text-4xl text-gray-300 mx-auto mb-2" />
              <p>No completed orders found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CompletedOrders;