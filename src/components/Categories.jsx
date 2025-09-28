import { FruitIcon, VegetableIcon, MilkIcon, BreadIcon, CartIcon } from './Icons';
import { useI18n } from '../i18n/i18n';

const Categories = () => {
  const { t } = useI18n();
  const categories = [
    {
      id: 1,
      name: t('categories.riceGrains'),
      description: t('categories.bulkSupply'),
      icon: () => (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      gradient: 'from-yellow-400 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      emoji: '🌾',
      itemCount: '25kg+ Bags'
    },
    {
      id: 2,
      name: t('categories.vegetables'),
      description: t('categories.freshWholesale'),
      icon: VegetableIcon,
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      emoji: '🥬',
      itemCount: 'Crates Available'
    },
    {
      id: 3,
      name: t('categories.cookingOil'),
      description: t('categories.bulkContainers'),
      icon: () => (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 2v6h.5c.8 0 1.5.7 1.5 1.5V20c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V9.5c0-.8.7-1.5 1.5-1.5H19V2H5zm7 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      ),
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      emoji: '🛢️',
      itemCount: '15L+ Cans'
    },
    {
      id: 4,
      name: t('categories.flourAtta'),
      description: t('categories.wholesaleSacks'),
      icon: BreadIcon,
      gradient: 'from-amber-400 to-yellow-500',
      bgGradient: 'from-amber-50 to-yellow-50',
      emoji: '🌾',
      itemCount: '50kg+ Sacks'
    },
    {
      id: 5,
      name: t('categories.spicesMasala'),
      description: t('categories.bulkPackets'),
      icon: () => (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      gradient: 'from-red-400 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      emoji: '🌶️',
      itemCount: 'Wholesale Packs'
    },
    {
      id: 6,
      name: t('categories.pulsesDal'),
      description: t('categories.bulkSupply'),
      icon: () => (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/>
          <circle cx="8" cy="8" r="2"/>
          <circle cx="16" cy="8" r="2"/>
          <circle cx="8" cy="16" r="2"/>
          <circle cx="16" cy="16" r="2"/>
        </svg>
      ),
      gradient: 'from-purple-400 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
      emoji: '🫘',
      itemCount: '25kg+ Bags'
    }
  ];

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            {t('categories.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('categories.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group cursor-pointer"
              >
                <div className={`relative bg-gradient-to-br ${category.bgGradient} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100`}>
                  {/* Icon Container */}
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 mx-auto bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                  </div>
                  
                  {/* Category Info */}
                  <h3 className="font-bold text-gray-800 mb-1 group-hover:text-gray-900 text-sm sm:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{category.description}</p>
                  <p className="text-xs text-gray-500 font-medium">{category.itemCount}</p>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Products Preview */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('categories.todaysFreshPicks')}
            </h3>
            <p className="text-gray-600">{t('categories.todaysFreshPicksSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Sample Products */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-red-100 to-pink-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl">🍎</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('categories.freshApples')}</h4>
              <p className="text-sm text-gray-600 mb-2">1 kg</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">₹120</span>
                {/* <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  Add
                </button> */}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl">🥕</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('categories.carrots')}</h4>
              <p className="text-sm text-gray-600 mb-2">500g</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">₹40</span>
                {/* <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  Add
                </button> */}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl">🥛</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('categories.freshMilk')}</h4>
              <p className="text-sm text-gray-600 mb-2">1 Liter</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">₹60</span>
                {/* <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  Add
                </button> */}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl">🍞</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('categories.wheatBread')}</h4>
              <p className="text-sm text-gray-600 mb-2">1 loaf</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">₹35</span>
                {/* <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  Add
                </button> */}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            {/* <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              View All Products
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
