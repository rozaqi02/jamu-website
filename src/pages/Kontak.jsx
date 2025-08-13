import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaInstagram } from 'react-icons/fa';

function Kontak({ theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

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
        style={{ scale }}
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
          Hubungi Kami
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.a
            href="mailto:info@sugihwaras.com"
            className="p-6 bg-white dark:bg-[#2a344a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className={`text-3xl mb-4 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`} />
            <p className="text-center">info@sugihwaras.com</p>
          </motion.a>
          <motion.a
            href="https://wa.me/6285745135415"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white dark:bg-[#2a344a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp className={`text-3xl mb-4 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`} />
            <p className="text-center">+6285745135415</p>
          </motion.a>
          <motion.a
            href="https://www.instagram.com/rumahrempahsugihwaras/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white dark:bg-[#2a344a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram className={`text-3xl mb-4 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`} />
            <p className="text-center">@rumahrempahsugihwaras</p>
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}

export default Kontak;