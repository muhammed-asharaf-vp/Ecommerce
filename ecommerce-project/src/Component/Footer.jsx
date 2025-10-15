import React from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#003631] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-normal text-white mb-4">Veloce</h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Crafting timeless luxury watches with precision and elegance. Experience the pinnacle of Swiss watchmaking excellence since 1995.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaLinkedinIn, href: "#" }
              ].map((SocialIcon, index) => (
                <a
                  key={index}
                  href={SocialIcon.href}
                  className="w-10 h-10 bg-[#002822] rounded flex items-center justify-center transition-colors duration-200 hover:bg-[#FFEDA8]"
                >
                  <SocialIcon.icon className="w-4 h-4 text-gray-300 hover:text-[#003631]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Collections", 
                "Shipping Policy",
                "Returns & Refunds",
                "FAQ",
                "Contact"
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFEDA8] transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-[#FFEDA8] mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  123 Luxury Avenue<br />
                  Kerala, India 682001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-[#FFEDA8] flex-shrink-0" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-[#FFEDA8] transition-colors duration-200 text-sm">
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-[#FFEDA8] flex-shrink-0" />
                <a href="concierge@veloce.com" className="text-gray-300 hover:text-[#FFEDA8] transition-colors duration-200 text-sm">
                  info@veloce.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#FFEDA8]/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Veloce Watches. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-[#FFEDA8] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm mr-3">We accept:</span>
              <div className="flex gap-1">
                {["Visa", "Mastercard", "Amex", "PayPal"].map((method, index) => (
                  <div
                    key={index}
                    className="w-8 h-6 bg-[#002822] rounded text-xs flex items-center justify-center text-[#FFEDA8] font-medium border border-[#FFEDA8]/20"
                  >
                    {method.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;