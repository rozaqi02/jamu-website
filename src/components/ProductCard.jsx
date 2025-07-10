import { motion, AnimatePresence } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { useState } from 'react';

function ProductCard({ name, image, description, price, theme }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const whatsappNumber = '+6281283497492';
  const whatsappMessage = `Halo, saya ingin membeli:\n- ${name} x ${quantity} (Rp ${price * quantity})\nTotal: Rp ${price * quantity}\nSilakan proses pesanannya!`;

  const handleBuy = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl group bg-gradient-to-br from-green-50 to-white flex flex-col transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300x400')}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            className="bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
          >
            <FaEye />
          </motion.button>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col items-center">
        <h3 className="text-xl font-bold text-green-700 mb-2 bg-white/80 px-2 rounded-full">{name}</h3>
        <p className="text-lg font-semibold text-green-700">Rp {price.toLocaleString('id-ID')}</p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 p-1 border rounded"
          />
          <motion.button
            onClick={handleBuy}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Beli
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-green-700 mb-4">{name}</h3>
              <img src={image} alt={name} className="w-full h-64 object-cover mb-4 rounded-lg" />
              <p className="text-gray-600 mb-4">{description}</p>
              <p className="text-lg font-semibold text-green-700">Harga: Rp {price.toLocaleString('id-ID')}</p>
              <motion.button
                onClick={() => setIsExpanded(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tutup
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        New!
      </motion.div>
    </div>
  );
}

export default ProductCard;