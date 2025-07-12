import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { FaSearch } from 'react-icons/fa';

function Produk({ theme, toggleTheme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Jakora');
  const jakoraProducts = [
    { name: 'Jakora Original', image: '/assets/images/jakora-original.jpg', description: 'Jakora Original adalah rendang jamur vegan yang dirancang dengan cita rasa autentik, menggabungkan rempah-rempah tradisional Indonesia untuk memberikan pengalaman kuliner yang kaya dan memanjakan lidah. Produk ini dibuat dari jamur pilihan yang diproses secara higienis, menawarkan alternatif sehat bagi pecinta kuliner yang ingin menjaga pola makan seimbang tanpa mengorbankan rasa. Cocok untuk disantap bersama keluarga atau sebagai camilan bergizi di tengah hari.', price: 38000 },
    { name: 'Jakora Spicy', image: '/assets/images/jakora-spicy.jpg', description: 'Jakora Spicy menghadirkan rendang jamur vegan dengan sentuhan pedas yang khas, diciptakan untuk mereka yang menyukai sensasi pedas dalam setiap gigitan. Dibuat dari campuran jamur segar dan bumbu pilihan, produk ini tidak hanya lezat tetapi juga kaya akan nutrisi, mendukung gaya hidup sehat dengan cita rasa yang autentik. Ideal untuk dinikmati bersama nasi hangat atau sebagai tambahan menu makan malam yang spesial.', price: 38000 },
    { name: 'Jakora Blackpaper', image: '/assets/images/jakora-blackpaper.jpg', description: 'Jakora Blackpaper menawarkan rendang jamur vegan dengan aroma dan rasa lada hitam yang kuat, memberikan pengalaman kuliner yang unik dan memikat. Produk ini menggunakan jamur berkualitas tinggi yang dipadukan dengan rempah alami, menjadikannya pilihan sempurna untuk pecinta rasa pedas dan gurih. Dengan proses produksi yang ramah lingkungan, Jakora Blackpaper juga mendukung keberlanjutan dan kesehatan konsumen dalam setiap sajian.', price: 38000 }
  ];
  const jatastikProducts = [
    { name: 'Jatastik Original', image: '/assets/images/original.jpg', description: 'Jatastik Original adalah snack jamur sawit rasa original yang renyah dan penuh nutrisi, dibuat dari jamur segar yang diolah dengan teknik khusus untuk menjaga kelezatannya. Produk ini cocok sebagai camilan sehat sehari-hari, memberikan energi tambahan tanpa rasa bersalah karena bebas pengawet buatan. Nikmati tekstur renyahnya yang sempurna untuk menemani waktu santai atau aktivitas harian Anda.', price: 12000 },
    { name: 'Jatastik Spicy', image: '/assets/images/spicy.jpg', description: 'Jatastik Spicy adalah varian snack jamur sawit dengan rasa pedas gurih yang menggugah selera, dirancang untuk pecinta makanan pedas. Dibuat dari bahan alami dan diproses dengan standar tinggi, produk ini tidak hanya lezat tetapi juga kaya akan serat dan vitamin yang baik untuk pencernaan. Cocok dinikmati saat nongkrong atau sebagai teman menonton film favorit Anda.', price: 12000 },
    { name: 'Jatastik Cheese', image: '/assets/images/cheese.jpg', description: 'Jatastik Cheese menawarkan snack jamur sawit dengan lapisan keju creamy yang menggoda, memberikan sensasi rasa yang kaya dan memanjakan. Produk ini dibuat dari jamur pilihan dan keju berkualitas, menjadikannya pilihan ideal untuk camilan sehat yang tetap nikmat. Dengan tekstur renyah dan aroma keju yang khas, Jatastik Cheese cocok untuk dinikmati kapan saja, terutama saat bersantai bersama teman atau keluarga.', price: 12000 }
  ];
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = (activeCategory === 'Jakora' ? jakoraProducts : jatastikProducts).filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative pt-16`}>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <h2 className={`text-5xl font-extrabold text-center mb-6 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
          Jelajahi Produk Kami
        </h2>
        <div className="mb-8">
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a704a] text-gray-800 dark:text-white placeholder-gray-500"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="flex justify-center mb-10 space-x-4">
          <motion.button
            onClick={() => setActiveCategory('Jakora')}
            className={`px-6 py-3 rounded-full font-semibold ${activeCategory === 'Jakora' ? 'bg-[#4a704a] text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} transition-all duration-300`}
            whileHover={{ scale: 1.1, backgroundColor: activeCategory === 'Jakora' ? '#355e3b' : '#e0e0e0' }}
            whileTap={{ scale: 0.95 }}
          >
            Jakora
          </motion.button>
          <motion.button
            onClick={() => setActiveCategory('Jatastik')}
            className={`px-6 py-3 rounded-full font-semibold ${activeCategory === 'Jatastik' ? 'bg-[#4a704a] text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} transition-all duration-300`}
            whileHover={{ scale: 1.1, backgroundColor: activeCategory === 'Jatastik' ? '#355e3b' : '#e0e0e0' }}
            whileTap={{ scale: 0.95 }}
          >
            Jatastik
          </motion.button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
            >
              <ProductCard {...product} theme={theme} onViewDetail={() => setSelectedProduct(product)} />
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
                className="bg-white dark:bg-[#2a344a] p-8 rounded-xl max-w-3xl w-full mx-4 relative"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition-all"
                >
                  ×
                </button>
                <h3 className="text-3xl font-bold text-[#4a704a] dark:text-[#a3e4b7] mb-4">{selectedProduct.name}</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg" />
                  </div>
                  <div className="md:w-1/2">
                    <p className="text-gray-600 dark:text-white mb-4">{selectedProduct.description}</p>
                    <p className="text-2xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
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