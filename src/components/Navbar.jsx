// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { count, setOpen } = useCart();
  const { isAdmin } = useAuth();

  const baseLinks = [
    { name: "Beranda", path: "/" },
    { name: "Produk", path: "/produk" },
    { name: "Testimoni", path: "/testimoni" },
    { name: "FAQ", path: "/donasi" },
    { name: "Kontak", path: "/kontak" },
  ];

  // Kalau admin, tambahin Orderan & Kelola Produk
  const navLinks = isAdmin
    ? [...baseLinks, { name: "Orderan", path: "/orders" }, { name: "Kelola Produk", path: "/admin" }]
    : baseLinks;

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
          >
            <motion.img src="/assets/images/jamu.png" alt="Sugih Waras Logo" className="h-8 w-auto" />
            <span className="text-lg font-semibold tracking-wide">Jamu Sugih Waras</span>
          </motion.div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                className={`text-sm font-medium relative pb-1 ${
                  isActive(link.path)
                    ? "text-green-600 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-green-600 after:left-0 after:bottom-0"
                    : "hover:text-green-600"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Kalau bukan admin → kasih tombol login */}
            {!isAdmin && (
              <motion.button
                onClick={() => handleNavClick("/admin/login")}
                className={`px-3 py-1.5 rounded-full text-sm transition ${
                  isActive("/admin/login")
                    ? "bg-green-700 text-white"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Admin
              </motion.button>
            )}
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-3">
            {/* Keranjang */}
            <motion.button
              onClick={() => setOpen(true)}
              className={`relative p-2 rounded-full shadow-sm ${
                theme === "light"
                  ? "bg-white text-gray-700 hover:bg-gray-100"
                  : "bg-[#1a1f2b] text-gray-100 hover:bg-[#2a2f3d]"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85, rotate: -10 }}
            >
              <FaShoppingCart size={18} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white font-semibold shadow"
                >
                  {count}
                </motion.span>
              )}
            </motion.button>

            {/* Toggle theme */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "light"
                  ? "bg-white text-gray-700 hover:bg-gray-100"
                  : "bg-[#1a1f2b] text-yellow-400 hover:bg-[#2a2f3d]"
              }`}
              whileHover={{ rotate: 20, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-3 py-3 space-y-2 rounded-lg shadow-md bg-white dark:bg-[#1a1f2b]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                  className={`block px-4 py-2 text-sm font-medium rounded-md ${
                    isActive(link.path)
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Kalau bukan admin → tombol login di mobile */}
              {!isAdmin && (
                <button
                  onClick={() => { handleNavClick("/admin/login"); setIsOpen(false); }}
                  className="w-full rounded-full px-3 py-2 bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Admin
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
