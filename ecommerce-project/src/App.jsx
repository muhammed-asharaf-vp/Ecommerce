import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Route Wrappers
import PublicRoute from "./Pages/publicRoute";
import ProtectedRoute from "./Pages/ProtectedRoute";

// Components & Pages
import Footer from "./Component/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./Pages/MyProfile";
import MyOrders from "./Pages/MyOrders";
import OrderConfirmation from "./Pages/PayConfirm";
import { Home } from "./Pages/Home";

// Admin Pages
import AdminLayout from "./Component/Admin/AdminLayout";
import Dashboard from "./Component/Admin/Pages/Dashboard";
import AllProductsPage from "./Component/Admin/Pages/AllProducts";
import AddNewProductPage from "./Component/Admin/Pages/AddNew";
import ManageUsersPage from "./Component/Admin/Pages/ManageUsers";
import AllOrders from "./Component/Admin/Pages/AllOrders";
import PendingOrders from "./Component/Admin/Pages/PendingOrders";
import CompletedOrders from "./Component/Admin/Pages/CompletedOrders";

// Loading GIF
import loading from "../src/assets/loading_gray.gif";

// Lazy-loaded heavy pages
const Wishlist = lazy(() => import("./Pages/Wishlist"));
const Cart = lazy(() => import("./Pages/Cart"));
const Product = lazy(() => import("./Pages/Products"));
const Checkout = lazy(() => import("./Pages/Checkout"));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // --- 👇 Loading state with useEffect delay ---
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading animation for 2 seconds whenever route changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);
  // --- 👆 End of loading delay effect ---

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <img src={loading} alt="Loading..." className="w-24 h-24" />
      </div>
    );
  }

  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <img src={loading} alt="Loading..." className="w-24 h-24" />
          </div>
        }
      >
        <Routes>
          {/* Public Pages - redirect logged-in users based on role */}
          <Route
            path="/"
            element={
              <PublicRoute redirectAuthenticated>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <PublicRoute redirectAuthenticated>
                <Shop />
              </PublicRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRoute redirectAuthenticated>
                <About />
              </PublicRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicRoute redirectAuthenticated>
                <Contact />
              </PublicRoute>
            }
          />

          {/* Lazy-loaded Product page */}
          <Route
            path="/product/:id"
            element={
              <PublicRoute redirectAuthenticated>
                <Product />
              </PublicRoute>
            }
          />

          {/* Login/Signup */}
          <Route
            path="/login"
            element={
              <PublicRoute redirectAuthenticated>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute redirectAuthenticated>
                <Signup />
              </PublicRoute>
            }
          />

          {/* User Protected Routes */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute requiredRole="user">
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole="user">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute requiredRole="user">
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute requiredRole="user">
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* Lazy-loaded Checkout (Payment) */}
          <Route
            path="/payment"
            element={
              <ProtectedRoute requiredRole="user">
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm-order"
            element={
              <ProtectedRoute requiredRole="user">
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin-layout"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-allproducts"
            element={
              <ProtectedRoute requiredRole="admin">
                <AllProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-newproducts"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddNewProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-manageusers"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-allorders"
            element={
              <ProtectedRoute requiredRole="admin">
                <AllOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-pendingorders"
            element={
              <ProtectedRoute requiredRole="admin">
                <PendingOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-completedorders"
            element={
              <ProtectedRoute requiredRole="admin">
                <CompletedOrders />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Hide footer on admin, login, and signup pages */}
      {!isAdminRoute &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && <Footer />}
    </div>
  );
}

export default App;
