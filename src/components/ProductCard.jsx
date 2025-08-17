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
      className={`relative rounded-2xl overflow-hidden shadow-md 
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-white to-green-50'} 
        flex flex-col cursor-pointer transition-all duration-500`}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gambar */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Badge “New” */}
        <motion.div
          className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          New!
        </motion.div>
        {/* Quick View */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); onViewDetail(); }}
          className="absolute bottom-3 right-3 bg-[#22624a] text-white p-3 rounded-full shadow-lg hover:bg-[#754a28] transition"
          whileHover={{ scale: 1.15 }}
        >
          <FaEye />
        </motion.button>
      </div>

      {/* Info Produk */}
      <div className="p-4 flex flex-col text-center">
        <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>
          {name}
        </h3>
        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Stok: {stock} unit
        </p>
        <p className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>
          Rp {price.toLocaleString('id-ID')}
        </p>

        {/* Action */}
        <div className="flex items-center justify-center gap-3">
          <input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onChange={handleQuantityChange}
            className={`w-16 px-2 py-1 rounded-lg border text-center 
              ${theme === 'dark' 
                ? 'bg-[#344e41] border-gray-600 text-white' 
                : 'bg-gray-100 border-gray-300 text-gray-800'}`}
          />
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleBuy(); }}
            className="bg-[#22624a] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#754a28] transition"
            whileHover={{ scale: 1.05 }}
          >
            Beli
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;