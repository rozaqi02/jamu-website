import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ theme, toggleTheme, cartItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Produk', path: '/produk' },
    { name: 'Testimoni', path: '/testimoni' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontak', path: '/kontak' },
    { name: 'Keranjang', path: '/keranjang', count: cartItems.length },
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-md ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </motion.div>
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                className={`text-sm font-medium transition ${location.pathname === link.path ? 'border-b-2 border-[#a3e4b7]' : theme === 'dark' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.name}
                {link.name === 'Keranjang' && link.count > 0 && (
                  <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1">{link.count}</span>
                )}
              </a>
            ))}
            <motion.a
              onClick={(e) => { e.preventDefault(); toggleTheme(); }}
              className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;