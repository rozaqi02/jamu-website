import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';

function ProductCard({ name, image, description, price, theme, onViewDetail }) {
  const [quantity, setQuantity] = useState(1);
  const whatsappNumber = '+6281391546240';
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
            onClick={onViewDetail}
            className="bg-[#4a704a] text-white p-2 rounded-full shadow-lg hover:bg-[#355e3b] transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEye />
          </motion.button>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col items-center">
        <h3 className="text-xl font-bold text-[#4a704a] mb-2 bg-white/80 px-2 rounded-full">{name}</h3>
        <p className="text-lg font-semibold text-[#4a704a]">Rp {price.toLocaleString('id-ID')}</p>
        <div className="flex items-center gap-4 mt-4">
          <motion.button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="bg-[#4a704a] text-white p-2 rounded-full hover:bg-[#355e3b] transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMinus />
          </motion.button>
          <motion.span
            className="text-xl font-bold text-[#4a704a] w-12 text-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1], transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 } }}
          >
            {quantity}
          </motion.span>
          <motion.button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-[#4a704a] text-white p-2 rounded-full hover:bg-[#355e3b] transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
          </motion.button>
          <motion.button
            onClick={handleBuy}
            className="bg-[#4a704a] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#355e3b] transition-all duration-300"
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