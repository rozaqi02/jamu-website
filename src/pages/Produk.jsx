import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function Produk({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('produk');
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  const jakoraProducts = [
    { name: 'Jakora Original', image: '/assets/images/jakora-original.jpg', description: 'Rendang jamur rasa original, siap saji.', stock: 65, variants: ['350gr'] },
    { name: 'Jakora Spicy', image: '/assets/images/jakora-spicy.jpg', description: 'Rendang jamur pedas dengan cita rasa khas.', stock: 68, variants: ['350gr'] },
    { name: 'Jakora Blackpaper', image: '/assets/images/jakora-blackpaper.jpg', description: 'Rendang jamur rasa lada hitam.', stock: 62, variants: ['350gr'] }
  ];

  const jatastikProducts = [
    { name: 'Jatastik Original', image: '/assets/images/jatastik-original.jpg', description: 'Snack jamur sawit rasa original.', stock: 69, variants: ['50gr', '100gr'] },
    { name: 'Jatastik Spicy', image: '/assets/images/jatastik-spicy.png', description: 'Snack jamur pedas gurih.', stock: 66, variants: ['50gr', '100gr'] },
    { name: 'Jatastik Cheese', image: '/assets/images/jatastik-cheese.jpg', description: 'Jatastik rasa keju yang creamy.', stock: 63, variants: ['50gr', '100gr'] }
  ];

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, variant: product.variants[0] }];
    });
    alert(`${product.name} ditambahkan ke keranjang!`); // Konfirmasi sederhana
  };

  return (
    <div className="min-h-screen font-poppins text-[var(--text-color)] bg-white overflow-hidden relative">
      <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} setActiveSection={setActiveSection} cartCount={cartCount} />
      <main className="pt-16">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Produk Jakora</h2>
          <p className="text-center text-gray-600 mb-6">Rendang jamur vegan dengan cita rasa autentik dan sehat.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jakoraProducts.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="py-16 px-4 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Produk Jatastik</h2>
          <p className="text-center text-gray-600 mb-6">Snack jamur renyah dengan varian rasa kekinian.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jatastikProducts.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}

export default Produk;