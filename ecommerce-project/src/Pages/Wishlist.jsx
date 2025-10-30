import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../Context/WishListContext";
import { FaTrash, FaHeart, FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import Navbar from "../Component/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    setTouchDevice(isTouchDevice());
  }, []);

  const handleClearWishlist = () => {
    if (wishlist.length === 0) {
      toast.info("Your wishlist is already empty");
      return;
    }

    if (window.confirm("Are you sure you want to clear your entire wishlist? This action cannot be undone.")) {
      clearWishlist();
      // toast.success("Wishlist cleared successfully");
    }
  };

  const handleRemoveItem = (item) => {
    removeFromWishlist(item.id);
    // toast.info(`"${item.name}" removed from wishlist`);
  };
  
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            {/* Mobile Back Button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-300 hover:text-[#FFEDA8] transition-colors px-4 py-2 rounded-lg border border-white/10 hover:border-[#FFEDA8]/30"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Back</span>
              </button>
              <div className="w-8"></div>
            </div>

            {/* Page Title */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mr-4 border border-[#FFEDA8]/20">
                  <FaHeart className="text-[#FFEDA8] text-xl" />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl lg:text-3xl font-light text-white">Saved Items</h1>
                  <p className="text-gray-300 text-sm mt-1">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your collection
                  </p>
                </div>
              </div>
            </div>
          </div>

          {wishlist.length === 0 ? (
            /* Empty State */
            <div className="max-w-md mx-auto text-center py-16">
              <div className="bg-[#002822]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-20 h-20 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FFEDA8]/20">
                  <FaHeart className="text-[#FFEDA8] text-2xl" />
                </div>
                <h3 className="text-xl font-light text-white mb-3">Your wishlist is empty</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  Start building your collection by adding luxury timepieces that catch your eye.
                </p>
                <button 
                  onClick={() => navigate("/shop")}
                  className="w-full bg-[#FFEDA8] text-[#003631] py-3 px-6 rounded-lg font-medium hover:bg-[#FFEDA8]/90 transition-colors duration-300 border border-[#FFEDA8]"
                >
                  Browse Collection
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Wishlist Items Grid */}
              <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#FFEDA8]/30 transition-all duration-300 overflow-hidden group"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-gradient-to-br from-[#003631] to-[#002822]">
                        <img
                          src={item.images?.[0] || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                          alt={item.name}
                          className="w-full h-full object-cover p-4"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002822] to-transparent opacity-60"></div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="absolute top-3 right-3 bg-[#003631]/90 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-red-500 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-red-500"
                          title="Remove from wishlist"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <h3 className="font-normal text-white mb-3 line-clamp-2 text-sm leading-relaxed">
                          {item.name}
                        </h3>
                        
                        {/* Brand and Category */}
                        <div className="flex items-center gap-2 mb-3">
                          {item.brand && (
                            <span className="text-xs font-medium text-[#FFEDA8] bg-[#FFEDA8]/10 px-2 py-1 rounded border border-[#FFEDA8]/20">
                              {item.brand}
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-light text-[#FFEDA8]">
                            ${item.price?.toLocaleString()}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <button
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="w-full bg-white/5 text-white py-2.5 rounded-lg hover:bg-white/10 transition-colors duration-300 text-sm font-medium border border-white/10 hover:border-white/20"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="w-full bg-red-500/10 text-red-400 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300 text-sm font-medium border border-red-500/20 hover:border-red-500 flex items-center justify-center gap-2"
                          >
                            <FaTrash className="text-xs" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-light text-white mb-2">Wishlist Management</h3>
                    <p className="text-gray-400 text-sm">
                      Manage your saved timepieces collection
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleClearWishlist}
                      className="w-full bg-red-500/10 text-red-400 py-3 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300 font-medium border border-red-500/20 hover:border-red-500 flex items-center justify-center gap-2"
                    >
                      <FaTrash />
                      Clear All Items
                    </button>
                    
                    <button
                      onClick={() => navigate("/shop")}
                      className="w-full bg-[#FFEDA8] text-[#003631] py-3 rounded-lg hover:bg-[#FFEDA8]/90 transition-colors duration-300 font-medium border border-[#FFEDA8] flex items-center justify-center gap-2"
                    >
                      <FaShoppingBag />
                      Continue Shopping
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-gray-400 text-xs">
                      {wishlist.length} items in your collection
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;