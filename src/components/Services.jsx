import { DeliveryIcon, QualityIcon, PriceIcon, StarIcon } from './Icons';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Bulk Supply',
      description: 'Large quantity delivery for your store. आपके store के लिए bulk quantity में fast delivery।',
      icon: DeliveryIcon,
      gradient: 'from-orange-400 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      features: ['Bulk Delivery', 'Scheduled Supply', 'Store Direct']
    },
    {
      id: 2,
      title: 'Wholesale Rates',
      description: 'Best wholesale prices for retailers. Retailers के लिए सबसे अच्छी wholesale कीमतें।',
      icon: PriceIcon,
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      features: ['Wholesale Pricing', 'Volume Discounts', 'Credit Terms']
    },
    {
      id: 3,
      title: 'B2B Support',
      description: 'Dedicated business support team. आपके business के लिए dedicated support team।',
      icon: QualityIcon,
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      features: ['Business Account', '24/7 B2B Support', 'Order Management']
    }
  ];

  const stats = [
    { number: '500+', label: 'Partner Stores', icon: '🏪' },
    { number: '5000+', label: 'Bulk Products', icon: '📦' },
    { number: '15+', label: 'Years Experience', icon: '🏆' },
    { number: '99%', label: 'Business Satisfaction', icon: '⭐' }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
            <StarIcon className="w-4 h-4 mr-2" />
            Why Partner With Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              champaaran foods
            </span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            हमारी B2B सेवाएं आपके grocery business को बढ़ाने में मदद करती हैं। Wholesale rates, bulk supply और reliable service।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  index === 1 ? 'lg:scale-105' : ''
                } sm:col-span-2 lg:col-span-1`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 mx-auto bg-gradient-to-r ${service.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center group-hover:text-gray-800">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-center mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3`}></div>
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Success in Numbers
            </h3>
            <p className="text-gray-600">आंकड़ों में हमारी सफलता की कहानी</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-yellow-300" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
              "champaaran foods से wholesale supply लेना बहुत फायदेमंद है। Quality अच्छी मिलती है और rates भी wholesale में बेहतरीन हैं। 
              हमारे store के लिए perfect supplier है!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <div className="text-left">
                <div className="font-semibold">Rajesh Kumar</div>
                <div className="text-orange-100">Grocery Store Owner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
