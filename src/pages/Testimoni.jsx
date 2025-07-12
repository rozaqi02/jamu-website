import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Testimoni({ theme, toggleTheme }) {
  const testimonials = [
    { name: 'Ani', text: 'Jakora sangat lezat dan sehat, cocok untuk diet vegan!', rating: 5 },
    { name: 'Budi', text: 'Jatastik rasa keju bikin nagih, pengiriman cepat pula!', rating: 4 },
    { name: 'Citra', text: 'Produk ramah lingkungan, rasa autentik banget!', rating: 5 }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative pt-16`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 max-w-7xl mx-auto pt-32"
      >
        <h2 className={`text-5xl font-extrabold text-center ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
          Apa Kata Mereka?
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="bg-white dark:bg-[#2a344a] p-8 rounded-xl shadow-2xl text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, x: currentIndex === 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentIndex === testimonials.length - 1 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-600 dark:text-white mb-4 italic">"{testimonials[currentIndex].text}"</p>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < testimonials[currentIndex].rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                  />
                ))}
              </div>
              <p className="font-semibold text-[#4a704a] dark:text-[#a3e4b7]">- {testimonials[currentIndex].name}</p>
            </motion.div>
          </AnimatePresence>
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#4a704a] text-white p-3 rounded-full hover:bg-[#355e3b] transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#4a704a] text-white p-3 rounded-full hover:bg-[#355e3b] transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}

export default Testimoni;