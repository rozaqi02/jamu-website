import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

function ProductCard({ name, image, description, onAddToCart }) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-xl group bg-gradient-to-br from-green-50 to-white flex flex-col transform hover:-translate-y-2 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300x400')}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col items-center">
        <h3 className="text-xl font-bold text-green-700 mb-2 bg-white/80 px-2 rounded-full">{name}</h3>
        <motion.button
          onClick={onAddToCart}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaShoppingCart /> Tambah ke Keranjang
        </motion.button>
      </div>
      <motion.div
        className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        New!
      </motion.div>
    </motion.div>
  );
}

export default ProductCard;