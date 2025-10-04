import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaArrowLeft,
  FaStar,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { WishlistContext} from "../Context/WishListContext"
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

  // ✅ Show Alert
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // ✅ Fetch Product
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

  // ✅ Check if in wishlist
  const isInWishlist = () =>
    wishlist?.some((item) => item.id === product?.id);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!user) return navigate("/login");
    for (let i = 0; i < quantity; i++) addToCart(product);
    showAlert(`${quantity} ${product.name}(s) added to cart!`, "success");
  };

  // ✅ Loading UI
  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );

  // ✅ Error UI
  if (error || !product)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-center">
        <h2 className="text-3xl font-semibold mb-2">Product Not Found</h2>
        <p className="text-gray-400 mb-6">
          The product you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* ✅ Alert */}
      {alert && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm transition-transform duration-300 ${
            alert.type === "success"
              ? "bg-green-600"
              : alert.type === "error"
              ? "bg-red-600"
              : "bg-blue-600"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* ✅ Back Button */}
      <div className="px-6 py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors"
        >
          <FaArrowLeft /> Back to Shop
        </button>
      </div>

      {/* ✅ Product Details */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="flex justify-center items-center">
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-yellow-500/10 transition-all duration-500">
            <img
              src={product.images}
              alt={product.name}
              className="rounded-2xl object-contain w-[450px] h-[450px]"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl font-extrabold text-yellow-500 mb-3 tracking-wide">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              {product.rating && (
                <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold text-yellow-300">
                    {product.rating}
                  </span>
                </div>
              )}
              {product.category && (
                <span className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                  {product.category}
                </span>
              )}
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-white">
            ${product.price?.toFixed(2)}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {product.description || "No description available."}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border border-gray-700 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-800"
              >
                <FaMinus />
              </button>
              <span className="w-12 text-center text-lg font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-800"
              >
                <FaPlus />
              </button>
            </div>
            <div className="text-lg font-medium text-gray-300">
              Total: ${(product.price * quantity).toFixed(2)}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-500 text-black py-4 rounded-xl font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3 text-lg"
            >
              <FaCartPlus /> Add to Cart ({quantity})
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="px-8 py-4 border border-gray-700 rounded-xl font-semibold hover:bg-gray-800 flex items-center justify-center gap-3"
            >
              {isInWishlist() ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-xl" />
              )}
              Wishlist
            </button>
          </div>

          {/* Features */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-8">
            <h3 className="text-yellow-400 font-bold text-lg mb-4">
              ✨ Product Features
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-gray-400 text-sm">
              <li>✓ Premium Quality</li>
              <li>✓ Fast Shipping</li>
              <li>✓ Secure Packaging</li>
              <li>✓ Luxury Guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
