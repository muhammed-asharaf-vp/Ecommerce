import React from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterestP,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaCreditCard
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h3 className="text-2xl font-serif font-light text-white">Veloce</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Crafting timeless luxury watches with precision and elegance. Experience the pinnacle of Swiss watchmaking excellence.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, color: "hover:text-blue-400" },
                { icon: FaTwitter, color: "hover:text-blue-300" },
                { icon: FaInstagram, color: "hover:text-pink-400" },
                { icon: FaPinterestP, color: "hover:text-red-400" }
              ].map((SocialIcon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-amber-500 hover:scale-110 ${SocialIcon.color}`}
                >
                  <SocialIcon.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 font-serif">Customer Service</h4>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", href: "/contact", icon: FaHeadset },
                { name: "Shipping Info", href: "/shipping", icon: FaTruck },
                { name: "Returns & Exchanges", href: "/returns", icon: FaShieldAlt },
                { name: "Payment Methods", href: "/payment", icon: FaCreditCard },
                { name: "Size Guide", href: "/size-guide" },
                { name: "FAQ", href: "/faq" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                  >
                    {link.icon && (
                      <link.icon className="w-3 h-3 mr-3 text-amber-500 opacity-70" />
                    )}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 font-serif">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">123 Luxury Avenue</p>
                  <p className="text-gray-400">kerala, india </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-amber-400 transition-colors">
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@veloce.com" className="text-gray-400 hover:text-amber-400 transition-colors">
                  info@veloce.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-400">Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FaShieldAlt, title: "2-Year Warranty", desc: "Full manufacturer warranty" },
              { icon: FaTruck, title: "Free Shipping", desc: "On orders over $500" },
              { icon: FaHeadset, title: "24/7 Support", desc: "Dedicated concierge" },
              { icon: FaCreditCard, title: "Secure Payment", desc: "SSL encrypted" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h5 className="text-white text-sm font-semibold">{feature.title}</h5>
                  <p className="text-gray-500 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Veloce Luxury Watches. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Legal", href: "/legal" }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-amber-400 transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm mr-3">We Accept:</span>
              <div className="flex gap-2">
                {["Visa", "Mastercard", "Amex", "PayPal"].map((method, index) => (
                  <div
                    key={index}
                    className="w-8 h-6 bg-slate-700 rounded text-xs flex items-center justify-center text-gray-400 font-medium"
                  >
                    {method.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-amber-600 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}

export default Footer;