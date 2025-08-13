import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaSun, FaMoon } from 'react-icons/fa';
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

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const backgroundStyle = isMounted
    ? { backgroundColor: theme === 'dark' ? '#1a1f2b' : '#22624a', transition: 'background-color 0.3s ease' }
    : {};

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-md font-[Poppins] ${theme === 'dark' ? 'text-white' : 'text-white'}`}
      style={backgroundStyle}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('/')}
            title="Kembali ke Beranda"
          >
            <motion.img src="/assets/images/jamu.png" alt="Sugih Waras Logo" className="h-10 w-auto" />
          </motion.div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                className={`text-sm font-medium hover:text-[#a3e4b7] transition-colors ${location.pathname === link.path ? 'border-b-2 border-[#a3e4b7]' : ''}`}
                whileHover={{ y: -2 }}
                title={link.name}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={`Ganti ke ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
            </motion.button>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Buka/Tutup Menu"
            >
              <FaBars size={18} />
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-2 py-2 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                  className={`block px-4 py-2 text-sm font-medium hover:text-[#a3e4b7] transition-colors ${location.pathname === link.path ? 'border-l-2 border-[#a3e4b7]' : ''}`}
                  whileHover={{ x: 5 }}
                  title={link.name}
                >
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