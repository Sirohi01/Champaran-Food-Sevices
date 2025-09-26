import Categories from '../components/Categories';

const CategoriesPage = () => {
  return (
    <div className="min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Categories</h1>
        <p className="text-gray-600 mb-6">Explore our wholesale product categories curated for retailers.</p>
        <Categories />
      </div>
    </div>
  );
};

export default CategoriesPage;


