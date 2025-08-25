import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ id, name, image, description, price, stock, theme, onViewDetail }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { add } = useCart();

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > stock) val = stock;
    setQuantity(val);
  };

  const goCheckout = (e) => {
    e.stopPropagation();
    const qty = quantity || 1;
    navigate(`/checkout?pid=${id}&qty=${qty}`);
  };

  const addToCart = (e) => {
    e.stopPropagation();
    add({ id, name, price, image }, quantity);
  };

  return (
    <motion.div
      onClick={onViewDetail}
      className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
      whileHover={{ y: -2 }}
    >
      {/* Gambar */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail?.();
          }}
          className="absolute bottom-3 right-3 bg-emerald-600 text-white p-2.5 rounded-full shadow-lg hover:bg-emerald-700 transition"
          whileHover={{ scale: 1.05 }}
          aria-label="Lihat detail"
        >
          <FaEye />
        </motion.button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col text-center gap-1.5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Stok: {stock} unit</p>
        <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">
          Rp {Number(price ?? 0).toLocaleString("id-ID")}
        </p>

        <div className="mt-3 flex items-center justify-center gap-3">
          <input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onClick={(e) => e.stopPropagation()}
            onChange={handleQuantityChange}
            className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-center focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <motion.button
            onClick={addToCart}
            className="rounded-full px-4 py-2 bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
            whileHover={{ scale: 1.02 }}
          >
            + Keranjang
          </motion.button>
          <motion.button
            onClick={goCheckout}
            className="rounded-full px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm hover:brightness-110 transition"
            whileHover={{ scale: 1.02 }}
          >
            Beli
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
