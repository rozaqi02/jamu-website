import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

function Produk({ theme, toggleTheme }) {
  const [activeSection] = useState('jakora');

  const jakoraProducts = [
    { name: 'Jakora Original', image: '/assets/images/jakora-original.jpg', description: 'Rendang jamur vegan dengan cita rasa autentik dan sehat.', price: 38000 },
    { name: 'Jakora Spicy', image: '/assets/images/jakora-spicy.jpg', description: 'Rendang jamur pedas dengan cita rasa khas.', price: 38000 },
    { name: 'Jakora Blackpaper', image: '/assets/images/jakora-blackpaper.jpg', description: 'Rendang jamur rasa lada hitam.', price: 38000 }
  ];

  const jatastikProducts = [
    { name: 'Jatastik Original', image: '/assets/images/jatastik-original.jpg', description: 'Snack jamur sawit rasa original.', price: 12000 },
    { name: 'Jatastik Spicy', image: '/assets/images/jatastik-spicy.png', description: 'Snack jamur pedas gurih.', price: 12000 },
    { name: 'Jatastik Cheese', image: '/assets/images/jatastik-cheese.jpg', description: 'Jatastik rasa keju yang creamy.', price: 12000 }
  ];

  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <h2 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'} mb-8 animate-pulse`}>Varian Jakora</h2>
        <p className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-6`}>{jakoraProducts[0].description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jakoraProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              theme={theme}
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
        <h2 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'} mb-8 animate-pulse`}>Varian Jatastik</h2>
        <p className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-6`}>{jatastikProducts[0].description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jatastikProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              theme={theme}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Produk;