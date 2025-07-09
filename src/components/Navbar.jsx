import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaSun, FaMoon } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
const { language, toggleLanguage } = useLanguage();

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: language === 'id' ? 'Beranda' : 'Home', path: '/' },
    { name: 'Produk', path: '/produk' },
    { name: 'Testimoni', path: '/testimoni' },
    { name: 'FAQ', path: '/faq' },
    { name: language === 'id' ? 'Kontak' : 'Contact', path: '/kontak' },
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="absolute inset-0 bg-white/30 dark:bg-black/20 backdrop-blur-md shadow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('/')}
          >
            <motion.img
              src="/assets/images/logo-jakora2.png"
              alt="Jakora Logo"
              className="h-10 w-auto"
              whileTap={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <motion.span
              className="text-xl font-bold text-blue-700"
              whileTap={{ color: '#f97316' }}
              transition={{ duration: 0.3 }}
            >
              Jakora
            </motion.span>
          </motion.div>
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-white hover:bg-blue-500 hover:text-white transition"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </motion.button>
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBars size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden relative z-10"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow" />
          <div className="max-w-7xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-3 relative z-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-blue-500 hover:text-white transition"
              >
                {link.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;