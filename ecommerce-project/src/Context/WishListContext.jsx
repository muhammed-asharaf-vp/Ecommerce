// import React, { createContext, useState, useEffect } from "react";
// import api from "../Api/Axios";

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
//   const userId = user ? user.id : null;

//   // 🟢 Fetch wishlist when user logs in
//   useEffect(() => {
//     if (userId) {
//       api
//         .get(`/users/${userId}`)
//         .then((res) => setWishlist(res.data.wishlist || []))
//         .catch((err) => console.error("Error loading wishlist:", err));
//     } else {
//       setWishlist([]); // clear wishlist if user logs out
//     }
//   }, [userId]);

//   // 🟢 Add product to wishlist
//   const addToWishlist = async (product) => {
//     if (!userId) {
//       alert("Please login to add items to your wishlist.");
//       return;
//     }

//     const exists = wishlist.find((item) => item.id === product.id);
//     if (exists) {
//       alert("Already in wishlist!");
//       return;
//     }

//     const updatedWishlist = [...wishlist, product];
//     setWishlist(updatedWishlist);

//     try {
//       await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });

//       // ✅ Update localStorage user
//       const updatedUser = { ...user, wishlist: updatedWishlist };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);

//       console.log("✅ Wishlist updated successfully!");
//     } catch (error) {
//       console.error("❌ Error updating wishlist:", error);
//     }
//   };

//   // 🟢 Remove product from wishlist
//   const removeFromWishlist = async (id) => {
//     const updatedWishlist = wishlist.filter((item) => item.id !== id);
//     setWishlist(updatedWishlist);

//     try {
//       await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });

//       // ✅ Update localStorage user
//       const updatedUser = { ...user, wishlist: updatedWishlist };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//     } catch (error) {
//       console.error("❌ Error removing from wishlist:", error);
//     }
//   };

//   // 🟢 Clear wishlist when user logs out
//   const clearWishlistOnLogout = () => {
//     setWishlist([]);
//     setUser(null);
//     localStorage.removeItem("user"); // remove user data
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         clearWishlistOnLogout,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../Api/Axios";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // ✅ get current user from AuthContext
  const userId = user?.id || null;

  const [wishlist, setWishlist] = useState([]);

  // Load wishlist when user logs in
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
      // PATCH the correct user
      await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });

      console.log("✅ Wishlist updated for correct user!");
    } catch (error) {
      console.error("❌ Error updating wishlist:", error);
    }
  };

  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);

    try {
      await api.patch(`/users/${userId}`, { wishlist: updatedWishlist });
    } catch (error) {
      console.error("❌ Error removing from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

