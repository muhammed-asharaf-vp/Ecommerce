import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaArrowLeft,
  FaStar,
  FaMinus,
  FaPlus,
  FaBolt,
  FaUndo,
  FaCheck,
  FaGem,
  FaCrown,
  FaExpand,
  FaFire,
  FaRocket,
  FaUserTie,
  FaLock
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishListContext";
import api from "../Api/Axios";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [counter, setCounter] = useState(0);
   const [touchDevice, setTouchDevice] = useState(false);

  const productRef = useRef(null);
  const imageRef = useRef(null);

  // Show Alert with impressive animation
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (location.state?.product) {
          setProduct(location.state.product);
          setLoading(false);
          return;
        }
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, location.state]);

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

  // Auto-increment counter for impressive stats
  useEffect(() => {
    if (product && counter < 100) {
      const timer = setTimeout(() => {
        setCounter(prev => Math.min(prev + 5, 100));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [product, counter]);

  // Check if in wishlist
  const isInWishlist = () =>
    wishlist?.some((item) => item.id === product?.id);

  // Add to Cart with impressive feedback
  const handleAddToCart = () => {
    if (!user) return navigate("/login");
    for (let i = 0; i < quantity; i++) addToCart(product);
    
    // Create particle effect
    createParticles();
    showAlert(`🎉 ${quantity} ${product.name}(s) added to cart!`, "success");
  };

  // Buy Now Function
  const handleBuyNow = () => {
    if (!user) return navigate("/login");
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    createParticles();
    showAlert(`⚡ Proceeding to secure checkout!`, "success");
    
    setTimeout(() => {
      navigate("/payment");
    }, 1500);
  };

  // Create impressive particle effect
  const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fixed inset-0 pointer-events-none z-50';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-[#FFEDA8] rounded-full';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.opacity = '1';
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 100;
      const duration = 1000 + Math.random() * 500;
      
      particle.style.transition = `all ${duration}ms ease-out`;
      particlesContainer.appendChild(particle);
      
      setTimeout(() => {
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        particle.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        particle.remove();
      }, duration + 100);
    }
    
    setTimeout(() => {
      particlesContainer.remove();
    }, 2000);
  };

  // Loading UI - Ultra impressive
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002822] via-[#003631] to-[#001F1A] flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#FFEDA8]/5 to-transparent animate-pulse rounded-full"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#FFEDA8]/5 to-transparent animate-pulse rounded-full"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-[#FFEDA8]/30 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-[#FFEDA8] rounded-full animate-spin"></div>
            <FaGem className="absolute inset-0 m-auto text-[#FFEDA8] text-2xl animate-pulse" />
          </div>
          <p className="text-[#FFEDA8] font-light mt-6 text-lg animate-pulse">
            Curating Your Premium Experience...
          </p>
        </div>
      </div>
    );

  // Error UI - Impressive
  if (error || !product)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002822] via-[#003631] to-[#001F1A] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e1f961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="text-center max-w-2xl mx-6 relative z-10">
          <div className="w-32 h-32 bg-gradient-to-br from-[#FFEDA8] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <FaCrown className="text-[#002822] text-4xl" />
          </div>
          <h2 className="text-5xl font-light text-white mb-6 bg-gradient-to-r from-[#FFEDA8] to-[#FFD700] bg-clip-text text-transparent">
            Exclusive Product Unavailable
          </h2>
          <p className="text-gray-300 mb-10 leading-relaxed text-lg">
            This masterpiece is currently being curated for our exclusive collection. 
            Explore our other luxury items while we prepare this exceptional piece.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-gradient-to-r from-[#FFEDA8] to-[#FFD700] text-[#002822] px-12 py-5 rounded-2xl hover:shadow-2xl hover:shadow-[#FFEDA8]/30 transition-all duration-500 font-semibold text-lg hover:scale-105 transform"
          >
            Discover Luxury Collection
          </button>
        </div>
      </div>
    );

  // Mock product images for gallery
  const productImages = product.images ? [product.images, product.images, product.images] : [];
  return (
    
    
    <div 
    
      ref={productRef}
      className="min-h-screen bg-gradient-to-br from-[#002822] via-[#003631] to-[#001F1A] text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#FFEDA8]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-[#FFEDA8]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#FFEDA8]/2 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Luxury Alert */}
      {alert && (
        <div
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 backdrop-blur-lg border ${
            alert.type === "success"
              ? "bg-gradient-to-r from-green-900/90 to-green-800/90 border-[#FFEDA8]"
              : "bg-gradient-to-r from-red-900/90 to-red-800/90 border-[#FFEDA8]"
          } transition-all duration-500 animate-in slide-in-from-top`}
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#FFEDA8] rounded-full animate-pulse"></div>
            <p className="font-semibold text-lg flex-1">{alert.message}</p>
            <FaFire className="text-[#FFEDA8] text-xl" />
          </div>
        </div>
      )}

      {/* Luxury Navigation */}
      <div className="relative z-20 px-8 py-6 border-b border-[#004D44]/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-4 text-gray-300 hover:text-[#FFEDA8] transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#004D44] to-[#003631] rounded-2xl flex items-center justify-center group-hover:from-[#FFEDA8] group-hover:to-[#FFD700] group-hover:scale-110 transition-all duration-500 shadow-2xl">
                <FaArrowLeft className="text-sm group-hover:text-[#002822] transition-colors duration-500" />
              </div>
              <span className="font-medium text-lg">Back to Luxury Collection</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Product Showcase */}
      <div className="container mx-auto px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
          
          {/* Luxury Image Gallery */}
          <div className="space-y-8">
            {/* Main Image with Zoom */}
            <div 
              ref={imageRef}
              className="relative bg-gradient-to-br from-[#003631] to-[#002822] rounded-3xl p-8 shadow-2xl border border-[#004D44] hover:border-[#FFEDA8]/30 transition-all duration-700 group cursor-zoom-in"
              onClick={() => setIsImageZoomed(!isImageZoomed)}
            >
              {/* Zoom Indicator */}
              <div className="absolute top-6 right-6 z-10">
                <div className="w-12 h-12 bg-[#002822] rounded-full flex items-center justify-center border border-[#FFEDA8]/20 group-hover:bg-[#FFEDA8] group-hover:text-[#002822] transition-all duration-500">
                  <FaExpand className="text-sm" />
                </div>
              </div>
              
              {/* Image with Glow Effect */}
              <div className="relative">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className={`rounded-2xl object-cover w-full transition-all duration-700 ${
                    isImageZoomed ? 'scale-150 transform-gpu' : 'group-hover:scale-105'
                  }`}
                />
                {/* Glow overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFEDA8]/0 via-transparent to-[#FFEDA8]/0 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
            </div>

            {/* Ultimate Features Showcase - MOVED TO LEFT SIDE */}
            <div className="bg-gradient-to-br from-[#003631] to-[#002822] border-2 border-[#004D44] rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-light text-[#FFEDA8] mb-6 flex items-center gap-3">
                <FaCrown className="text-[#FFEDA8] animate-pulse" />
                Ultimate Luxury Features
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Handcrafted by master artisans",
                  "Sustainable luxury materials",
                  "24/7 personal concierge",
                  "Certificate of authenticity",
                  "Global white-glove delivery",
                  "Flexible payment plans",
                  "Exclusive member benefits",
                  "Carbon neutral footprint"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300 group hover:text-[#FFEDA8] transition-all duration-300">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#FFEDA8] to-[#FFD700] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <FaCheck className="text-[#002822] text-xs" />
                    </div>
                    <span className="text-sm font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Luxury Product Information */}
          <div className="space-y-10">
            {/* Premium Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-gradient-to-r from-[#FFEDA8] to-[#FFD700] rounded-full animate-pulse"></div>
                <span className="text-[#FFEDA8] font-semibold uppercase tracking-widest text-sm bg-gradient-to-r from-[#FFEDA8]/10 to-transparent px-4 py-2 rounded-full border border-[#FFEDA8]/20">
                  Limited Edition
                </span>
              </div>
              
              <h1 className="text-6xl font-light text-white leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6">
                {product.rating && (
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#FFEDA8]/10 to-[#FFD700]/10 px-6 py-3 rounded-2xl border border-[#FFEDA8]/20">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-[#FFEDA8] text-lg" />
                      <FaStar className="text-[#FFEDA8] text-lg" />
                      <FaStar className="text-[#FFEDA8] text-lg" />
                      <FaStar className="text-[#FFEDA8] text-lg" />
                      <FaStar className="text-[#FFEDA8] text-lg" />
                    </div>
                    <span className="font-bold text-[#FFEDA8] text-lg">
                      {product.rating}/5.0
                    </span>
                  </div>
                )}
                
                {product.category && (
                  <span className="bg-gradient-to-r from-[#004D44] to-[#003631] text-[#FFEDA8] px-6 py-3 rounded-2xl text-sm font-semibold uppercase tracking-widest border border-[#FFEDA8]/10">
                    {product.category}
                  </span>
                )}
              </div>
            </div>

            {/* Luxury Description */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-[#FFEDA8] flex items-center gap-3">
                <FaGem className="text-[#FFEDA8] animate-pulse" />
                Masterpiece Description
              </h3>
              <p className="text-gray-300 leading-relaxed text-xl font-light">
                {product.description || "An exquisite masterpiece crafted with unparalleled attention to detail. This premium offering represents the pinnacle of luxury and sophistication, designed for those who appreciate true excellence."}
              </p>
            </div>

            {/* Luxury Pricing */}
            <div className="space-y-4">
              <div className="text-5xl font-light text-[#FFEDA8] bg-gradient-to-r from-[#FFEDA8] to-[#FFD700] bg-clip-text text-transparent">
                ${product.price?.toFixed(2)}
              </div>
              <div className="text-gray-400 text-lg font-light">
                All taxes included • Free worldwide shipping • 24/7 concierge service
              </div>
            </div>

            {/* Luxury Quantity Selector */}
            <div className="space-y-6">
              <h4 className="text-xl font-light text-[#FFEDA8]">Select Quantity</h4>
              <div className="flex items-center gap-8">
                <div className="flex items-center border-2 border-[#004D44] rounded-3xl bg-gradient-to-br from-[#003631] to-[#002822] overflow-hidden shadow-2xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-16 h-16 flex items-center justify-center text-gray-300 hover:bg-[#004D44] hover:text-[#FFEDA8] transition-all duration-300 hover:scale-110"
                  >
                    <FaMinus className="text-xl" />
                  </button>
                  <span className="w-20 text-center text-2xl font-bold text-[#FFEDA8]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-16 h-16 flex items-center justify-center text-gray-300 hover:bg-[#004D44] hover:text-[#FFEDA8] transition-all duration-300 hover:scale-110"
                  >
                    <FaPlus className="text-xl" />
                  </button>
                </div>
                <div className="text-2xl font-bold text-[#FFEDA8]">
                  Total: ${(product.price * quantity).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Luxury Action Buttons */}
            <div className="space-y-6 pt-8">
              {/* Ultra Premium Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-[#FFEDA8] via-[#FFD700] to-[#FFEDA8] text-[#002822] py-6 rounded-3xl font-bold text-xl hover:shadow-2xl hover:shadow-[#FFEDA8]/40 transition-all duration-500 flex items-center justify-center gap-6 transform hover:scale-[1.02] group relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <FaBolt className="text-[#002822] text-2xl group-hover:scale-125 transition-transform duration-300 z-10" />
                <span className="z-10">BUY NOW</span>
              </button>

              {/* Secondary Luxury Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-br from-[#003631] to-[#002822] text-[#FFEDA8] border-2 border-[#FFEDA8]/30 py-5 rounded-3xl font-semibold hover:bg-gradient-to-br hover:from-[#FFEDA8] hover:to-[#FFD700] hover:text-[#002822] transition-all duration-500 flex items-center justify-center gap-4 text-lg group hover:scale-105 transform shadow-2xl"
                >
                  <FaCartPlus className="group-hover:scale-110 transition-transform duration-300" />
                  Add to Luxury Cart
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(product);
                    createParticles();
                  }}
                  className="bg-gradient-to-br from-[#003631] to-[#002822] text-gray-300 border-2 border-[#004D44] py-5 rounded-3xl font-semibold hover:border-[#FFEDA8] hover:text-[#FFEDA8] transition-all duration-500 flex items-center justify-center gap-4 text-lg group hover:scale-105 transform shadow-2xl"
                >
                  {isInWishlist() ? (
                    <FaHeart className="text-[#FFEDA8] text-xl group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <FaRegHeart className="text-xl group-hover:scale-110 transition-transform duration-300" />
                  )}
                  Curate Wishlist
                </button>
              </div>
            </div>

            {/* Ultra Premium Features Grid - MOVED TO RIGHT SIDE */}
            <div className="grid grid-cols-2 gap-6 pt-10">
              {[
                { icon: FaRocket, title: "Express Shipping", desc: "Next Day Delivery", color: "from-blue-400 to-cyan-400" },
                { icon: FaUndo, title: "Easy Returns", desc: "365-Day Policy", color: "from-green-400 to-emerald-400" },
                { icon: FaLock, title: "Secure Warranty", desc: "Lifetime Coverage", color: "from-purple-400 to-pink-400" },
                { icon: FaUserTie, title: "VIP Treatment", desc: "Priority Support", color: "from-yellow-400 to-orange-400" },
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-[#003631] to-[#002822] border-2 border-[#004D44] rounded-3xl p-6 text-center hover:border-[#FFEDA8]/30 transition-all duration-500 group hover:scale-105 transform cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="text-white text-2xl" />
                  </div>
                  <div className="text-[#FFEDA8] font-bold text-sm mb-2">{feature.title}</div>
                  <div className="text-gray-300 text-xs">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Luxury Elements */}
      <div className="fixed bottom-8 right-8 z-30 space-y-4">
        <div className="bg-gradient-to-br from-[#FFEDA8] to-[#FFD700] text-[#002822] p-4 rounded-2xl shadow-2xl animate-bounce">
          <FaFire className="text-2xl" />
        </div>
        <div className="bg-gradient-to-br from-[#003631] to-[#002822] border-2 border-[#FFEDA8] text-[#FFEDA8] p-4 rounded-2xl shadow-2xl animate-pulse">
          <FaGem className="text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default Product;