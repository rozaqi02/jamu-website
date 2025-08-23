import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ id, name, image, description, price, stock, theme, onViewDetail }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { add, setOpen } = useCart();

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > stock) val = stock;
    setQuantity(val);
  };

  const goCheckout = (e) => {
    e.stopPropagation();
    const qty = quantity || 1;
    navigate(`/checkout?pid=${id}&qty=${qty}`); // mode 1-produk masih didukung
  };

  const addToCart = (e) => {
    e.stopPropagation();
    add({ id, name, price, image }, quantity);
    setOpen(true); // buka drawer biar user lihat masuk
  };

  return (
    <motion.div
      onClick={onViewDetail}
      className={`relative rounded-xl overflow-hidden shadow-md 
        ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} 
        flex flex-col cursor-pointer transition-all duration-500`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy"/>
        <motion.button
          onClick={(e) => { e.stopPropagation(); onViewDetail?.(); }}
          className="absolute bottom-3 right-3 bg-[#22624a] text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-[#1b4d37] transition"
          whileHover={{ scale: 1.1 }}
        >
          <FaEye />
        </motion.button>
      </div>

      <div className="p-3 md:p-4 flex flex-col text-center">
        <h3 className={`text-base md:text-lg font-bold mb-1 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>{name}</h3>
        <p className={`text-xs md:text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Stok: {stock} unit</p>
        <p className={`text-base md:text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>Rp {Number(price ?? 0).toLocaleString('id-ID')}</p>

        <div className="flex items-center justify-center gap-2 md:gap-3">
          <input
            type="number" min="1" max={stock} value={quantity}
            onChange={handleQuantityChange} onClick={(e)=>e.stopPropagation()}
            className={`w-14 md:w-16 px-2 py-1 rounded-lg border text-center text-sm md:text-base
              ${theme === 'dark' ? 'bg-[#344e41] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
          />
          <motion.button
            onClick={addToCart}
            className="bg-[#22624a] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md hover:bg-[#1b4d37] transition text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
          >
            + Keranjang
          </motion.button>
          <motion.button
            onClick={goCheckout}
            className="bg-[#14532d] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md hover:brightness-110 transition text-sm md:text-base"
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
