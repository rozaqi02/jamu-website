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
    { name: 'Jakora Original', image: '/assets/images/jakoriginal.png', description: 'Rendang jamur vegan dengan cita rasa autentik Minangkabau.', price: 38000, stock: 75 },
    { name: 'Jakora Spicy', image: '/assets/images/jakspicy.png', description: 'Rendang jamur vegan dengan sensasi pedas yang menggugah selera.', price: 38000, stock: 75 },
    { name: 'Jakora Blackpaper', image: '/assets/images/jakblackpaper.png', description: 'Rendang jamur vegan dengan aroma lada hitam yang kuat.', price: 38000, stock: 75 },
  ],
  Jatastik: [
    { name: 'Jatastik Original', image: '/assets/images/original.png', description: 'Snack renyah dari jamur sawit dan beras merah, penuh nutrisi.', price: 12000, stock: 75 },
    { name: 'Jatastik Spicy', image: '/assets/images/spicy.png', description: 'Snack pedas gurih dari jamur sawit, cocok untuk pecinta pedas.', price: 12000, stock: 75 },
    { name: 'Jatastik Cheese', image: '/assets/images/cheese.png', description: 'Snack jamur dengan lapisan keju creamy yang menggoda.', price: 12000, stock: 75 },
  ],
};
  const filteredProducts = products[activeCategory].filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen font-poppins ${theme === 'dark' ? 'bg-[#1a1f2b] text-white' : 'bg-white text-gray-800'} overflow-hidden relative pt-16`}>
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-6 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>Jelajahi Produk Kami</h2>
        <div className="mb-8">
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-6 py-3 rounded-full border ${theme === 'dark' ? 'bg-[#2a344a] border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-[#4a704a] dark:focus:ring-[#a3e4b7]`}
              title="Cari produk Jakora atau Jatastik"
            />
            <FaSearch className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>
        <div className="flex justify-center mb-10 space-x-4">
          {['Jakora', 'Jatastik'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${activeCategory === category ? 'bg-[#4a704a] text-white' : theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={`Lihat produk ${category}`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedProduct(product)}
              className="cursor-pointer"
            >
              <ProductCard {...product} theme={theme} />
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={`bg-white dark:bg-[#2a344a] p-8 rounded-xl max-w-4xl w-full mx-4 relative shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition-all"
                  title="Tutup detail produk"
                >
                  ×
                </button>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <motion.img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>{selectedProduct.name}</h3>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{selectedProduct.description}</p>
                    <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                    <p className={`text-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Stok Tersedia: {selectedProduct.stock} unit</p>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="1"
                        max={selectedProduct.stock}
                        defaultValue={1}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value < 1) e.target.value = 1;
                          if (value > selectedProduct.stock) e.target.value = selectedProduct.stock;
                        }}
                        className={`w-20 px-3 py-2 rounded-full border ${theme === 'dark' ? 'bg-[#344e41] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-[#4a704a] dark:focus:ring-[#a3e4b7]`}
                        title="Jumlah produk"
                      />
                      <motion.button
                        onClick={() => {
                          const quantity = document.querySelector('input[type="number"]').value;
                          const whatsappMessage = `Halo, saya ingin membeli:\n- ${selectedProduct.name} x ${quantity} (Rp ${(selectedProduct.price * quantity).toLocaleString('id-ID')})\nTotal: Rp ${(selectedProduct.price * quantity).toLocaleString('id-ID')}\nSilakan proses pesanannya!`;
                          window.open(`https://wa.me/${'+6281391546240'}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                        }}
                        className={`bg-[#4a704a] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#355e3b] transition-all ${theme === 'dark' ? 'hover:bg-[#7fd8a1]' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Beli via WhatsApp"
                      >
                        Pesan Sekarang
                      </motion.button>
                    </div>
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