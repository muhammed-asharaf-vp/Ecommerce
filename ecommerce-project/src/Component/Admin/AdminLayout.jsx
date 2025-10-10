import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "./Pages/Sidebar";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar — fixed on large screens, toggleable on mobile */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Content area with responsive margin */}
      <div
        className={`w-full p-4 sm:p-6 bg-gray-100 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "md:ml-80" : "md:ml-24"
        } ${isSidebarOpen ? "ml-0" : "ml-0"}`} // no margin on small screens
      >
        {/* Path display */}
        <div className="text-gray-500 mb-4 text-xs sm:text-sm break-all">
          Path: {location.pathname}
        </div>

        {children}

        {/* Mobile toggle button */}
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-md md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>
      </div>
    </div>
  );
}
