// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // cart global
  const { count, setOpen } = useCart();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Produk", path: "/produk" },
    { name: "Testimoni", path: "/testimoni" },
    { name: "FAQ", path: "/donasi" },
    { name: "Kontak", path: "/kontak" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "rgba(26, 31, 43, 0.95)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "background-color 0.5s ease, color 0.5s ease",
      }
    : {};

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  const onAdminClick = () => handleNavClick("/admin/login");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-sm font-[Poppins] transition-colors duration-500 ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}
      style={backgroundStyle}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 relative transition-colors duration-500">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("/")}
            title="Kembali ke Beranda"
          >
            <motion.img src="/assets/images/jamu.png" alt="Sugih Waras Logo" className="h-8 w-auto" />
            <span className="text-lg font-semibold tracking-wide transition-colors duration-500">
              Jamu Sugih Waras
            </span>
          </motion.div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2 transition-colors duration-500">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                className={`text-sm font-medium relative pb-1 transition-colors duration-500 ${
                  isActive(link.path)
                    ? "text-green-600 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-green-600 after:left-0 after:bottom-0"
                    : "hover:text-green-600"
                }`}
                whileHover={{ y: -2 }}
                title={link.name}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-3">
            {/* Keranjang */}
            <motion.button
              onClick={() => setOpen(true)}
              className={`relative p-2 rounded-full transition-colors duration-500 ${
                theme === "light" ? "bg-white text-gray-700 hover:bg-gray-100" : "bg-[#1a1f2b] text-white hover:bg-[#2a2f3d]"
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              title="Buka Keranjang"
            >
              <FaShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                  {count}
                </span>
              )}
            </motion.button>

            {/* Toggle theme */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-500 ${
                theme === "light" ? "bg-white text-gray-700 hover:bg-gray-100" : "bg-[#1a1f2b] text-yellow-400 hover:bg-[#2a2f3d]"
              }`}
              whileHover={{ rotate: 20, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={`Ganti ke ${theme === "light" ? "Dark" : "Light"} Mode`}
            >
              {theme === "light" ? <FaMoonShim /> : <FaSun size={18} />}
            </motion.button>

            {/* Admin */}
            <motion.button
              onClick={onAdminClick}
              className={`hidden md:inline-flex px-3 py-1.5 rounded-full text-sm transition ${
                isActive("/admin")
                  ? "bg-green-700 text-white"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Admin
            </motion.button>

            {/* Hamburger */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md focus:outline-none transition-colors duration-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Buka/Tutup Menu"
            >
              <div className="space-y-1">
                <span className={`block h-0.5 w-5 bg-current transform transition duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transition duration-300 ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transform transition duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-3 py-3 space-y-2 rounded-lg shadow-md bg-white dark:bg-[#1a1f2b] transition-colors duration-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                  className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-500 ${
                    isActive(link.path)
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ x: 5 }}
                  title={link.name}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Tombol Keranjang & Admin di mobile */}
              <div className="flex items-center gap-2 px-4 pt-2">
                <button
                  onClick={() => { setOpen(true); setIsOpen(false); }}
                  className="flex-1 rounded-full px-3 py-2 bg-[#22624a] text-white hover:bg-[#14532d] transition"
                >
                  Keranjang {count ? `(${count})` : ''}
                </button>
                <button
                  onClick={() => { onAdminClick(); setIsOpen(false); }}
                  className={`flex-1 rounded-full px-3 py-2 transition ${
                    isActive("/admin") ? "bg-green-700 text-white" : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  Admin
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// helper kecil biar tidak error saat rename icon
function FaMoonShim(props){ return <FaMoon {...props} size={18} />; }

export default Navbar;
