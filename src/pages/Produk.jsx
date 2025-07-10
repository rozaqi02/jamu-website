import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

function Produk({ theme, toggleTheme }) {
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
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative pt-16`}>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <h2 className={`text-4xl font-bold text-center ${theme === 'dark' ? 'text-[#8A9A5B]' : 'text-[#4a704a]'} mb-12 border-b-2 border-[#4a704a]/20 pb-4`}>Varian Jakora</h2>
        <p className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-10 text-lg`}>{jakoraProducts[0].description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jakoraProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            >
              <ProductCard {...product} theme={theme} />
            </motion.div>
          ))}
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <h2 className={`text-4xl font-bold text-center ${theme === 'dark' ? 'text-[#8A9A5B]' : 'text-[#4a704a]'} mb-12 border-b-2 border-[#4a704a]/20 pb-4`}>Varian Jatastik</h2>
        <p className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-10 text-lg`}>{jatastikProducts[0].description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jatastikProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            >
              <ProductCard {...product} theme={theme} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Produk;