import React from "react";
import { useAuth } from "../../../Context/AuthContext";

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-yellow-600 mb-2">Admin Dashboard</h1>
      <p className="text-gray-700 mb-4">Welcome, {user?.firstname} 👑</p>
      <button
        onClick={logout}
        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
