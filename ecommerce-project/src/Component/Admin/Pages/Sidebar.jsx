// import React, { useContext, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { 
//   FaBars, 
//   FaTimes, 
//   FaTachometerAlt, 
//   FaBox, 
//   FaUsers, 
//   FaShoppingCart,
//   FaSignOutAlt,
//   FaChevronRight
// } from "react-icons/fa";
// import { AuthContext } from "../../../Context/AuthContext";
// export default function AdminSidebar({ isOpen, onToggle }) {
//   const navigate = useNavigate();
//   const [activeSubmenu, setActiveSubmenu] = useState(null);

//   const { logout } = useContext(AuthContext)

//   const menu = [
//     { 
//       name: "Dashboard", 
//       path: "/admin-dashboard", 
//       icon: <FaTachometerAlt />,
//       badge: null
//     },
//     { 
//       name: "Manage Products", 
//       path: "/admin-allproducts", 
//       icon: <FaBox />,
//       submenu: [
//         { name: "All Products", path: "/admin-allproducts" },
//         { name: "Add New", path: "/admin-newproducts" },
//       ]
//     },
//     { 
//       name: "Order Details", 
//       path: "/admin/orders", 
//       icon: <FaShoppingCart />,
//       submenu: [
//         { name: "All Orders", path: "/admin-allorders" },
//         { name: "Pending", path: "/admin-pendingorders" },
//         { name: "Completed", path: "/admin-completedorders" },
//       ]
//     },
//     { 
//       name: "Manage Users", 
//       path: "/admin-manageusers", 
//       icon: <FaUsers />,
//       badge: null
//     },
//   ];

//  const handleLogout = () => {
//   logout(); 
//   navigate("/login"); 
// };

//   const toggleSubmenu = (index) => {
//     setActiveSubmenu(activeSubmenu === index ? null : index);
//   };

//   return (
//     <>
//       {/*  Hamburger Button  */}
//       <button
//         onClick={onToggle}
//         className="fixed top-6 left-6 z-50 text-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
//       >
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       {/*  Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col justify-between shadow-2xl transition-all duration-500 ease-in-out border-r border-slate-700/50 ${
//           isOpen ? "w-80 px-6" : "w-24 px-3"
//         }`}
//       >
//         {/*  Header  */}
//         <div className="pt-20">
//           <div className={`flex items-center gap-4 mb-12 transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
//             <div>
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//                 Admin Panel
//               </h2>
//             </div>
//           </div>

//           {/*  Navigation Menu  */}
//           <nav className="space-y-3">
//             {menu.map((item, index) => (
//               <div key={item.name}>
//                 <NavLink
//                   to={item.path}
//                   onClick={(e) => {
//                     if (item.submenu) {
//                       e.preventDefault();
//                       toggleSubmenu(index);
//                     }
//                   }}
//                   className={({ isActive }) =>
//                     `group flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
//                       isActive
//                         ? "bg-white/10 text-white shadow-lg ring-1 ring-white/20"
//                         : "text-gray-300 hover:bg-white/5 hover:text-white hover:ring-1 hover:ring-white/10"
//                     }`
//                   }
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className={`text-lg transition-all duration-300 group-hover:scale-110 ${
//                       activeSubmenu === index ? "text-blue-400 transform scale-110" : ""
//                     }`}>
//                       {item.icon}
//                     </div>
//                     {isOpen && (
//                       <span className="font-medium text-gray-200">{item.name}</span>
//                     )}
//                   </div>
                  
//                   {/* Badge and Submenu Indicator */}
//                   {isOpen && (
//                     <div className="flex items-center gap-2">
//                       {item.badge && (
//                         <span className={`px-2 py-1 text-xs rounded-full font-medium ${
//                           item.badge === "New" 
//                             ? "bg-green-500/20 text-green-400 border border-green-500/30" 
//                             : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
//                         }`}>
//                           {item.badge}
//                         </span>
//                       )}
//                       {item.submenu && (
//                         <FaChevronRight className={`text-xs transition-transform duration-300 ${
//                           activeSubmenu === index ? "rotate-90 text-blue-400" : "text-gray-400"
//                         }`} />
//                       )}
//                     </div>
//                   )}
                  
//                   {/* Active Indicator */}
//                   <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full transition-all duration-300 ${
//                     activeSubmenu === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
//                   }`} />
//                 </NavLink>

//                 {/* Submenu */}
//                 {isOpen && item.submenu && activeSubmenu === index && (
//                   <div className="ml-12 mt-2 space-y-2 animate-slideDown">
//                     {item.submenu.map((subItem) => (
//                       <NavLink
//                         key={subItem.name}
//                         to={subItem.path}
//                         className={({ isActive }) =>
//                           `block px-4 py-3 rounded-lg text-sm transition-all duration-200 border-l-2 ${
//                             isActive
//                               ? "text-blue-400 bg-blue-500/10 border-blue-400"
//                               : "text-gray-400 hover:text-white hover:bg-white/5 border-transparent hover:border-gray-600"
//                           }`
//                         }
//                       >
//                         {subItem.name}
//                       </NavLink>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//         </div>

//         {/*  Footer Section  */}
//         <div className="pb-8">
//           {/* admin Profile */}
//           <div className={`flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 mb-4 transition-all duration-300 ${
//             isOpen ? "opacity-100" : "opacity-0"
//           }`}>
//             <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-emerald-500/30">
//               <span className="text-white font-bold text-sm">AD</span>
//             </div>
//             {isOpen && (
//               <div className="flex-1 min-w-0">
//                 <p className="text-white font-medium text-sm truncate">Admin </p>
//                 <p className="text-gray-400 text-xs truncate">Administrator</p>
//               </div>
//             )}
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className={`group flex items-center gap-4 w-full px-4 py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl backdrop-blur-sm border border-red-500/20 ${
//               isOpen ? "justify-start" : "justify-center"
//             }`}
//           >
//             <FaSignOutAlt className="text-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
//             {isOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const menu = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Manage Products",
      path: "/admin-allproducts",
      icon: <FaBox />,
      submenu: [
        { name: "All Products", path: "/admin-allproducts" },
        { name: "Add New", path: "/admin-newproducts" },
      ],
    },
    {
      name: "Order Details",
      path: "/admin/orders",
      icon: <FaShoppingCart />,
      submenu: [
        { name: "All Orders", path: "/admin-allorders" },
        { name: "Pending", path: "/admin-pendingorders" },
        { name: "Completed", path: "/admin-completedorders" },
      ],
    },
    {
      name: "Manage Users",
      path: "/admin-manageusers",
      icon: <FaUsers />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-6 left-6 z-50 md:hidden text-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col justify-between shadow-2xl border-r border-slate-700/50 transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:block z-40`}
      >
        {/* Header */}
        <div className="pt-20">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
            {menu.map((item, index) => (
              <div key={item.name}>
                <button
                  onClick={() => {
                    if (item.submenu) {
                      toggleSubmenu(index);
                    } else {
                      navigate(item.path);
                      if (mobileOpen) setMobileOpen(false);
                    }
                  }}
                  className={`group flex items-center justify-between w-full text-left px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
                    activeSubmenu === index
                      ? "bg-white/10 text-white shadow-lg ring-1 ring-white/20"
                      : "text-gray-300 hover:bg-white/5 hover:text-white hover:ring-1 hover:ring-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-lg ${
                        activeSubmenu === index ? "text-blue-400" : ""
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-medium text-gray-200">
                      {item.name}
                    </span>
                  </div>

                  {item.submenu && (
                    <FaChevronRight
                      className={`text-xs transform transition-transform duration-300 ${
                        activeSubmenu === index
                          ? "rotate-90 text-blue-400"
                          : "text-gray-400"
                      }`}
                    />
                  )}
                </button>

                {/* Submenu */}
                {item.submenu && activeSubmenu === index && (
                  <div className="ml-10 mt-2 space-y-2">
                    {item.submenu.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.path}
                        onClick={() => {
                          setMobileOpen(false);
                        }}
                        className={({ isActive }) =>
                          `block px-4 py-3 rounded-lg text-sm transition-all duration-200 border-l-2 ${
                            isActive
                              ? "text-blue-400 bg-blue-500/10 border-blue-400"
                              : "text-gray-400 hover:text-white hover:bg-white/5 border-transparent hover:border-gray-600"
                          }`
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="pb-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-emerald-500/30">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">Admin</p>
              <p className="text-gray-400 text-xs truncate">Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="group flex items-center gap-4 w-full px-4 py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl backdrop-blur-sm border border-red-500/20 justify-start"
          >
            <FaSignOutAlt className="text-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
