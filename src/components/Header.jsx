import { useState } from 'react';
import { CartIcon, MenuIcon, CloseIcon, SearchIcon, UserIcon, LocationIcon } from './Icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart count

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <LocationIcon className="w-4 h-4" />
                <span>Delhi, India</span>
              </div>
              <span className="hidden md:inline">Bulk orders • Wholesale rates • B2B Supply</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Call: +91 98765 43210</span>
              <button className="hover:text-green-200 transition-colors">
                <UserIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">CF</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">champaaran foods</h1>
              <p className="text-xs text-gray-500">Wholesale Supplier</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search wholesale products, bulk items..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Home
            </a>
            <a href="#categories" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Categories
            </a>
            <a href="#offers" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Bulk Pricing
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              About Us
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search wholesale products..."
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <a
              href="#home"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#categories"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </a>
            <a
              href="#offers"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Offers
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
