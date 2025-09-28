import { useI18n } from '../i18n/i18n';

const AboutPage = () => {
  const { t } = useI18n();
  return (
    <div className="min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('pages.aboutTitle')}</h1>
          <p className="text-gray-700 max-w-2xl">We are a wholesale supplier serving grocery stores and HoReCa with reliable B2B supply at transparent prices.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border rounded-xl">
            <div className="text-2xl font-bold">15+ Years</div>
            <div className="text-gray-600">Industry experience</div>
          </div>
          <div className="p-5 bg-white border rounded-xl">
            <div className="text-2xl font-bold">500+ Stores</div>
            <div className="text-gray-600">Served across regions</div>
          </div>
          <div className="p-5 bg-white border rounded-xl">
            <div className="text-2xl font-bold">5,000+ SKUs</div>
            <div className="text-gray-600">Staples, oil, pulses, and more</div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="text-gray-700">Enable small and medium retailers to buy at true wholesale rates with consistent quality, fast delivery, and trustworthy service.</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl h-40 md:h-48 flex items-center justify-center">
            <span className="text-5xl">📦</span>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl h-40 md:h-48 flex items-center justify-center order-last md:order-first">
            <span className="text-5xl">🚚</span>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Why Us</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Bulk pricing with transparent quotes</li>
              <li>Reliable logistics and on-time delivery</li>
              <li>Dedicated support for partner stores</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

//cgecke fk
export default AboutPage;


