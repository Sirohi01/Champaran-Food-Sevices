import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartIcon, MenuIcon, CloseIcon, SearchIcon, UserIcon, LocationIcon } from './Icons';
import SpriteIcons from './SpriteIcons';
import { useI18n, Languages } from '../i18n/i18n';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const { t, lang, setLang } = useI18n();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <LocationIcon className="w-4 h-4" />
                <span>Patna, Bihar, India</span>
              </div>
              <span className="hidden md:inline">Bulk orders • Wholesale rates • B2B Supply</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Call: +91 98765 43210</span>
              <Link to="/login" className="hover:text-green-200 transition-colors flex items-center">
                <UserIcon className="w-4 h-4 mr-1" />
                <span className="text-sm hidden sm:inline">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg sm:text-xl">CF</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">champaaran foods</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Wholesale Supplier</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink to="/" end className={({isActive}) => `flex items-center font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
              <SpriteIcons name="home" className="w-4 h-4 mr-1" />
              {t('nav.home')}
            </NavLink>
            <NavLink to="/categories" className={({isActive}) => `flex items-center font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
              <SpriteIcons name="categories" className="w-4 h-4 mr-1" />
              {t('nav.categories')}
            </NavLink>
            <NavLink to="/offers" className={({isActive}) => `flex items-center font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
              <SpriteIcons name="offers" className="w-4 h-4 mr-1" />
              {t('nav.offers')}
            </NavLink>
            <NavLink to="/about" className={({isActive}) => `flex items-center font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
              <SpriteIcons name="about" className="w-4 h-4 mr-1" />
              {t('nav.about')}
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => `flex items-center font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
              <SpriteIcons name="contact" className="w-4 h-4 mr-1" />
              {t('nav.contact')}
            </NavLink>
            <Link to="/login" className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors">
              <SpriteIcons name="login" className="w-4 h-4 mr-1" />
              {t('nav.login')}
            </Link>
            <div>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="border border-gray-300 rounded-md text-sm px-2 py-1">
                <option value={Languages.EN}>EN</option>
                <option value={Languages.HI}>हिंदी</option>
                <option value={Languages.BN}>বাংলা</option>
                <option value={Languages.GU}>ગુજરાતી</option>
              </select>
            </div>
          </nav>

          {/* Mobile Menu Button & Language */}
          <div className="flex items-center space-x-2 lg:hidden">
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="border border-gray-300 rounded-md text-xs px-1 py-1 md:hidden">
              <option value={Languages.EN}>EN</option>
              <option value={Languages.HI}>हिं</option>
              <option value={Languages.BN}>বাং</option>
              <option value={Languages.GU}>ગુ</option>
            </select>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3">
            <div className="grid grid-cols-2 gap-2">
              <NavLink
                to="/"
                end
                className={({isActive}) => `flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <SpriteIcons name="home" className="w-4 h-4 mr-1" />
                {t('nav.home')}
              </NavLink>
              <NavLink
                to="/categories"
                className={({isActive}) => `flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <SpriteIcons name="categories" className="w-4 h-4 mr-1" />
                {t('nav.categories')}
              </NavLink>
              <NavLink
                to="/offers"
                className={({isActive}) => `flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <SpriteIcons name="offers" className="w-4 h-4 mr-1" />
                {t('nav.offers')}
              </NavLink>
              <NavLink
                to="/about"
                className={({isActive}) => `flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <SpriteIcons name="about" className="w-4 h-4 mr-1" />
                {t('nav.about')}
              </NavLink>
              <NavLink
                to="/contact"
                className={({isActive}) => `flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <SpriteIcons name="contact" className="w-4 h-4 mr-1" />
                {t('nav.contact')}
              </NavLink>
              <Link
                to="/login"
                className="flex items-center justify-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <SpriteIcons name="login" className="w-4 h-4 mr-1" />
                {t('nav.login')}
              </Link>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 hidden md:block">
              <div className="flex items-center justify-center">
                <label className="text-xs text-gray-500 mr-2">{t('common.language')}</label>
                <select value={lang} onChange={(e) => { setLang(e.target.value); setIsMenuOpen(false); }} className="border border-gray-300 rounded-md text-sm px-2 py-1">
                  <option value={Languages.EN}>English</option>
                  <option value={Languages.HI}>हिंदी</option>
                  <option value={Languages.BN}>বাংলা</option>
                  <option value={Languages.GU}>ગુજરાતી</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
