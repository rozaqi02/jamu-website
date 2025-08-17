import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';

function FAQ({ theme }) {
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

  const faqs = [
    {
      question: 'Apa itu Jamu Sugih Waras?',
      answer: 'Jamu Sugih Waras adalah produk herbal tradisional dari rempah pilihan yang dikemas secara modern untuk mendukung kesehatan dan kesejahteraan Anda.'
    },
    {
      question: 'Bagaimana cara menyimpan jamu?',
      answer: 'Simpan jamu di tempat kering dan sejuk, hindari paparan sinar matahari langsung untuk menjaga kualitas.'
    },
    {
      question: 'Apakah jamu ini halal?',
      answer: 'Ya, semua produk Jamu Sugih Waras telah tersertifikasi halal dan aman untuk dikonsumsi.'
    },
    {
      question: 'Berapa lama pengiriman biasanya?',
      answer: 'Pengiriman biasanya memakan waktu 2-5 hari tergantung lokasi Anda.'
    },
    {
      question: 'Bagaimana cara memesan dalam jumlah besar?',
      answer: 'Untuk pemesanan grosir, silakan hubungi kami melalui WhatsApp (+6285745135415) untuk informasi lebih lanjut.'
    }
  ];

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
          FAQ
        </motion.h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-[#2a344a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3 className={`flex items-center gap-2 text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>
                <FaQuestionCircle /> {faq.question}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 ${theme === 'dark' ? 'text-opacity-80' : ''}`}>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default FAQ;