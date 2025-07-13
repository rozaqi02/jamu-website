import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { useState } from 'react';

function ProductCard({ name, image, description, price, theme, onViewDetail }) {
  const [quantity, setQuantity] = useState(1);
  const whatsappNumber = '+6281391546240';
  const whatsappMessage = `Halo, saya ingin membeli:\n- ${name} x ${quantity} (Rp ${price * quantity})\nTotal: Rp ${price * quantity}\nSilakan proses pesanannya!`;

  const handleBuy = () => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) setQuantity(value);
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl group bg-gradient-to-br from-green-50 to-white flex flex-col transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <motion.img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => (e.target.src = 'https://via.placeholder.com/300x400')} whileHover={{ scale: 1.1 }} title={name} />
        <motion.button onClick={onViewDetail} className="absolute bottom-2 right-2 bg-[#4a704a] text-white p-2 rounded-full shadow-lg hover:bg-[#355e3b] transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title="Lihat detail produk"><FaEye /></motion.button>
      </div>
      <div className="p-4 flex-grow flex flex-col items-center">
        <h3 className="text-xl font-bold text-[#4a704a] mb-2 bg-white/80 px-2 rounded-full">{name}</h3>
        <p className="text-lg font-semibold text-[#4a704a]">Rp {price.toLocaleString('id-ID')}</p>
        <div className="flex items-center gap-4 mt-4">
          <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="w-20 px-3 py-2 border border-gray-300 rounded-full text-center text-[#4a704a] font-bold" title="Jumlah produk" />
          <motion.button onClick={handleBuy} className="bg-[#4a704a] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#355e3b] transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} title="Beli via WhatsApp">Beli</motion.button>
        </div>
      </div>
      <motion.div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }} title="Produk baru">New!</motion.div>
    </div>
  );
}

export default ProductCard;