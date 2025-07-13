import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { FaSearch } from 'react-icons/fa';

function Produk({ theme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Jakora');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = {
    Jakora: [
      { name: 'Jakora Original', image: '/assets/images/jakora-original.jpg', description: 'Rendang jamur vegan dengan cita rasa autentik Minangkabau.', price: 38000 },
      { name: 'Jakora Spicy', image: '/assets/images/jakora-spicy.jpg', description: 'Rendang jamur vegan dengan sensasi pedas yang menggugah selera.', price: 38000 },
      { name: 'Jakora Blackpaper', image: '/assets/images/jakora-blackpaper.jpg', description: 'Rendang jamur vegan dengan aroma lada hitam yang kuat.', price: 38000 },
    ],
    Jatastik: [
      { name: 'Jatastik Original', image: '/assets/images/original.jpg', description: 'Snack renyah dari jamur sawit dan beras merah, penuh nutrisi.', price: 12000 },
      { name: 'Jatastik Spicy', image: '/assets/images/spicy.jpg', description: 'Snack pedas gurih dari jamur sawit, cocok untuk pecinta pedas.', price: 12000 },
      { name: 'Jatastik Cheese', image: '/assets/images/cheese.jpg', description: 'Snack jamur dengan lapisan keju creamy yang menggoda.', price: 12000 },
    ],
  };

  const filteredProducts = products[activeCategory].filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative pt-16`}>
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-6 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>Jelajahi Produk Kami</h2>
        <div className="mb-8">
          <div className="relative w-full max-w-xl mx-auto">
            <input type="text" placeholder="Cari produk..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-6 py-3 rounded-full bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a704a] text-gray-800 dark:text-white placeholder-gray-500" title="Cari produk Jakora atau Jatastik" />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="flex justify-center mb-10 space-x-4">
          {['Jakora', 'Jatastik'].map((category) => (
            <motion.button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-3 rounded-full font-semibold ${activeCategory === category ? 'bg-[#4a704a] text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} transition-all`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title={`Lihat produk ${category}`}>
              {category}
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}>
              <ProductCard {...product} theme={theme} onViewDetail={() => setSelectedProduct(product)} />
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedProduct && (
            <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-white dark:bg-[#2a344a] p-8 rounded-xl max-w-3xl w-full mx-4 relative" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition-all" title="Tutup detail produk">×</button>
                <h3 className="text-xl font-bold text-[#4a704a] dark:text-[#a3e4b7] mb-4">{selectedProduct.name}</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg" />
                  </div>
                  <div className="md:w-1/2">
                    <p className="text-gray-600 dark:text-white mb-4">{selectedProduct.description}</p>
                    <p className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}

export default Produk;