import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

function Produk({ theme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Jamu Herbal');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const products = {
    'Jamu Herbal': [
      { name: 'Teh rempah', image: '/assets/images/Teh rempah.jpg', description: 'Teh herbal dari rempah pilihan untuk relaksasi dan kesehatan.', price: 25000, stock: 100 },
      { name: 'Beras kencur premium', image: '/assets/images/Beras kencur premium.jpg', description: 'Minuman beras kencur untuk stamina dan pencernaan.', price: 30000, stock: 100 },
      { name: 'Wedang secang', image: '/assets/images/Wedang secang.jpg', description: 'Wedang hangat dengan secang untuk kesehatan jantung.', price: 28000, stock: 100 },
    ],
    'Latte Rempah': [
      { name: 'Latte rempah', image: '/assets/images/Latte rempah.jpg', description: 'Latte herbal dengan cita rasa unik dan menyehatkan.', price: 35000, stock: 80 },
      { name: 'Wood creamy latte', image: '/assets/images/Wood creamy latte.jpg', description: 'Latte creamy dengan aroma kayu manis alami.', price: 38000, stock: 80 },
      { name: 'Turmeric creamy latte', image: '/assets/images/Turmeric creamy latte.jpg', description: 'Latte kunyit untuk anti-inflamasi dan kesehatan kulit.', price: 38000, stock: 80 },
    ],
    'Wedang Spesial': [
      { name: 'Blue butterfly creamy latte', image: '/assets/images/Blue butterfly creamy latte.jpg', description: 'Latte unik dengan bunga telang untuk ketenangan.', price: 40000, stock: 70 },
      { name: 'Rosy creamy latte', image: '/assets/images/Rosy creamy latte.jpg', description: 'Latte beraroma mawar untuk relaksasi dan kecantikan.', price: 40000, stock: 70 },
      { name: 'Wedang imun', image: '/assets/images/Wedang imun.jpg', description: 'Wedang herbal untuk meningkatkan daya tahan tubuh.', price: 32000, stock: 90 },
      { name: 'Wedang jinten gula aren', image: '/assets/images/Wedang jinten gula aren.jpg', description: 'Wedang hangat dengan jinten dan gula aren alami.', price: 32000, stock: 90 },
    ],
  };

  const filteredProducts = products[activeCategory] ? products[activeCategory].filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const backgroundStyle = isMounted
    ? { backgroundColor: theme === 'dark' ? '#1a1f2b' : 'white', transition: 'background-color 0.3s ease' }
    : {};

  return (
    <div
      className={`min-h-screen font-[Poppins] ${theme === 'dark' ? 'text-white' : 'text-gray-800'} overflow-hidden relative pt-16`}
      style={backgroundStyle}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-[#22624a]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            opacity: 0.5,
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.section
        className="py-20 px-6 max-w-6xl mx-auto relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold text-center mb-10 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Jelajahi Produk Kami
        </motion.h2>
        <div className="mb-10">
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-6 py-3 rounded-full border ${theme === 'dark' ? 'bg-[#2a344a] border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-[#22624a] dark:focus:ring-[#a3e4b7]`}
            />
            <FaSearch className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>
        <div className="flex justify-center mb-10 space-x-4">
          {Object.keys(products).map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${activeCategory === category ? 'bg-[#22624a] text-white' : theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#2a344a] shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className={`text-xl font-[Montserrat] font-bold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>
                  {product.name}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {product.description.substring(0, 50)}...
                </p>
                <p className={`text-lg font-semibold mt-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <motion.button
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-[#22624a] text-white py-2 rounded-full hover:bg-[#754a28] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaShoppingCart /> Lihat Detail
                </motion.button>
              </div>
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
                className={`bg-white dark:bg-[#2a344a] p-8 rounded-2xl max-w-3xl w-full mx-4 relative shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-white bg-[#22624a] p-2 rounded-full hover:bg-[#754a28] transition-all"
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
                    <h3 className={`text-3xl font-[Montserrat] font-bold ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>
                      {selectedProduct.name}
                    </h3>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedProduct.description}
                    </p>
                    <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>
                      Rp {selectedProduct.price.toLocaleString('id-ID')}
                    </p>
                    <p className={`text-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Stok Tersedia: {selectedProduct.stock} unit
                    </p>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="1"
                        max={selectedProduct.stock}
                        defaultValue="1"
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value < 1) e.target.value = 1;
                          if (value > selectedProduct.stock) e.target.value = selectedProduct.stock;
                        }}
                        className={`w-20 px-3 py-2 rounded-full border ${theme === 'dark' ? 'bg-[#344e41] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-[#22624a] dark:focus:ring-[#a3e4b7]`}
                      />
                      <motion.button
                        onClick={() => {
                          const quantity = document.querySelector('input[type="number"]').value;
                          const whatsappMessage = `Halo, saya ingin membeli:\n- ${selectedProduct.name} x ${quantity} (Rp ${(selectedProduct.price * quantity).toLocaleString('id-ID')})\nTotal: Rp ${(selectedProduct.price * quantity).toLocaleString('id-ID')}\nSilakan proses pesanannya!`;
                          window.open(`https://wa.me/${'+6285745135415'}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                        }}
                        className={`bg-[#22624a] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#754a28] transition-all ${theme === 'dark' ? 'hover:bg-[#7fd8a1]' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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