import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Beranda({ theme, toggleTheme }) {
  const [typingText, setTypingText] = useState('DAPATKAN');
  const texts = ['DAPATKAN', 'EKSPERIENSI', 'NIKMATI'];
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const images = [
    '/assets/images/jakora-premium1.png',
    '/assets/images/jakora-premium2.png',
    '/assets/images/jakora-premium3.png',
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      let i = 0;
      const timer = setInterval(() => {
        setTypingText(texts[index].slice(0, i + 1));
        i++;
        if (i > texts[index].length) clearInterval(timer);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(imageInterval);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>
      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('/assets/images/hero-bg.jpg')` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        <motion.div
          className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0" variants={itemVariants}>
            <motion.h2
              className={`text-lg font-semibold uppercase ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'} typing-effect`}
              variants={itemVariants}
            >
              {typingText}
            </motion.h2>
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#4a704a] to-[#355e3b] dark:from-[#a3e4b7] dark:to-[#7fd8a1]"
              variants={itemVariants}
            >
              Produk Inovatif dan Sehat
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-gray-100 dark:text-white mb-8 max-w-md"
              variants={itemVariants}
            >
              Kewirausahaan sosial berbasis jamur guna mewujudkan Green Economy dan Ecological Sustainability di Indonesia.
            </motion.p>
            <motion.a
              href="/produk"
              className="inline-flex items-center gap-2 bg-[#4a704a] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#355e3b] dark:bg-[#a3e4b7] dark:hover:bg-[#7fd8a1] transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Produk <FaArrowRight />
            </motion.a>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Produk Jakora"
              className="w-full max-w-md rounded-xl drop-shadow-2xl object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Mengapa Memilih Jakora? */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <h2 className={`text-5xl font-extrabold text-center ${theme === 'dark' ? 'text-[#8A9A5B]' : 'text-[#4a704a]'} mb-12 bg-[#4a704a]/10 p-6 rounded-xl`}>
          Mengapa Memilih Jakora?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Sehat Alami</h3>
            <p className="text-gray-600 dark:text-white">Produk jamur 100% alami untuk gaya hidup sehat.</p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Berkelanjutan</h3>
            <p className="text-gray-600 dark:text-white">Mendukung Green Economy dan ekologi.</p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Rasa Autentik</h3>
            <p className="text-gray-600 dark:text-white">Cita rasa tradisional dalam setiap gigitan.</p>
          </motion.div>
        </div>

        {/* Edukasi tentang Jamur */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="py-20 px-4 bg-[#f5f5f5] dark:bg-[#2a344a] rounded-xl"
        >
          <h2 className={`text-5xl font-extrabold text-center ${theme === 'dark' ? 'text-[#8A9A5B]' : 'text-[#4a704a]'} mb-12`}>
            Edukasi tentang Jamur
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#4a704a]/20 top-0"></div>
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="flex items-center mb-12"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                  <motion.div
                    className="bg-white dark:bg-[#344e41] p-6 rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7]">
                      Manfaat Jamur {index}
                    </h3>
                    <p className="text-gray-600 dark:text-white mt-2">
                      {hoveredIndex === index ? 'Detail manfaat jamur seperti vitamin D dan antioksidan.' : 'Hover untuk detail!'}
                    </p>
                  </motion.div>
                </div>
                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right order-1' : 'text-left order-2'}`}>
                  <div className="w-10 h-10 bg-[#4a704a] rounded-full flex items-center justify-center text-white font-bold">
                    {index}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <motion.div
              className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Nutrisi</h3>
              <p className="text-gray-600 dark:text-white">Jamur kaya akan vitamin dan mineral.</p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Keberlanjutan</h3>
              <p className="text-gray-600 dark:text-white">Produksi ramah lingkungan.</p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Rasa</h3>
              <p className="text-gray-600 dark:text-white">Cita rasa unik dan autentik.</p>
            </motion.div>
          </div>
        </motion.section>
      </motion.section>
    </div>
  );
}

export default Beranda;