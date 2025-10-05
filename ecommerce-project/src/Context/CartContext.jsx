// src/Context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../Api/Axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, login } = useContext(AuthContext);
  const userId = user?.id || null;

  const [cart, setCart] = useState([]);

  // 🟢 Load cart when user logs in
  useEffect(() => {
    if (userId) {
      api
        .get(`/users/${userId}`)
        .then((res) => setCart(res.data.cart || []))
        .catch((err) => console.error("Error loading cart:", err));
    } else {
      setCart([]); // clear cart when logged out
    }
  }, [userId]);

  // 🟢 Add product to cart
  const addToCart = async (product) => {
    if (!userId) {
      toast.warning("Please login to add items to your cart.");
      return;
    }

    const exists = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (exists) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      toast.info(`Increased quantity of "${product.name}".`);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success(`"${product.name}" added to cart.`);
    }

    setCart(updatedCart);
    try {
      await api.patch(`/users/${userId}`, { cart: updatedCart });
      console.log("✅ Cart updated successfully!");
    } catch (error) {
      console.error("❌ Error updating cart:", error);
    }
  };

  // 🟢 Remove product from cart
  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    toast.warning("Item removed from cart.");

    try {
      await api.patch(`/users/${userId}`, { cart: updatedCart });
      console.log("✅ Removed from cart");
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
    }
  };

  // 🟢 Increase quantity
  const increaseQuantity = async (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

    try {
      await api.patch(`/users/${userId}`, { cart: updatedCart });
      toast.success("Quantity increased.");
    } catch (error) {
      console.error("❌ Error increasing quantity:", error);
    }
  };

  // 🟢 Decrease quantity
  const decreaseQuantity = async (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    try {
      await api.patch(`/users/${userId}`, { cart: updatedCart });
      toast.info("Quantity decreased.");
    } catch (error) {
      console.error("❌ Error decreasing quantity:", error);
    }
  };

  // 🟢 Clear entire cart
  const clearCart = async () => {
    if (!userId) {
      toast.warning("Please login to manage your cart.");
      return;
    }

    setCart([]);
    toast.info("Cart cleared.");

    try {
      await api.patch(`/users/${userId}`, { cart: [] });
      console.log("✅ Cart cleared successfully!");
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  // 🟢 Toggle cart (add if not exists, remove if exists)
  const toggleCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    exists ? removeFromCart(product.id) : addToCart(product);
  };

  // 🟢 CREATE ORDER - NEW FUNCTION
  const createOrder = async (orderData) => {
    if (!userId) {
      toast.error("Please login to create an order.");
      return false;
    }

    try {
      // Get current user data
      const userResponse = await api.get(`/users/${userId}`);
      const currentUser = userResponse.data;

      // Create new order object
      const newOrder = {
        id: `VEL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date: new Date().toISOString(),
        items: orderData.cartItems,
        shipping: orderData.shippingInfo,
        payment: {
          method: orderData.paymentMethod,
          subtotal: orderData.subtotal,
          tax: orderData.tax,
          shipping: 0,
          grandTotal: orderData.total
        },
        status: "confirmed",
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };

      // Create shipping address object
      const newShippingAddress = {
        name: orderData.shippingInfo.name,
        address: orderData.shippingInfo.address,
        city: orderData.shippingInfo.city,
        country: orderData.shippingInfo.country,
        zipCode: orderData.shippingInfo.zipCode
      };

      // Update user data
      const updatedUser = {
        ...currentUser,
        order: [...(currentUser.order || []), newOrder],
        shippingAddress: [...(currentUser.shippingAddress || []), newShippingAddress],
        cart: [] // Clear cart after successful order
      };

      // Save to database
      await api.patch(`/users/${userId}`, updatedUser);
      
      // Update local state
      setCart([]);
      
      // Update AuthContext user data
      if (login) {
        login(updatedUser);
      }

      toast.success("🎉 Order created successfully!");
      console.log("✅ Order saved to database:", newOrder);
      return true;

    } catch (error) {
      console.error("❌ Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
      return false;
    }
  };

  // 🟢 GET USER ORDERS
  const getUserOrders = async () => {
    if (!userId) return [];

    try {
      const response = await api.get(`/users/${userId}`);
      return response.data.order || [];
    } catch (error) {
      console.error("❌ Error fetching user orders:", error);
      return [];
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        toggleCart,
        createOrder,    // ✅ NEW: Create order function
        getUserOrders   // ✅ NEW: Get user orders function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};