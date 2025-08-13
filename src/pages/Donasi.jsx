import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDonate } from 'react-icons/fa';

function Donasi({ theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [donationAmount, setDonationAmount] = useState(50000);

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
          Dukung Kami dengan Donasi
        </motion.h2>
        <motion.div
          className="bg-white dark:bg-[#2a344a] p-8 rounded-xl shadow-lg max-w-md mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Donasi Anda membantu kami melestarikan tradisi jamu dan mendukung petani lokal.
          </p>
          <div className="mb-6">
            <label className={`block text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}>Jumlah Donasi (Rp)</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Math.max(10000, parseInt(e.target.value) || 0))}
              className={`w-full px-4 py-3 rounded-full border ${theme === 'dark' ? 'bg-[#344e41] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-[#22624a] dark:focus:ring-[#a3e4b7]`}
            />
          </div>
          <motion.button
            className="w-full flex items-center justify-center gap-2 bg-[#22624a] text-white py-3 rounded-full hover:bg-[#754a28] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const message = `Halo, saya ingin berdonasi Rp ${donationAmount.toLocaleString('id-ID')} ke Jamu Sugih Waras.`;
              window.open(`https://wa.me/${'+6285745135415'}?text=${encodeURIComponent(message)}`, '_blank');
            }}
          >
            <FaDonate /> Donasi Sekarang
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Donasi;