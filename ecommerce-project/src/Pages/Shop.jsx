// Shop.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";
import api from "../Api/Axios";

// Icons (you can use react-icons or SVG icons)
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState(new Set());
  const [hoveredImage, setHoveredImage] = useState(null);

  // Fetch products from db.json
  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const addToCart = (productId) => {
    setCart(prev => new Set(prev.add(productId)));
    // Add subtle animation feedback
    setTimeout(() => {
      setCart(prev => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    }, 600);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-6 shadow-lg"></div>
          <p className="text-xl font-light text-white tracking-wide">Curating Luxury Collection...</p>
          <p className="text-sm text-gray-400 mt-2">Experience timeless elegance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />
      
      {/* Premium Header with Dark Theme */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547996160-81dfd9c4b1cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg px-8 py-4 rounded-full mb-8 border border-white/10">
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-light tracking-widest text-gold-400">SWISS LUXURY TIMEPIECES</span>
          </div>
          
          <h1 className="text-7xl font-thin mb-6 tracking-tight text-white">
            RADO
            <span className="block text-2xl text-gold-400 mt-4 font-light tracking-widest">MASTERPIECE COLLECTION</span>
          </h1>
          
          <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300">
            Where Swiss precision meets timeless elegance. Discover watches that define luxury.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <input
              type="text"
              placeholder="Discover luxury timepieces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-8 py-5 pl-16 rounded-xl border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-500 bg-gray-800/80 backdrop-blur-sm shadow-2xl outline-none text-lg font-light placeholder-gray-400 text-white"
            />
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gold-500 transition-colors duration-300">
              <SearchIcon />
            </div>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                {filteredProducts.length} pieces
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-700/50 hover:border-gold-500/30"
            >
              {/* Brand Logo Badge */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-black/80 text-white text-xs font-bold px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                  RADO
                </div>
              </div>

              {/* Image Container with Hover Effect */}
              <div 
                className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black"
                onMouseEnter={() => setHoveredImage(product.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="h-80 flex items-center justify-center p-8 relative">
                  {/* Premium Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent transition-opacity duration-500 ${hoveredImage === product.id ? 'opacity-100' : 'opacity-0'}`}></div>
                  
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={`relative z-10 w-full h-full object-contain transition-all duration-700 ease-out ${
                      hoveredImage === product.id ? 'scale-110 brightness-110' : 'scale-100 brightness-90'
                    }`}
                  />
                  
                  {/* Quick View Overlay */}
                  <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 z-20 ${hoveredImage === product.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="bg-gold-500 text-black px-8 py-4 rounded-lg font-bold transform transition-all duration-300 hover:scale-105 hover:bg-gold-400 shadow-2xl border border-gold-300">
                      QUICK VIEW
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className={`absolute top-4 right-4 z-30 flex flex-col gap-2 transition-all duration-500 ${
                  hoveredImage === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-lg backdrop-blur-md border transition-all duration-300 ${
                      wishlist.has(product.id)
                        ? "bg-red-500 text-white border-red-500 scale-110 shadow-2xl"
                        : "bg-black/80 text-gray-300 border-gray-600 hover:bg-red-500 hover:text-white hover:scale-110 hover:shadow-xl"
                    }`}
                    title="Add to wishlist"
                  >
                    <HeartIcon filled={wishlist.has(product.id)} />
                  </button>

                  <button
                    onClick={() => addToCart(product.id)}
                    className={`p-3 rounded-lg backdrop-blur-md border transition-all duration-300 ${
                      cart.has(product.id)
                        ? "bg-green-500 text-white border-green-500 scale-110 shadow-2xl animate-pulse"
                        : "bg-black/80 text-gray-300 border-gray-600 hover:bg-green-500 hover:text-white hover:scale-110 hover:shadow-xl"
                    }`}
                    title="Add to cart"
                  >
                    <CartIcon />
                  </button>
                </div>
              </div>

              {/* Product Info - Premium Layout */}
              <div className="p-6 relative">
                {/* Watch Name */}
                <div className="mb-4">
                  <h3 className="text-lg font-light text-gray-300 mb-1 tracking-wide">RADO</h3>
                  <h2 className="text-2xl font-normal text-white mb-2 leading-tight">
                    {product.name}
                  </h2>
                  <div className="w-12 h-0.5 bg-gold-500 mb-3"></div>
                </div>

                {/* Collection Badge */}
                <div className="mb-6">
                  <span className="text-xs font-medium text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                    {product.category} COLLECTION
                  </span>
                </div>
                
                {/* Price and CTA */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                  <div className="flex flex-col">
                    <span className="text-3xl font-light text-gold-400">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">Swiss Made</span>
                  </div>
                  <button className="bg-gradient-to-r from-gold-500 to-gold-600 text-black px-8 py-4 rounded-lg font-bold hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gold-300">
                    ACQUIRE
                  </button>
                </div>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold-500/20 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-700">
              <div className="text-4xl text-gold-400">⌚</div>
            </div>
            <h3 className="text-2xl font-light text-white mb-3">No Timepieces Found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Explore our complete RADO collection for luxury Swiss timepieces.
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="bg-gold-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-gold-400 transition-colors duration-300 border border-gold-300"
            >
              VIEW ALL COLLECTIONS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;