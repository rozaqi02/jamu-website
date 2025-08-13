import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

function Testimoni({ theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const testimonials = [
    {
      name: 'Ani S.',
      text: 'Jamu ini benar-benar membantu kesehatan saya, rasanya enak dan alami!',
      rating: 5,
    },
    {
      name: 'Budi P.',
      text: 'Latte rempahnya luar biasa, cocok untuk relaksasi malam hari.',
      rating: 4,
    },
    {
      name: 'Citra L.',
      text: 'Wedang imun sangat efektif untuk daya tahan tubuh keluarga saya.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const backgroundStyle = isMounted
    ? { backgroundColor: theme === 'dark' ? '#1a1f2b' : 'white', transition: 'background-color 0.3s ease' }
    : {};

  return (
    <div
      className={`min-h-screen font-[Poppins] ${theme === 'dark' ? 'text-white' : 'text-gray-800'} overflow-hidden relative pt-16`}
      style={backgroundStyle}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-[#22624a]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            opacity: 0.5,
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.section
        className="py-20 px-6 max-w-6xl mx-auto relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold text-center mb-10 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Testimoni Pelanggan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-[#2a344a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <FaQuoteLeft className={`text-2xl mb-4 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`} />
              <p className={`text-gray-600 dark:text-gray-300 mb-4 ${theme === 'dark' ? 'text-opacity-80' : ''}`}>
                {testimonial.text}
              </p>
              <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>
                {testimonial.name}
              </h4>
              <div className="flex space-x-1 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < testimonial.rating ? (theme === 'dark' ? '#a3e4b7' : '#22624a') : 'text-gray-300 dark:text-gray-600'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Testimoni;