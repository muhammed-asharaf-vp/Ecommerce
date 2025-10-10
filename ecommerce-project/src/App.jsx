import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Shop from "./Pages/Shop";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import About from "./Pages/About";
import Product from "./Pages/Products";
import Contact from "./Pages/Contact";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/PayConfirm";
import MyProfile from "./Pages/MyProfile";
import MyOrders from "./Pages/MyOrders";
import ProtectedRoute from "./Pages/ProtectedRoute";
import AdminLayout from "./Component/Admin/AdminLayout";
import Dashboard from "./Component/Admin/Pages/Dashboard";
import AllProductsPage from "./Component/Admin/Pages/AllProducts";
import AddNewProductPage from "./Component/Admin/Pages/AddNew";





function App() {
  const location =useLocation();
  const isAdminRoute=location.pathname.startsWith("/admin")
  return (
    <div>
      <Routes>
        {/* //public Routes */}
        <Route  path="/login" element={  <Login /> } />
        <Route path="/signup" element={  <Signup />} />
         {/* protected router */}
        <Route path="/"  element={ <ProtectedRoute>   <Home /> </ProtectedRoute> } />
        <Route path="/shop" element={ <ProtectedRoute>  <Shop /> </ProtectedRoute>  } />
        <Route path="/wishlist" element={<ProtectedRoute> <Wishlist /> </ProtectedRoute> } />
        <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute> } />
        <Route path="/about" element={ <ProtectedRoute> <About /> </ProtectedRoute> } />
        <Route path="/product/:id" element={ <ProtectedRoute> <Product /> </ProtectedRoute>  }/>
        <Route path="/contact" element={ <ProtectedRoute> <Contact /> </ProtectedRoute>  }/>
        <Route path="/payment" element={ <ProtectedRoute> <Checkout /> </ProtectedRoute>  } />
        <Route path="/confirm-order" element={ <ProtectedRoute>  <OrderConfirmation /> </ProtectedRoute>  }/>
        <Route path="/my-profile"   element={    <ProtectedRoute>      <MyProfile />    </ProtectedRoute>  } />
        <Route path="/my-orders" element={ <ProtectedRoute> <MyOrders /> </ProtectedRoute> } />
         
        {/* admin router */}
        <Route path="/admin-layout" element= {<ProtectedRoute> <AdminLayout /> </ProtectedRoute>}   />
        <Route path="/admin-dashboard" element= {<ProtectedRoute> <Dashboard /> </ProtectedRoute>}   />
        <Route path="/admin-allproducts" element= {<ProtectedRoute> <AllProductsPage /> </ProtectedRoute>}   />
        <Route path="/admin-newproducts" element= {<ProtectedRoute> <AddNewProductPage /> </ProtectedRoute>}   />




      </Routes>
      
      {/* Toast Notification Container */}
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
        theme="light"/>
     {!isAdminRoute && <Footer />}
    </div>
  );
}

// Public Route Component - redirect to home if user is already logged in
const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default App;