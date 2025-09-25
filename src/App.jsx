import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Services from './components/Services';
import Offers from './components/Offers';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <Services />
      <Offers />
      <Footer />
    </div>
  );
}

export default App;
