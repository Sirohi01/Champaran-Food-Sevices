const Offers = () => {
  const offers = [
    {
      id: 1,
      title: '25% OFF',
      subtitle: 'Bulk Rice & Grains',
      description: '25kg+ bags पर special wholesale rates',
      gradient: 'from-yellow-400 to-orange-500',
      bgPattern: 'from-yellow-50 to-orange-50',
      emoji: '🌾',
      validTill: 'This Month',
      code: 'BULK25'
    },
    {
      id: 2,
      title: 'Volume Discount',
      subtitle: 'Cooking Oil',
      description: '15L+ containers पर extra discount',
      gradient: 'from-blue-400 to-cyan-500',
      bgPattern: 'from-blue-50 to-cyan-50',
      emoji: '🛢️',
      validTill: 'Ongoing',
      code: 'OIL15L'
    },
    {
      id: 3,
      title: 'Credit Terms',
      subtitle: 'For Regular Partners',
      description: 'Registered partners के लिए 30 days credit',
      gradient: 'from-green-400 to-emerald-500',
      bgPattern: 'from-green-50 to-emerald-50',
      emoji: '🤝',
      validTill: 'Always',
      code: 'CREDIT30'
    }
  ];

  const flashDeals = [
    {
      id: 1,
      name: 'Basmati Rice 25kg',
      originalPrice: 2500,
      discountPrice: 2200,
      discount: 12,
      image: '🌾',
      timeLeft: '2 days',
      sold: 15,
      total: 50
    },
    {
      id: 2,
      name: 'Sunflower Oil 15L',
      originalPrice: 1800,
      discountPrice: 1600,
      discount: 11,
      image: '🛢️',
      timeLeft: '3 days',
      sold: 28,
      total: 40
    },
    {
      id: 3,
      name: 'Wheat Flour 50kg',
      originalPrice: 1500,
      discountPrice: 1350,
      discount: 10,
      image: '🌾',
      timeLeft: '1 day',
      sold: 35,
      total: 60
    },
    {
      id: 4,
      name: 'Red Chili Powder 5kg',
      originalPrice: 800,
      discountPrice: 700,
      discount: 13,
      image: '🌶️',
      timeLeft: '4 days',
      sold: 22,
      total: 30
    }
  ];

  return (
    <section id="offers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
            Bulk Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Wholesale{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Bulk Rates
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bulk quantity में order करें और बेहतरीन wholesale rates पाएं। ज्यादा quantity, कम price।
          </p>
        </div>

        {/* Main Offers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`relative bg-gradient-to-br ${offer.gradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white overflow-hidden group hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-white rounded-full transform scale-150 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 bg-white rounded-full w-24 h-24 sm:w-32 sm:h-32 transform translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Emoji */}
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{offer.emoji}</div>
                
                {/* Offer Title */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{offer.title}</h3>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4 opacity-90">{offer.subtitle}</p>
                <p className="text-sm mb-4 sm:mb-6 opacity-80 leading-relaxed">{offer.description}</p>
                
                {/* Offer Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">Valid Till:</span>
                    <span className="font-semibold">{offer.validTill}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">Code:</span>
                    <span className="font-mono bg-white/20 px-2 py-1 rounded">{offer.code}</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                {/* <button className="w-full bg-white text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors group-hover:scale-105 transform duration-200">
                  Shop Now
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Flash Deals Section */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                📦 Bulk Deals
              </h3>
              <p className="text-gray-600">Wholesale quantity में special rates</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">🏪 B2B Only!</div>
              <div className="text-sm text-gray-600">Wholesale Pricing</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {flashDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">{deal.image}</div>
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block">
                    {deal.discount}% OFF
                  </div>
                </div>
                
                {/* Product Info */}
                <h4 className="font-semibold text-gray-800 mb-2 text-center">{deal.name}</h4>
                
                {/* Price */}
                <div className="text-center mb-3">
                  <span className="text-lg font-bold text-green-600">₹{deal.discountPrice}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">₹{deal.originalPrice}</span>
                </div>
                
                {/* Progress Bar */}
                {/* <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Sold: {deal.sold}</span>
                    <span>Total: {deal.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                    ></div>
                  </div>
                </div> */}
                
                {/* Timer */}
                <div className="text-center mb-4">
                  <div className="text-xs text-gray-600">Ends in</div>
                  <div className="text-sm font-bold text-red-600">{deal.timeLeft}</div>
                </div>
                
                {/* Add to Cart Button */}
                {/* <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105">
                  Add to Cart
                </button> */}
              </div>
            ))}
          </div>
        </div>

        {/* Business Partnership Signup */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Become Our Business Partner! 🤝
          </h3>
          <p className="text-lg mb-8 opacity-90">
            अपने store के लिए wholesale rates और special credit terms पाने के लिए register करें
          </p>
          {/* <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your business email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Register
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Offers;
