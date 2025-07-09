import { motion } from 'framer-motion';
import { useState } from 'react';

function ProductCard({ name, image, category, description }) {
  const [hearts, setHearts] = useState([]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y: y - i * 10,
      delay: i * 0.1,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => !newHearts.some((h) => h.id === heart.id)));
    }, 1000);
  };

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden shadow-lg group bg-[var(--section-bg)]"
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      style={{ aspectRatio: '3/4' }}
    >
      <div className="relative">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
          style={{ aspectRatio: '3/4' }}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300x400')}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
        />
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="absolute text-2xl"
            style={{ left: heart.x, top: heart.y }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, delay: heart.delay, ease: 'easeOut' }}
          >
            ❤️
          </motion.span>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[var(--text-color)] text-center">{name}</h3>
      </div>
    </motion.div>
  );
}

export default ProductCard;