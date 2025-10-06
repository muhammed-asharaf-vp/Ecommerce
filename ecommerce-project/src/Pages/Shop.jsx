import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import api from "../Api/Axios";
import { WishlistContext } from "../Context/WishListContext";
import { CartContext } from "../Context/CartContext";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
    />
  </svg>
);

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states - only brands now
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Contexts
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // Brands only
  const brands = ["ALL", "RADO", "ROLEX", "OMEGA", "TAG HEUER", "CARTIER"];

  // Fetch products
  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Wishlist toggle
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    exists ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  // Brand filter handler
  const handleBrandFilter = (brand) => {
    if (brand === "ALL") {
      setSelectedBrands([]);
    } else {
      setSelectedBrands((prev) =>
        prev.includes(brand)
          ? prev.filter((b) => b !== brand)
          : [...prev, brand]
      );
    }
  };

  // ✅ Simplified filtered products logic - only brand and search
  const filteredProducts = products.filter((product) => {
    //  Search filter
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase());

    //  Brand filter
    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) =>
        product.brand?.toLowerCase().includes(brand.toLowerCase()) ||
        product.name?.toLowerCase().includes(brand.toLowerCase())
      );

    // Return only products that match both filters
    return matchesSearch && matchesBrand;
  });

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSearchTerm("");
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black to-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6 shadow-lg"></div>
          <p className="text-xl font-light text-white tracking-wide">
            Curating Luxury Collection...
          </p>
          <p className="text-sm text-gray-400 mt-2">Experience timeless elegance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547996160-81dfd9c4b1cd?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg px-8 py-4 rounded-full mb-8 border border-white/10">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-light tracking-widest text-yellow-400">
              LUXURY TIMEPIECES
            </span>
          </div>

          <h1 className="text-7xl font-thin mb-6 tracking-tight text-white">
            veloce
            <span className="block text-2xl text-yellow-400 mt-4 font-light tracking-widest">
              MASTERPIECE COLLECTION
            </span>
          </h1>

          <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300">
            Where Swiss precision meets timeless elegance. Discover watches that define luxury.
          </p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 -mt-10 relative z-10">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <input
              type="text"
              placeholder="Discover luxury timepieces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-8 py-5 pl-16 rounded-xl border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-500 bg-gray-800/80 backdrop-blur-sm shadow-2xl outline-none text-lg font-light placeholder-gray-400 text-white"
            />
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-300">
              <SearchIcon />
            </div>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-4">
              {/* <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                {filteredProducts.length} pieces
              </span> */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 transition-colors duration-300"
              >
                <FilterIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700 shadow-2xl">
            {/* Active Filters */}
            {selectedBrands.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-400">Active filters:</span>
                  {selectedBrands.map(brand => (
                    <span key={brand} className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {brand}
                      <button onClick={() => handleBrandFilter(brand)} className="hover:text-gray-700">×</button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Brand Filters */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">BRANDS</h3>
              <div className="flex flex-wrap gap-3">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandFilter(brand)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 font-medium ${
                      (brand === "ALL" && selectedBrands.length === 0) || 
                      selectedBrands.includes(brand)
                        ? "bg-yellow-500 text-black border-yellow-500 shadow-lg transform scale-105"
                        : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-yellow-400"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {/* Brand Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {brands.filter(brand => brand !== "ALL").map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandFilter(brand)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedBrands.includes(brand)
                    ? "bg-yellow-500 text-black border-yellow-500 shadow-lg"
                    : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-yellow-400"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            const isInCart = cart.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-700/50 hover:border-yellow-500/50"
              >
                {/* Product Image */}
                <div
                  className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black"
                  onMouseEnter={() => setHoveredImage(product.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <div className="h-80 flex items-center justify-center p-8 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent transition-opacity duration-500 ${
                        hoveredImage === product.id ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`relative z-10 w-full h-full object-contain transition-all duration-700 ease-out ${
                        hoveredImage === product.id
                          ? "scale-110 brightness-110"
                          : "scale-100 brightness-90"
                      }`}
                    />
                  </div>

                  {/* Wishlist + View buttons */}
                  <div
                    className={`absolute top-4 right-4 z-30 flex flex-col gap-2 transition-all duration-500 ${
                      hoveredImage === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                    }`}
                  >
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3 rounded-lg backdrop-blur-md border transition-all duration-300 ${
                        isWishlisted
                          ? "bg-red-500 text-white border-red-500 scale-110 shadow-2xl"
                          : "bg-black/80 text-gray-300 border-gray-600 hover:bg-red-500 hover:text-white hover:scale-110 hover:shadow-xl"
                      }`}
                      title="Add to wishlist"
                    >
                      <FaHeart className={`text-lg ${isWishlisted ? "text-white" : "text-gray-300"}`} />
                    </button>

                    {/* View */}
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="p-3 rounded-lg backdrop-blur-md border bg-black/80 text-gray-300 border-gray-600 hover:bg-yellow-500 hover:text-black hover:scale-110 hover:shadow-xl transition-all duration-300"
                      title="View Product"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 relative">
                  <h2 className="text-2xl font-normal text-white mb-2 leading-tight">{product.name}</h2>
                  <div className="w-12 h-0.5 bg-yellow-500 mb-3"></div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.brand && (
                      <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                        {product.brand}
                      </span>
                    )}
                    {product.category && (
                      <span className="text-xs font-medium text-gray-300 bg-gray-700 px-3 py-1 rounded-full border border-gray-600">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-700/50">
                    <span className="text-3xl font-light text-yellow-400">${product.price}</span>

                    {/* Cart */}
                    <button
                      onClick={() =>
                        isInCart ? removeFromCart(product.id) : addToCart(product)
                      }
                      className={`p-4 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-yellow-300`}
                      title={isInCart ? "Remove from cart" : "Add to cart"}
                    >
                      <CartIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-700">
              <div className="text-4xl text-yellow-400">⌚</div>
            </div>
            <h3 className="text-2xl font-light text-white mb-3">
              No Timepieces Found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Try adjusting your filters or search terms to discover our luxury collection.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-300 border border-yellow-300"
            >
              VIEW ALL COLLECTIONS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

