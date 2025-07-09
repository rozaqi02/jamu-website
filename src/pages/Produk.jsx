import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import '../styles/animations.css';

function Produk({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('produk');
  const [showCart, setShowCart] = useState(false);

  const jakoraProducts = [
    { name: 'Jakora Original', image: '/assets/images/jakora-original.png', description: 'Rendang jamur rasa original, siap saji.', stock: 65, variants: ['350gr'] },
    { name: 'Jakora Spicy', image: '/assets/images/jakora-spicy.png', description: 'Rendang jamur pedas dengan cita rasa khas.', stock: 68, variants: ['350gr'] },
    { name: 'Jakora Blackpaper', image: '/assets/images/jakora-blackpaper.png', description: 'Rendang jamur rasa lada hitam.', stock: 62, variants: ['350gr'] }
  ];

  const jatastikProducts = [
    { name: 'Jatastik Original', image: '/assets/images/jatastik-original.png', description: 'Snack jamur sawit rasa original.', stock: 69, variants: ['50gr', '100gr'] },
    { name: 'Jatastik Spicy', image: '/assets/images/jatastik-spicy.png', description: 'Snack jamur pedas gurih.', stock: 66, variants: ['50gr', '100gr'] },
    { name: 'Jatastik Cheese', image: '/assets/images/jatastik-cheese.png', description: 'Jatastik rasa keju yang creamy.', stock: 63, variants: ['50gr', '100gr'] }
  ];

  return (
    <div className="min-h-screen font-poppins text-[var(--text-color)] bg-[var(--bg-color)] overflow-hidden relative">
      <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Jakora Products */}
      <motion.section id="jakora" className="py-16 px-4 max-w-7xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Produk Jakora</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jakoraProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              onAddToCart={() => setShowCart(true)}
            />
          ))}
        </div>
      </motion.section>

      {/* Jatastik Products */}
      <motion.section id="jatastik" className="py-16 px-4 max-w-7xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold text-center text-lime-700 mb-8">Produk Jatastik</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jatastikProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              onAddToCart={() => setShowCart(true)}
            />
          ))}
        </div>
      </motion.section>

      {/* Floating cart */}
      {showCart && <CartModal onClose={() => setShowCart(false)} />}

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <Footer />
      </motion.div>
    </div>
  );
}

export default Produk;
