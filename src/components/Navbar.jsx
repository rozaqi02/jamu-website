import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Produk', path: '/produk' },
    { name: 'Testimoni', path: '/testimoni' },
    { name: 'Donasi', path: '/donasi' },
    { name: 'Kontak', path: '/kontak' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.1 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent pointer-events-none" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <motion.div className="flex items-center space-x-2 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleNavClick('/')} title="Kembali ke Beranda">
            <motion.img src="/assets/images/logo-jakora2.png" alt="Jakora Logo" className="h-12 w-auto" whileTap={{ rotate: 70 }} transition={{ duration: 0.5 }} />
          </motion.div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.path} onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }} className={`text-sm font-medium transition ${location.pathname === link.path ? 'border-b-2 border-[#4a704a] dark:border-[#a3e4b7]' : theme === 'dark' ? 'text-white hover:text-[#a3e4b7]' : 'text-gray-600 hover:text-[#4a704a]'}`} title={link.name}>
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <motion.a onClick={(e) => { e.preventDefault(); toggleTheme(); }} className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title={`Ganti ke ${theme === 'light' ? 'Dark' : 'Light'} Mode`}>
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </motion.a>
            <motion.button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title="Buka/Tutup Menu">
              <FaBars size={20} />
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3" variants={menuVariants} initial="hidden" animate="visible" exit="hidden">
              {navLinks.map((link) => (
                <motion.a key={link.name} href={link.path} onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }} className={`block px-3 py-2 text-base font-medium ${location.pathname === link.path ? 'border-b-2 border-[#4a704a] dark:border-[#a3e4b7]' : theme === 'dark' ? 'text-white hover:text-[#a3e4b7]' : 'text-gray-600 hover:text-[#4a704a]'}`} variants={linkVariants} title={link.name}>
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;