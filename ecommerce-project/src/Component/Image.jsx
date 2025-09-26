import React from "react";

const products = [
  {
    id: 1,
    name: "Classic Watch",
    price: "$120",
    image: "https://louris.wpbingosite.com/wp-content/uploads/2025/04/banner-13.jpg",
  },
  {
    id: 2,
    name: "Sporty Watch",
    price: "$150",
    image: "https://via.placeholder.com/200x200?text=Watch+2",
  },
  {
    id: 3,
    name: "Luxury Watch",
    price: "$350",
    image: "https://via.placeholder.com/200x200?text=Watch+3",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: "$200",
    image: "https://via.placeholder.com/200x200?text=Watch+4",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-yellow-400 text-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to ChronoMart</h1>
          <p className="text-lg mb-6">
            Explore our premium collection of watches and accessories.
          </p>
          <a
            href="#products"
            className="inline-block px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-900 transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-yellow-600 font-bold">{product.price}</p>
                  <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Join our Newsletter</h2>
        <p className="mb-6">Get updates on the latest products and special offers.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg text-gray-800 w-full sm:w-auto"
          />
          <button className="px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
