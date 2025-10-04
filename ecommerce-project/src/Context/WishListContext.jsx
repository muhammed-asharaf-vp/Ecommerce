import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../Api/Axios";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // ✅ get current user from AuthContext
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
      alert("Please login to add items to wishlist.");
      return;
    }

    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      alert("Already in wishlist!");
      return;
    }

    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);

    try {
      await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });
      console.log("✅ Wishlist updated successfully!");
    } catch (error) {
      console.error("❌ Error updating wishlist:", error);
    }
  };

  // 🟢 Remove product from wishlist
  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);

    try {
      await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });
      console.log("✅ Removed from wishlist");
    } catch (error) {
      console.error("❌ Error removing from wishlist:", error);
    }
  };

  // 🟢 Toggle wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    exists ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
