import { PhoneIcon, EmailIcon, LocationIcon } from './Icons';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Categories', href: '#categories' },
    { name: 'Offers', href: '#offers' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const categories = [
    { name: 'Rice & Grains', href: '#' },
    { name: 'Cooking Oil', href: '#' },
    { name: 'Flour & Atta', href: '#' },
    { name: 'Spices & Masala', href: '#' },
    { name: 'Pulses & Dal', href: '#' }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Return Policy', href: '#' },
    { name: 'Shipping Policy', href: '#' },
    { name: 'FAQ', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">CF</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">champaaran foods</h3>
                <p className="text-sm text-gray-400">Wholesale Supplier</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              छोटे और बड़े grocery stores के लिए wholesale rates पर quality products। 
              champaaran foods के साथ अपने business को बढ़ाएं और बेहतरीन profit margins पाएं।
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <EmailIcon className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">wholesale@mandiseva.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <LocationIcon className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Azadpur Mandi, Delhi - 110033</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3 mb-8">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <a
                    href={policy.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {policy.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* App Download */}
            <div>
              <h5 className="font-semibold mb-3 text-white">Download App</h5>
              <div className="space-y-2">
                <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span className="text-lg">📱</span>
                  <span className="text-sm">Download on App Store</span>
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span className="text-lg">🤖</span>
                  <span className="text-sm">Get it on Google Play</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-2">Business Updates!</h4>
              <p className="text-gray-300">Get wholesale rates and bulk pricing updates for your business</p>
            </div>
            {/* <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your business email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-r-lg font-semibold transition-all duration-200">
                Subscribe
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Social Media & Payment */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Social Media */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-300 text-sm">Follow us:</span>
              <div className="flex space-x-3">
                <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">f</span>
                </button>
                <button className="w-8 h-8 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">📷</span>
                </button>
                <button className="w-8 h-8 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">🐦</span>
                </button>
                <button className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">💬</span>
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">💳</div>
                <div className="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center">💳</div>
                <div className="w-8 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center">📱</div>
                <div className="w-8 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center">💰</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">CF</span>
              </div>
              <span className="text-gray-400 text-sm">© 2024 champaaran foods Wholesale Supplier. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with ❤️ in India</span>
              <span>•</span>
              <span>Version 1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
