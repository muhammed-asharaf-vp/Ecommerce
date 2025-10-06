
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight , FaShippingFast, FaHeadset, FaUndo, FaCreditCard  } from "react-icons/fa";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";



const images = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=3840&q=80",
  "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=3840&q=80",
  "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=3840&q=80",
];

function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate=useNavigate();

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Previous Slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">MEETS PRESTIGE</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Classic Wristwatch Designs Always Have A Timeless Appeal And Are
          Indispensable Accessories.
        </p>
        <button onClick={()=>navigate("/Shop")} className="bg-white text-black px-6 py-3 font-semibold rounded shadow hover:bg-gray-200 transition">
          SHOP NOW
        </button>
      </div>
      

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/40 p-2 rounded-full hover:bg-black/60 transition z-30"
      >
        <FaChevronLeft />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/40 p-2 rounded-full hover:bg-black/60 transition z-30"
      >
        <FaChevronRight />
      </button>
     
    </div>
  );
}

export default HeroSlider;


// FeaturesBar.jsx




export function FeaturesBar() {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Free Delivery",
      desc: "Free Shipping and Returns",
    },
    {
      icon: <FaHeadset />,
      title: "Online Support",
      desc: "Available 24/7 for help",
    },
    {
      icon: <FaUndo />,
      title: "Easy Returns",
      desc: "30 Days Return Policy",
    },
    {
      icon: <FaCreditCard />,
      title: "Flexible Payment",
      desc: "Visa, MasterCard, ApplePay & more",
    },
  ];

  return (
    <div className="w-full bg-white py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center px-4">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center group">
            {/* Icon */}
            <div className="text-3xl text-gray-600 transition-transform transform group-hover:scale-110 group-hover:text-yellow-500">
              {item.icon}
            </div>
            {/* Title */}
            <h3 className="mt-3 text-base font-medium text-gray-900">
              {item.title}
            </h3>
            {/* Description */}
            <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// CategoryBoxes.jsx


export  function CategoryBoxes() {
  const categories = [
    {
     
      title: "Rado",
      image:
       "https:imgs.search.brave.com/lbMknnaNB7Vw7D7wQpPPyUroq2Q6y-aOnoRjgegSlVQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9t/YW4tbG9va2luZy1o/aXMtd2F0Y2hfNTM4/NzYtMTM1MDMuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw", // Men's watch image
    },
    {
      
      title: "Rolex Lady-Datejust 28",
      image:
      "https://imgs.search.brave.com/TkazzKvLARmptWl4NqeKktXk0E36F_fLkkHtRTyC04Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzQ1LzQzLzM0/LzM2MF9GXzc0NTQz/MzQ0Nl9vdzI2S2RI/QXI4UDFBUHhyYm1G/dDdXRFhjTDRmeTQ2/ei5qcGc", // Women's watch image
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="relative group overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="w-full h-[400px] object-cover transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-2xl font-bold">{cat.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
// TopRating.jsx


const products = [
  {
    id: 1,
    name: "DANIEL WELLINGTON",
    img: "https://images.unsplash.com/photo-1576071790597-35f303f7ff59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    discount: "20% OFF",
    hot: true,
  },
  {
    id: 2,
    name: "MASERATI",
    img: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    discount: "17% OFF",
  },
  {
    id: 3,
    name: "MASERATI",
    img: "https://images.unsplash.com/photo-1625225233840-695456021cde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    discount: "17% OFF",
  },
  {
    id: 4,
    name: "DANIEL WELLINGTON",
    img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export  function TopRating() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">TOP RATING</h2>
        <button className="text-sm font-medium border-b border-black">
          VIEW ALL
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-50 p-4 relative group">
            {/* Discount Badge */}
            {product.discount && (
              <span
                className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 ${
                  product.hot
                    ? "bg-red-700 text-white"
                    : "bg-black text-white"
                }`}
              >
                {product.hot && "HOT "}
                {product.discount}
              </span>
            )}

            {/* Product Image */}
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Brand */}
            <p className="text-sm text-gray-600 mt-3 text-center font-medium">
              {product.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

