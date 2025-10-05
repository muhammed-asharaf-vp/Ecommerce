// src/Context/WishListContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../Api/Axios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.id || null;

  const [wishlist, setWishlist] = useState([]);

  // 🟢 Load wishlist when user logs in
  useEffect(() => {
    if (userId) {
      api
        .get(`/users/${userId}`)
        .then((res) => setWishlist(res.data.wishlist || []))
        .catch((err) => console.error("Error loading wishlist:", err));
    } else {
      setWishlist([]); // clear wishlist if logged out
    }
  }, [userId]);

  // 🟢 Add product to wishlist
  const addToWishlist = async (product) => {
    if (!userId) {
      toast.warning("Please login to add items to your wishlist.");
      return;
    }

    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      toast.info("This item is already in your wishlist!");
      return;
    }

    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);

    try {
      await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });
      toast.success(`❤️ "${product.name}" added to wishlist!`);
      console.log("✅ Wishlist updated successfully!");
    } catch (error) {
      console.error("❌ Error updating wishlist:", error);
      toast.error("Failed to add item to wishlist. Please try again.");
    }
  };

  // 🟢 Remove product from wishlist
  const removeFromWishlist = async (id) => {
    const itemToRemove = wishlist.find(item => item.id === id);
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);

    try {
      await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });
      toast.info(`"${itemToRemove?.name}" removed from wishlist`);
      console.log("✅ Removed from wishlist");
    } catch (error) {
      console.error("❌ Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist. Please try again.");
    }
  };

  // 🟢 Clear entire wishlist
  const clearWishlist = async () => {
    if (!userId) {
      toast.warning("Please login to manage your wishlist.");
      return;
    }

    setWishlist([]);

    try {
      await api.patch(`/users/${userId}`, { wishlist: [] });
      toast.success("Wishlist cleared successfully!");
      console.log("✅ Wishlist cleared successfully!");
    } catch (error) {
      console.error("❌ Error clearing wishlist:", error);
      toast.error("Failed to clear wishlist. Please try again.");
    }
  };

  // 🟢 Toggle wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};