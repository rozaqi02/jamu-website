import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/**
 * ProductCard
 * - prop view: "grid" | "compact"
 * - tombol “mata” dihapus — klik kartu/gambar untuk lihat detail
 */
function ProductCard({
  id,
  name,
  image,
  description,
  price,
  stock,
  theme,
  onViewDetail,
  view = "grid",
}) {
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

  /* =============== GRID MODE =============== */
  if (view === "grid") {
    return (
      <motion.div
        onClick={onViewDetail}
        className="relative rounded-2xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
        whileHover={{ y: -2 }}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <div className="p-4 flex flex-col text-center gap-1.5">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          <p className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">
            Rp {Number(price ?? 0).toLocaleString("id-ID")}
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 md:gap-3">
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
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-lg font-bold">+</span>
              <span>Keranjang</span>
            </motion.button>
            <motion.button
              onClick={goCheckout}
              className="rounded-full px-3 md:px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm hover:brightness-110 transition"
              whileHover={{ scale: 1.02 }}
            >
              Beli
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Stok: {stock}
          </p>
        </div>
      </motion.div>
    );
  }

  /* =============== COMPACT MODE =============== */
  return (
    <motion.div
      onClick={onViewDetail}
      className="w-full rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      whileHover={{ y: -1 }}
    >
      <div className="flex gap-3 p-3 items-stretch">
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
            {name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <span className="text-base md:text-lg font-bold text-emerald-700 dark:text-emerald-300">
              Rp {Number(price ?? 0).toLocaleString("id-ID")}
            </span>
            <span className="text-xs opacity-80">Stok: {stock}</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onClick={(e) => e.stopPropagation()}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-center focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <div className="flex items-center gap-2">
            <motion.button
              onClick={addToCart}
              className="px-1.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs hover:bg-emerald-700 transition"
              whileHover={{ scale: 1.02 }}
            >
              +Keranjang
            </motion.button>
            <motion.button
              onClick={goCheckout}
              className="px-3 py-1.5 rounded-full bg-gray-900 dark:bg-gray-700 text-white text-xs hover:brightness-110 transition"
              whileHover={{ scale: 1.02 }}
            >
              Beli
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
