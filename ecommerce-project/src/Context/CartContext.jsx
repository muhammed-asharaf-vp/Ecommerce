// src/Context/CartContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../Api/Axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";


export const CartContext = createContext();
export const CartProvider = ({ children }) => {


  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!userId) {
        toast.warning("please login")
      return;
    }
    api
      .get(`/users/${userId}`)
      .then((res) => setCart(res.data.cart || []))
      .catch((err) => console.error("Error loading cart:", err));
  }, [userId]);


  const addToCart = async (product) => {
    if (!userId) {
      toast.warning("Please login to add items to your cart.");
      return;
    }
toast.success("item add to cart")
    const exists = cart.find((i) => i.id === product.id);
    const updatedCart = exists
      ? cart.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);

    try {
      await api.patch(`/users/${userId}`, { cart: updatedCart });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, cart: updatedCart })
      );

      if (exists) {
        toast.success(`Quantity of "${product.name}" increased.`);
      } else {
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    const removedProduct = cart.find((i) => i.id === id);
    if (!removedProduct) {
      toast.warning(`Product not found in cart.`);
      return;
    }
toast.warning("item removed")
    const updatedCart = cart.filter((i) => i.id !== id);
    setCart(updatedCart);

    try {
      await api.patch(`/users/${userId}`, { cart: updatedCart });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, cart: updatedCart })
      );
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  const increaseQuantity = async (id) => {
    const updatedCart = cart.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    setCart(updatedCart);
    try {
      await api.patch(`/users/${userId}`, { cart: updatedCart });
      toast.success("Quantity updated.");
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Failed to update quantity.");
    }
  };

  const decreaseQuantity = async (id) => {
    const updatedCart = cart
      .map((i) =>
        i.id === id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
      )
      .filter((i) => i.quantity > 0);

    setCart(updatedCart);
    try {
      await api.patch(`/users/${userId}`, { cart: updatedCart });
      toast.success("Quantity updated.");
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Failed to update quantity.");
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
