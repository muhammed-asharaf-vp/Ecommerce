import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShippingFast,
  FaHeadset,
  FaUndo,
  FaCreditCard,
  FaArrowRight,
  FaAward,
  FaHeart,
  FaShoppingBag,
  FaInstagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const images = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=3840&q=80",
  "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=3840&q=80",
  "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=3840&q=80",
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[#003631]/80 via-[#003631]/40 to-[#003631]/80 z-10" />

      <div
        className="relative z-20 flex flex-col items-center justify-center h-full text-white px-8 text-center"
        data-aos="zoom-in"
      >
        <div className="mb-6" data-aos="fade-down">
          <span className="text-[#FFEDA8] text-sm font-light tracking-[0.3em] uppercase">
            Luxury Timepieces
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight"
          data-aos="fade-up"
        >
          TIMELESS <br />
          <span className="italic">ELEGANCE</span>
        </h1>

        <p
          className="text-lg md:text-xl text-gray-200 mb-12 font-light max-w-3xl leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Where precision engineering meets artistic craftsmanship. Discover
          watches that transcend time and become heirlooms for generations to
          come.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <button
            onClick={() => navigate("/Shop")}
            className="bg-[#FFEDA8] text-[#003631] px-12 py-4 font-medium rounded-sm hover:bg-[#FFEDA8]/90 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-2xl text-lg flex items-center gap-3 group"
          >
            <span>EXPLORE COLLECTION</span>
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => navigate("/About")}
            className="border-2 border-white text-white px-12 py-4 font-medium rounded-sm hover:bg-white hover:text-[#003631] transition-all duration-300 text-lg"
          >
            OUR HERITAGE
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "bg-[#FFEDA8] w-12"
                : "bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-[#003631]/40 p-4 rounded-sm hover:bg-[#003631]/60 transition-all duration-300 backdrop-blur-sm z-30 border border-white/20 hover:border-[#FFEDA8]"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-[#003631]/40 p-4 rounded-sm hover:bg-[#003631]/60 transition-all duration-300 backdrop-blur-sm z-30 border border-white/20 hover:border-[#FFEDA8]"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export function FeaturesBar() {
  const features = [
    {
      icon: <FaShippingFast className="text-2xl" />,
      title: "Complimentary Delivery",
      desc: "Free worldwide shipping & insured returns",
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: "Personal Concierge",
      desc: "24/7 dedicated luxury support",
    },
    {
      icon: <FaUndo className="text-2xl" />,
      title: "Hassle-Free Returns",
      desc: "30-day premium exchange policy",
    },
    {
      icon: <FaCreditCard className="text-2xl" />,
      title: "Secure Payment",
      desc: "Encrypted luxury transactions",
    },
  ];

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="w-full bg-[#003631] py-16 border-y border-[#FFEDA8]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-8">
        {features.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center text-[#FFEDA8] transition-all duration-500 group-hover:bg-[#FFEDA8] group-hover:text-[#003631] group-hover:scale-110 group-hover:rotate-12 border border-[#FFEDA8]/20">
                {item.icon}
              </div>
            </div>
            <h3 className="text-white text-xl font-medium mb-4 tracking-wide group-hover:text-[#FFEDA8] transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              {item.desc}
            </p>
            <div className="w-0 h-0.5 bg-[#FFEDA8] mt-6 transition-all duration-500 group-hover:w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryBoxes() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "RADO",
      subtitle: "Swiss Precision",
      image:
        "https://i.pinimg.com/1200x/9b/f3/a8/9bf3a86d8818f88d127dc87657d888d8.jpg",
      brand: "RADO",
    },
    {
      title: "OMEGA",
      subtitle: "Luxury Heritage",
      image:
        "https://i.pinimg.com/1200x/78/a8/cd/78a8cd25504b9f5c71d5779702680fb2.jpg",
      brand: "OMEGA",
    },
  ];

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleBrandNavigation = (brand) => {
    navigate("/Shop", {
      state: {
        selectedBrand: brand,
        scrollToFilters: true,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-20" data-aos="fade-up">
        <h2 className="text-5xl font-light text-[#003631] mb-6">
          HERITAGE BRANDS
        </h2>
        <div className="w-24 h-1 bg-[#FFEDA8] mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto font-light leading-relaxed">
          Discover our curated selection of timepieces from the world's most
          prestigious watchmakers, each telling a story of exceptional
          craftsmanship and timeless design.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            data-aos="zoom-in"
            data-aos-delay={idx * 150}
            onClick={() => handleBrandNavigation(cat.brand)}
            className="relative group overflow-hidden rounded-sm cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-700"
          >
            <div className="relative h-[600px] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003631]/90 via-[#003631]/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white transform translate-y-0 group-hover:-translate-y-4 transition-transform duration-700">
              <span className="text-[#FFEDA8] text-base font-light tracking-[0.3em] uppercase block mb-4">
                {cat.subtitle}
              </span>
              <h3 className="text-5xl font-light mb-8">{cat.title}</h3>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFEDA8]/40 transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewArrivals() {
  const navigate = useNavigate();

  const newProducts = [
    {
      id: 1,
      name: "ROLEX",
      model: "Submariner Date",
      price: "$8,500",
      isNew: true,
      image:
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "TAG HEUER",
      model: "Carrera Chronograph",
      price: "$4,200",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/12/c4/8e/12c48e97f2c9d8cdd63686d700b86efc.jpg",
    },
    {
      id: 3,
      name: "OMEGA",
      model: "Navitimer Classic",
      price: "$6,800",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/74/73/c2/7473c2cf20793fce26a4e9f4995ea473.jpg",
    },
    {
      id: 4,
      name: "CARTIER",
      model: "Calatrava",
      price: "$22,000",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/8c/d9/65/8cd9654787c5ea8eff46e8bdd4be78b4.jpg",
    },
  ];

  const handleProductNavigation = (productName) => {
    navigate("/Shop", {
      state: {
        selectedBrand: productName,
        scrollToFilters: true,
      },
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-24 bg-white">
      <div className="text-center mb-20" data-aos="fade-up">
        <h2 className="text-5xl font-light text-[#003631] mb-6">
          NEW ARRIVALS
        </h2>
        <div className="w-24 h-1 bg-[#FFEDA8] mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto font-light">
          Discover the latest additions to our exclusive collection of luxury
          timepieces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {newProducts.map((product, index) => (
          <div
            key={product.id}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="group relative bg-white border border-gray-100 rounded-sm hover:shadow-2xl transition-all duration-500"
          >
            {product.isNew && (
              <div className="absolute top-4 left-4 z-20 bg-[#FFEDA8] text-[#003631] px-3 py-1 text-sm font-medium tracking-wide">
                NEW
              </div>
            )}
            <div className="relative h-80 overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-[#003631] text-lg mb-1">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm font-light mb-3">
                {product.model}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#003631] font-semibold text-lg">
                  {product.price}
                </span>
                <button
                  onClick={() => handleProductNavigation(product.name)}
                  className="bg-[#003631] text-white p-2 rounded-sm hover:bg-[#003631]/90 transition-colors duration-300"
                >
                  <FaShoppingBag className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="bg-[#003631] py-20" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <FaAward className="text-[#FFEDA8] text-4xl mx-auto mb-6" />
        <h2 className="text-4xl font-light text-white mb-6">
          JOIN OUR INNER CIRCLE
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto font-light">
          Be the first to discover new collections, exclusive events, and
          special offers reserved for our most discerning clients.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-sm focus:outline-none focus:border-[#FFEDA8] transition-colors duration-300"
            required
          />
          <button
            type="submit"
            className="bg-[#FFEDA8] text-[#003631] px-8 py-4 font-medium rounded-sm hover:bg-[#FFEDA8]/90 transition-all duration-300 whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 font-light">
          By subscribing, you agree to our Privacy Policy
        </p>
      </div>
    </section>
  );
}

export function InstagramFeed() {
  const instagramPosts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      likes: "2.4k",
      comments: "128",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      likes: "1.8k",
      comments: "96",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      likes: "3.2k",
      comments: "214",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/8c/d9/65/8cd9654787c5ea8eff46e8bdd4be78b4.jpg",
      likes: "2.1k",
      comments: "142",
    },
    {
      id: 5,
      image:
        "https://i.pinimg.com/1200x/e7/00/aa/e700aabaacce3c1b199734c9e4980080.jpg",
      likes: "1.9k",
      comments: "118",
    },
    {
      id: 6,
      image:
        "https://i.pinimg.com/1200x/94/36/af/9436afda5b3be5667d4f42656fb99fe8.jpg",
      likes: "2.7k",
      comments: "167",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-24 bg-white">
      <div className="text-center mb-16" data-aos="fade-up">
        <FaInstagram className="text-[#003631] text-3xl mx-auto mb-6" />
        <h2 className="text-4xl font-light text-[#003631] mb-6">FOLLOW US</h2>
        <div className="w-20 h-1 bg-[#FFEDA8] mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
          Join our community of watch enthusiasts and discover the latest behind
          the scenes
        </p>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#003631] font-medium mt-4 hover:text-[#FFEDA8] transition-colors duration-300"
        >
          @velocetimepeice
          <FaArrowRight className="text-sm" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {instagramPosts.map((post, index) => (
          <div
            key={post.id}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="relative group overflow-hidden rounded-sm cursor-pointer"
          >
            <img
              src={post.image}
              alt="Instagram post"
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#003631]/0 group-hover:bg-[#003631]/80 transition-all duration-500 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white text-center">
                <FaHeart className="mx-auto mb-2" />
                <span className="text-sm">{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
