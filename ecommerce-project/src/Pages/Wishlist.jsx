
import React, { useContext,useEffect,useState } from "react";
import { WishlistContext } from "../Context/WishListContext";
import { FaTrash, FaHeart, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import Navbar from "../Component/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
    const [touchDevice, setTouchDevice] = useState(false);

      useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    
       // Detect touch device
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

    // Confirmation dialog
    if (window.confirm("Are you sure you want to clear your entire wishlist? This action cannot be undone.")) {
      clearWishlist();
      toast.success("Wishlist cleared successfully");
    }
  };



  const handleRemoveItem = (item) => {
    removeFromWishlist(item.id);
    toast.info(`"${item.name}" removed from wishlist`);
  };
  const navigate=useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4 sm:hidden">
                          <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <FaArrowLeft />
                            <span>Back to shop</span>
                          </button>
                          <h1 className="text-xl font-semibold text-gray-900"></h1>
                          <div className="w-10"></div> {/* Spacer for balance */}
                        </div>
            <div className="flex items-center justify-center mb-4">
              <FaHeart className="text-red-500 text-4xl mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            <p className="text-gray-600">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <FaHeart className="text-gray-300 text-6xl mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-500 mb-4">Your wishlist is empty</h3>
              <p className="text-gray-400 mb-8">Start adding your favorite products to your wishlist</p>
              <button 
               onClick={()=>navigate("/shop")}
                className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Wishlist Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={item.images?.[0] || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                        title="Remove from wishlist"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-gray-900 mb-3">
                        ${item.price?.toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <FaTrash />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear All Button */}
              <div className="text-center">
                <button
                  onClick={handleClearWishlist}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  <FaExclamationTriangle />
                  Clear All Items
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  This will remove all items from your wishlist
                </p>
                <br></br>
                <button
                      onClick={() => navigate("/shop")}
                      className="w-full px-6 py-3  border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors duration-300 text-sm sm:text-base"
                    >
                      Continue Shopping
                    </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;