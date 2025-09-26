import { createContext, useContext, useMemo, useState, useEffect } from 'react';

export const Languages = {
  EN: 'en',
  HI: 'hi',
  BN: 'bn',
  GU: 'gu',
};

const defaultLang = Languages.EN;

const translations = {
  en: {
    nav: {
      home: 'Home',
      categories: 'Categories',
      offers: 'Bulk Pricing',
      about: 'About Us',
      contact: 'Contact',
      login: 'Login',
    },
    dashboard: {
      overview: 'Dashboard Overview',
      recentOrders: 'Recent Orders',
      lowInventory: 'Low Inventory',
      orders: 'Orders',
      inventory: 'Inventory',
      settings: 'Settings',
    },
    pages: {
      aboutTitle: 'About Us',
      contactTitle: 'Contact Us',
      categoriesTitle: 'Categories',
      offersTitle: 'Bulk Pricing & Offers',
    },
    common: {
      menu: 'Menu',
      logout: 'Logout',
      send: 'Send',
      language: 'Language',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      categories: 'श्रेणियाँ',
      offers: 'थोक मूल्य',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      login: 'लॉगिन',
    },
    dashboard: {
      overview: 'डैशबोर्ड अवलोकन',
      recentOrders: 'हाल के ऑर्डर',
      lowInventory: 'कम स्टॉक',
      orders: 'ऑर्डर',
      inventory: 'इन्वेंटरी',
      settings: 'सेटिंग्स',
    },
    pages: {
      aboutTitle: 'हमारे बारे में',
      contactTitle: 'संपर्क करें',
      categoriesTitle: 'श्रेणियाँ',
      offersTitle: 'थोक मूल्य और ऑफ़र्स',
    },
    common: {
      menu: 'मेनू',
      logout: 'लॉगआउट',
      send: 'भेजें',
      language: 'भाषा',
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      categories: 'বিভাগ',
      offers: 'পাইকারী মূল্য',
      about: 'আমাদের সম্পর্কে',
      contact: 'যোগাযোগ',
      login: 'লগইন',
    },
    dashboard: {
      overview: 'ড্যাশবোর্ড ওভারভিউ',
      recentOrders: 'সাম্প্রতিক অর্ডার',
      lowInventory: 'কম স্টক',
      orders: 'অর্ডার',
      inventory: 'ইনভেন্টরি',
      settings: 'সেটিংস',
    },
    pages: {
      aboutTitle: 'আমাদের সম্পর্কে',
      contactTitle: 'যোগাযোগ করুন',
      categoriesTitle: 'বিভাগ',
      offersTitle: 'পাইকারী মূল্য ও অফার',
    },
    common: {
      menu: 'মেনু',
      logout: 'লগআউট',
      send: 'পাঠান',
      language: 'ভাষা',
    },
  },
  gu: {
    nav: {
      home: 'હોમ',
      categories: 'શ્રેણીઓ',
      offers: 'થોક ભાવ',
      about: 'અમારા વિષે',
      contact: 'સંપર્ક',
      login: 'લૉગિન',
    },
    dashboard: {
      overview: 'ડૅશબોર્ડ ઝાંખી',
      recentOrders: 'તાજેતરના ઓર્ડર',
      lowInventory: 'ઓછો જથ્થો',
      orders: 'ઓર્ડર',
      inventory: 'જથ્થો',
      settings: 'સેટિંગ્સ',
    },
    pages: {
      aboutTitle: 'અમારા વિષે',
      contactTitle: 'સંપર્ક કરો',
      categoriesTitle: 'શ્રેણીઓ',
      offersTitle: 'થોક ભાવ અને ઑફર્સ',
    },
    common: {
      menu: 'મેનુ',
      logout: 'લૉગઆઉટ',
      send: 'મોકલો',
      language: 'ભાષા',
    },
  },
};

const I18nContext = createContext({ lang: defaultLang, setLang: () => {}, t: (k) => k });

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if (stored && translations[stored]) setLang(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lang', lang);
  }, [lang]);

  const t = useMemo(() => {
    return (key) => {
      const parts = key.split('.');
      let node = translations[lang] || translations[defaultLang];
      for (const p of parts) {
        node = node?.[p];
      }
      return typeof node === 'string' ? node : key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);


