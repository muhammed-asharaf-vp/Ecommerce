import React, { useEffect, useState } from "react";
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import AdminLayout from "../AdminLayout";
import api from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [usercount, setusercount] = useState(0);
  const [productcount, setproductcount] = useState(0);
  const [ordercount, setordercount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topSales, setTopSales] = useState([]);

  const [loading, setloading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        const normalusers = res.data.filter((user) => user.role === "user");
        setusercount(normalusers.length);
      } catch (error) {
        console.log("error fetching users:", error);
      } finally {
        setloading(false);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setproductcount(res.data.length);
      } catch (error) {
        console.log("error fetching products:", error);
      } finally {
        setloading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get("/users");
        const allUsers = res.data;
        const totalItems = allUsers.reduce((sum, user) => {
          const userItems =
            user.order?.reduce(
              (acc, order) => acc + (order.items?.length || 0),
              0
            ) || 0;
          return sum + userItems;
        }, 0);

        setordercount(totalItems);
      } catch (error) {
        console.log("Error fetching order items:", error);
      } finally {
        setloading(false);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await api.get("/users");
        const allUsers = res.data;
        const total = allUsers.reduce((sum, user) => {
          const userRevenue =
            user.order?.reduce((orderSum, order) => {
              const orderTotal =
                order.items?.reduce(
                  (itemSum, item) =>
                    itemSum + (item.price || 0) * (item.quantity || 1),
                  0
                ) || 0;
              return orderSum + orderTotal;
            }, 0) || 0;
          return sum + userRevenue;
        }, 0);

        setTotalRevenue(total);
      } catch (error) {
        console.log("Error fetching total revenue:", error);
      } finally {
        setloading(false);
      }
    };

    fetchRevenue();
  }, []);

  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        const res = await api.get("/users");
        const allUsers = res.data;

        const salesMap = {};
        allUsers.forEach((user) => {
          user.order?.forEach((order) => {
            order.items?.forEach((item) => {
              if (salesMap[item.id]) {
                salesMap[item.id].quantity += item.quantity || 0;
              } else {
                salesMap[item.id] = {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity || 0,
                };
              }
            });
          });
        });

        const salesArray = Object.values(salesMap).sort(
          (a, b) => b.quantity - a.quantity
        );
        setTopSales(salesArray.slice(0, 5));
      } catch (error) {
        console.log("Error fetching top sales:", error);
      }
    };
    fetchTopSales();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: loading ? "loading..." : usercount,
      icon: <FaUsers className="text-2xl text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Total Products",
      value: loading ? "loading..." : productcount,
      icon: <FaBox className="text-2xl text-green-500" />,
      color: "bg-green-50",
    },
    {
      title: "Total Orders",
      value: loading ? "loading..." : ordercount,
      icon: <FaShoppingCart className="text-2xl text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "Revenue",
      value: loading ? "loading..." : totalRevenue,
      icon: <FaDollarSign className="text-2xl text-yellow-500" />,
      color: "bg-yellow-50",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Sales Table Design */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Top Sales</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Best performing products
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="p-4 text-left font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>Product</span>
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </div>
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="p-4 text-left font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        <span>Quantity Sold</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topSales.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50 transition-colors duration-200 group"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-gray-900">
                          ${item.price}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  (item.quantity /
                                    Math.max(
                                      ...topSales.map((i) => i.quantity)
                                    )) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>Updated just now</span>
            </div>
          </div>
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 lg:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              <button
                onClick={() => navigate("/admin-newproducts")}
                className="p-3 md:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 text-center group hover:shadow-md hover:-translate-y-1"
              >
                <FaBox className="text-lg md:text-xl text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-xs md:text-sm font-medium text-blue-800">
                  Add Product
                </p>
              </button>

              <button
                onClick={() => navigate("/admin-manageusers")}
                className="p-3 md:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 text-center group hover:shadow-md hover:-translate-y-1"
              >
                <FaUsers className="text-lg md:text-xl text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-xs md:text-sm font-medium text-green-800">
                  View Users
                </p>
              </button>

              <button
                onClick={() => navigate("/admin-allorders")}
                className="p-3 md:p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300 text-center group hover:shadow-md hover:-translate-y-1"
              >
                <FaShoppingCart className="text-lg md:text-xl text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-xs md:text-sm font-medium text-purple-800">
                  Process Orders
                </p>
              </button>

              <button
                onClick={() => navigate("/admin-allproducts")}
                className="p-3 md:p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all duration-300 text-center group hover:shadow-md hover:-translate-y-1"
              >
                <FaDollarSign className="text-lg md:text-xl text-yellow-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-xs md:text-sm font-medium text-yellow-800">
                  View Products
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
