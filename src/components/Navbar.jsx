import { useState } from 'react';
import { motion } from 'framer-motion';
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
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontak', path: '/kontak' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md">
      <div
        className="absolute inset-0"
        style={{
          background: theme === 'dark' ? 'rgba(26, 31, 43, 0.1)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
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
          </motion.div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                className={`text-sm font-medium transition ${location.pathname === link.path ? 'border-b-2 border-[#4a704a] dark:border-[#a3e4b7]' : theme === 'dark' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <motion.a
              onClick={(e) => { e.preventDefault(); toggleTheme(); }}
              className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </motion.a>
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBars size={20} />
              </motion.button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                  className={`block px-3 py-2 text-base font-medium ${location.pathname === link.path ? 'border-b-2 border-[#4a704a] dark:border-[#a3e4b7]' : theme === 'dark' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;