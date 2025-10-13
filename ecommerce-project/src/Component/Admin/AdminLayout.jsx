import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import AdminSidebar from "./Pages/Sidebar";

export default function AdminLayout({ children }) {
  // const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Fixed sidebar with state */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Content area with dynamic margin */}
      <div className={`w-full p-6 bg-gray-100 min-h-screen transition-all duration-300 ${
        isSidebarOpen ? 'ml-80' : 'ml-24'
      }`}>

        {children}
      </div>
    </div>
  );
}

