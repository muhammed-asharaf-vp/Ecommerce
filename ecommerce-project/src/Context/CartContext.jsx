// src/Context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../Api/Axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
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

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,     // ✅ added
        toggleCart,    // ✅ added
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
