import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { useState } from 'react';

function ProductCard({ name, image, description, price, stock, theme, onViewDetail }) {
  const [quantity, setQuantity] = useState(1);
  const whatsappNumber = '+6285745135415';
  const whatsappMessage = `Halo, saya ingin membeli:\n- ${name} x ${quantity} (Rp ${price * quantity})\nTotal: Rp ${price * quantity}\nSilakan proses pesanannya!`;

  const handleBuy = () => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= stock) setQuantity(value);
  };

  return (
    <motion.div
      onClick={onViewDetail}
      className={`relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900' : 'from-green-50 to-white'} flex flex-col cursor-pointer transition-all duration-300`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300x400')}
          title={name}
        />
        <motion.button
          onClick={onViewDetail}
          className={`absolute bottom-2 right-2 bg-[#4a704a] text-white p-2 rounded-full shadow-lg hover:bg-[#355e3b] transition-all ${theme === 'dark' ? 'hover:bg-[#7fd8a1]' : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Lihat detail jamu"
        >
          <FaEye />
        </motion.button>
      </div>
      <div className="p-4 flex-grow flex flex-col items-center">
        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'} mb-2 bg-white/80 px-2 rounded-full`}>{name}</h3>
        <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>Rp {price.toLocaleString('id-ID')}</p>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Stok: {stock} unit</p>
        <div className="flex items-center gap-4 mt-2">
          <input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onChange={handleQuantityChange}
            className={`w-20 px-3 py-2 rounded-full border ${theme === 'dark' ? 'bg-[#344e41] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-[#4a704a] dark:focus:ring-[#a3e4b7]`}
            title="Jumlah jamu"
          />
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleBuy(); }}
            className={`bg-[#4a704a] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#355e3b] transition-all ${theme === 'dark' ? 'hover:bg-[#7fd8a1]' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Beli via WhatsApp"
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
        title="Produk baru"
      >
        New!
      </motion.div>
    </motion.div>
  );
}

export default ProductCard;