import Offers from '../components/Offers';

const OffersPage = () => {
  return (
    <div className="min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Bulk Pricing & Offers</h1>
        <p className="text-gray-600 mb-6">Get wholesale deals, seasonal discounts and B2B pricing.</p>
        <Offers />
      </div>
    </div>
  );
};

export default OffersPage;


