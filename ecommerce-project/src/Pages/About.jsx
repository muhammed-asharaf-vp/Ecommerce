import React from 'react';
import Navbar from '../Component/Navbar';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfd58739c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Watch Collection"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 sm:mb-8 border-2 border-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-2xl sm:text-3xl font-bold font-serif">T</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light mb-6 sm:mb-8 tracking-tight">
              TIMEPIECE
            </h1>
            <div className="w-24 sm:w-28 lg:w-32 h-0.5 bg-yellow-600 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-widest uppercase text-gray-300">
              Excellence Since 2023
            </p>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Where heritage meets innovation, and every second is crafted with unparalleled precision
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-yellow-600 rounded-full flex justify-center">
            <div className="w-0.5 h-2 sm:h-3 bg-yellow-600 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-t border-l border-yellow-600"></div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-b border-r border-yellow-600"></div>
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
                  alt="Watchmaking Craft"
                  className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] 2xl:h-[700px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
            </div>
            
            <div className="lg:pl-8 xl:pl-12 order-1 lg:order-2">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-12 sm:w-14 lg:w-16 h-0.5 bg-yellow-600 mr-3 sm:mr-4"></div>
                <span className="text-yellow-600 uppercase tracking-widest text-xs sm:text-sm font-semibold">Our Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-6 sm:mb-8 leading-tight">
                Crafting <span className="text-yellow-600">Legends</span> <br className="hidden sm:block" />
                For Generations
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                For over five decades, Timepiece has stood as the pinnacle of horological excellence. 
                Our Geneva atelier brings together the world's most skilled artisans, each timepiece 
                a symphony of Swiss precision and artistic mastery.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12">
                Every mechanism tells a story of innovation, every design whispers legacy, and every 
                finished watch becomes an heirloom waiting to begin its journey.
              </p>
              
              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center">
                <div className="group hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif text-yellow-600 mb-1 sm:mb-2 group-hover:text-yellow-700">50+</div>
                  <div className="text-gray-600 text-xs sm:text-sm uppercase tracking-widest">Years Excellence</div>
                </div>
                <div className="group hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif text-yellow-600 mb-1 sm:mb-2 group-hover:text-yellow-700">150+</div>
                  <div className="text-gray-600 text-xs sm:text-sm uppercase tracking-widest">Master Craftsmen</div>
                </div>
                <div className="group hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif text-yellow-600 mb-1 sm:mb-2 group-hover:text-yellow-700">75+</div>
                  <div className="text-gray-600 text-xs sm:text-sm uppercase tracking-widest">Countries Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80">
          <img 
            src="https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Watch Mechanism"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-12 sm:w-14 lg:w-16 h-0.5 bg-yellow-600"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 sm:mb-6">The Art of Precision</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Where engineering excellence meets timeless artistry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Swiss Precision",
                description: "Each movement undergoes 360 hours of rigorous testing to achieve chronometer certification, ensuring accuracy within seconds per year."
              },
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                ),
                title: "Hand Assembly",
                description: "Master watchmakers with decades of experience meticulously assemble each component by hand in our Geneva atelier."
              },
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Precious Materials",
                description: "We source only the finest materials: 18k gold, platinum, and ethically sourced diamonds of exceptional quality."
              }
            ].map((item, index) => (
              <div key={index} className="group text-center p-6 sm:p-8 lg:p-12 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-500 border border-gray-700 hover:border-yellow-600/30">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 sm:mb-8 bg-yellow-600/10 rounded-full flex items-center justify-center group-hover:bg-yellow-600/20 transition-colors duration-300 border border-yellow-600/20">
                  {item.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif mb-4 sm:mb-6 text-yellow-600">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base lg:text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Watch Collections Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-12 sm:w-14 lg:w-16 h-0.5 bg-yellow-600"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 sm:mb-6">Our Collections</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Timeless pieces for every occasion and style
            </p>
          </div>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Classic Heritage",
                description: "Timeless designs inspired by vintage horology",
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                features: ["Automatic Movement", "Sapphire Crystal", "Alligator Strap"]
              },
              {
                name: "Modern Sport",
                description: "Robust timepieces for the active lifestyle",
                image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                features: ["Chronograph", "Water Resistant", "Ceramic Bezel"]
              },
              {
                name: "Luxury Edition",
                description: "Exclusive pieces with precious materials",
                image: "https://i.pinimg.com/1200x/f6/94/2a/f6942a386de6d29080551993fa387942.jpg",
                features: ["18K Gold", "Diamond Markers", "Limited Edition"]
              },
            ].map((collection, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-serif mb-2 text-gray-900">{collection.name}</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm flex-1">{collection.description}</p>
                  
                  <ul className="space-y-1 mt-auto">
                    {collection.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-xs sm:text-sm text-gray-500">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-12 sm:w-14 lg:w-16 h-0.5 bg-yellow-600 mr-3 sm:mr-4"></div>
                <span className="text-yellow-600 uppercase tracking-widest text-xs sm:text-sm font-semibold">Innovation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-6 sm:mb-8">
                Pushing <span className="text-yellow-600">Boundaries</span>
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                At Timepiece, we continuously innovate while respecting traditional watchmaking. 
                Our research and development team works tirelessly to introduce new technologies 
                that enhance precision, durability, and beauty.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Advanced anti-magnetic technology",
                  "Proprietary lubrication systems",
                  "Revolutionary power reserve mechanisms",
                  "Sustainable manufacturing processes"
                ].map((innovation, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3 sm:mr-4"></div>
                    <span className="text-gray-700 text-sm sm:text-base">{innovation}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Watch Innovation"
                className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-yellow-600 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-600/5 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-8 sm:mb-12 border-2 border-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-2xl sm:text-3xl lg:text-4xl font-bold font-serif">T</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-6 sm:mb-8 leading-tight">
              A Legacy <span className="text-yellow-600">Perfected</span> <br className="hidden sm:block" />
              Through Time
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
              Every Timepiece watch carries five decades of heritage, innovation, and uncompromising quality. 
              It's more than a timekeeper—it's a story of excellence that accompanies you through life's most precious moments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <button onClick={() => navigate("/shop")}
                className="bg-yellow-600 text-black px-8 sm:px-12 lg:px-16 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-widest hover:bg-yellow-500 transition-colors duration-300 transform hover:scale-105 border-2 border-yellow-600 w-full sm:w-auto"
              >
                Discover Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 sm:w-14 lg:w-16 h-0.5 bg-yellow-600 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-xl sm:text-2xl italic text-gray-300 leading-relaxed mb-8 sm:mb-12">
              "We don't just tell time. We craft the moments that define lifetimes."
            </p>
            <div className="text-yellow-600 font-serif text-base sm:text-lg">
              {/* — Timepiece Atelier, Geneva */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;