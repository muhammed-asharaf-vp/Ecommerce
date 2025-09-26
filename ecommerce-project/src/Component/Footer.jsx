import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} ChronoMart. All rights reserved.
        </div>

        {/* Right side - links */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/about" className="hover:text-white text-sm">
            About
          </a>
          <a href="/contact" className="hover:text-white text-sm">
            Contact
          </a>
          <a href="/privacy" className="hover:text-white text-sm">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
