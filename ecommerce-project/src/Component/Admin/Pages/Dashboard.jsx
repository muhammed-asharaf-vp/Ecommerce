// src/components/Admin/Dashboard.jsx
import React from 'react';
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import AdminLayout from '../AdminLayout';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <FaUsers className="text-2xl text-blue-500" />,
      color: 'bg-blue-50',
      
    },
    {
      title: 'Total Products',
      value: '567',
      icon: <FaBox className="text-2xl text-green-500" />,
      color: 'bg-green-50',
      
    },
    {
      title: 'Total Orders',
      value: '89',
      icon: <FaShoppingCart className="text-2xl text-purple-500" />,
      color: 'bg-purple-50',
      
    },
    {
      title: 'Revenue',
      value: '$12,456',
      icon: <FaDollarSign className="text-2xl text-yellow-500" />,
      color: 'bg-yellow-50',
      
    }
  ];



  return (
      <AdminLayout >
    <div className="space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center">
              <FaBox className="text-xl text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Add Product</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
              <FaUsers className="text-xl text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">View Users</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center">
              <FaShoppingCart className="text-xl text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-800">Process Orders</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-center">
              <FaDollarSign className="text-xl text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-yellow-800">View Reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout >
  );
};

export default Dashboard;