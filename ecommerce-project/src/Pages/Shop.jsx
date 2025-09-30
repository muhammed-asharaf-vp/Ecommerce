// Shop.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from db.json
  useEffect(() => {
    axios
      .get("http://localhost:5001/products") // JSON Server endpoint
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    
    <div className="max-w-7xl mx-auto px-4 py-10">
        <Navbar/>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 mt-9">
        Shop Watches
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-contain p-4 bg-gray-50"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-500 mt-1">{product.category}</p>
              <p className="text-gray-900 font-bold mt-2">${product.price}</p>

              <div className="mt-4 flex justify-between items-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
