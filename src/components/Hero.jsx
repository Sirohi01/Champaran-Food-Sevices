import { StarIcon } from './Icons';

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d399' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-6">
              <StarIcon className="w-4 h-4 mr-2" />
              #1 Wholesale Supplier in Delhi
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              <span className="block sm:inline">Bulk{' '}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Groceries
              </span>
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-2 sm:mt-0">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                  Wholesale
                </span>{' '}
                Supply
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
              छोटे और बड़े grocery stores के लिए wholesale rates पर quality products।{' '}
              <span className="font-semibold text-orange-600">champaaran foods</span> के साथ अपने business को बढ़ाएं।
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-0">
              <div className="flex items-center justify-center lg:justify-start space-x-2 bg-orange-50 rounded-lg py-2 px-3 sm:bg-transparent sm:py-0 sm:px-0">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Bulk Supply</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 bg-blue-50 rounded-lg py-2 px-3 sm:bg-transparent sm:py-0 sm:px-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Wholesale Rates</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 bg-green-50 rounded-lg py-2 px-3 sm:bg-transparent sm:py-0 sm:px-0">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">B2B Service</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* <button className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="flex items-center justify-center space-x-2">
                  <span>Get Wholesale Rates</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button> */}
              {/* <button className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-orange-300 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                Bulk Pricing
              </button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600 text-xs sm:text-sm">Partner Stores</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">5000+</div>
                <div className="text-gray-600 text-xs sm:text-sm">Bulk Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">15+</div>
                <div className="text-gray-600 text-xs sm:text-sm">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative mt-8 lg:mt-0">
            {/* Main Image Container */}
            <div className="relative z-10">
              {/* Floating Cards */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 transform rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {/* Product Cards */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                      <span className="text-lg sm:text-xl lg:text-2xl">📦</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Bulk Rice</h4>
                    <p className="text-xs sm:text-sm text-gray-600">25kg Bags</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                      <span className="text-lg sm:text-xl lg:text-2xl">🥬</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Vegetables</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Wholesale</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                      <span className="text-lg sm:text-xl lg:text-2xl">🛢️</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Cooking Oil</h4>
                    <p className="text-xs sm:text-sm text-gray-600">15L Cans</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                      <span className="text-lg sm:text-xl lg:text-2xl">🌾</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Wheat Flour</h4>
                    <p className="text-xs sm:text-sm text-gray-600">50kg Sacks</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-white font-bold text-xs">BULK</span>
              </div>
              
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-lg sm:text-xl lg:text-2xl">🏪</span>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-10 lg:left-10 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
