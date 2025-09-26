import { useI18n } from '../i18n/i18n';

const ContactPage = () => {
  const { t } = useI18n();
  return (
    <div className="min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('pages.contactTitle')}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Send us a message</h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="col-span-1 border rounded-lg px-3 py-2" placeholder="Your name" />
              <input className="col-span-1 border rounded-lg px-3 py-2" placeholder="Phone" />
              <input className="sm:col-span-2 border rounded-lg px-3 py-2" placeholder="Email" />
              <textarea className="sm:col-span-2 border rounded-lg px-3 py-2 h-32" placeholder="Your message"></textarea>
              <div className="sm:col-span-2">
                <button type="button" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">{t('common.send')}</button>
              </div>
            </form>
          </div>
          <div className="bg-white border rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-semibold mb-2">Contact Details</h2>
            <div className="text-gray-700">Phone: +91 98765 43210</div>
            <div className="text-gray-700">Email: wholesale@mandiseva.com</div>
            <div className="text-gray-700">Address: Azadpur Mandi, Delhi - 110033</div>
            <div className="pt-2">
              <div className="w-full h-40 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">Map</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;


