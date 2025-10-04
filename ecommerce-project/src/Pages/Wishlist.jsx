// src/Pages/Wishlist.jsx
import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishListContext";
import { FaTrash } from "react-icons/fa";
import Navbar from "../Component/Navbar";

function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">My Wishlist ❤️</h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">No items in your wishlist.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg shadow-md p-4 text-center"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    ${item.price}
                  </p>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={clearWishlist}
                className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                Clear All
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Wishlist;
