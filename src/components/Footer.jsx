import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaInstagram } from 'react-icons/fa';

function Footer({ theme }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const backgroundStyle = isMounted
    ? { backgroundColor: theme === 'dark' ? '#1a2c24' : '#1a2c24', transition: 'background-color 0.3s ease' }
    : {};

  return (
    <footer
      className={`py-8 text-white font-[Poppins] ${theme === 'dark' ? 'text-white' : 'text-white'}`}
      style={backgroundStyle}
    >
      <motion.div
        className="max-w-6xl mx-auto px-6 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.a
            href="mailto:info@sugihwaras.com"
            className="flex items-center gap-2 hover:text-[#a3e4b7] transition-colors"
            whileHover={{ scale: 1.05 }}
            title="Kirim email"
          >
            <FaEnvelope /> info@sugihwaras.com
          </motion.a>
          <motion.a
            href="https://wa.me/6285745135415"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#a3e4b7] transition-colors"
            whileHover={{ scale: 1.05 }}
            title="Hubungi via WhatsApp"
          >
            <FaWhatsapp /> +6285745135415
          </motion.a>
          <motion.a
            href="https://www.instagram.com/rumahrempahsugihwaras/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#a3e4b7] transition-colors"
            whileHover={{ scale: 1.05 }}
            title="Ikuti di Instagram"
          >
            <FaInstagram /> @rumahrempahsugihwaras
          </motion.a>
        </motion.div>
        <motion.p
          className="text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          © 2025 Jamu Sugih Waras. Hak cipta dilindungi.
        </motion.p>
      </motion.div>
    </footer>
  );
}

export default Footer;