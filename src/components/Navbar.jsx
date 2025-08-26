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
  const { isAdmin, logoutAdmin } = useAuth();

  const baseLinks = [
    { name: "Beranda", path: "/" },
    { name: "Produk", path: "/produk" },
    { name: "Testimoni", path: "/testimoni" },
    { name: "FAQ", path: "/donasi" },
    { name: "Kontak", path: "/kontak" },
  ];
  const adminBase = baseLinks.filter((l) => !["Produk", "FAQ", "Kontak"].includes(l.name));
  const navLinks = isAdmin
    ? [...adminBase, { name: "Orderan", path: "/orders" }, { name: "Kelola Produk", path: "/admin" }]
    : baseLinks;

  const handleNavClick = (p) => {
    if (isAdmin && p === "/produk") return;
    navigate(p);
    setIsOpen(false);
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "rgba(17,23,34,0.60)" : "rgba(255,255,255,0.92)",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        transition: "background-color 0.5s ease, color 0.5s ease",
        borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
      }
    : {};

  const isActive = (p) => location.pathname === p || (p !== "/" && location.pathname.startsWith(p));
  const doLogout = async () => { await logoutAdmin(); };
  const isHome = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-sm font-[Poppins] ${theme === "dark" ? "text-white" : "text-gray-800"} transition-colors duration-500 ease-in-out`}
      style={backgroundStyle}
    >
      <div className="site-container py-3 relative">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("/")}
          >
            <motion.img src="/assets/images/jamu.png" alt="Logo" className="h-8 w-auto" />
            {/* Sembunyikan teks brand di mobile: tampil mulai md */}
            <span className="hidden md:inline text-lg font-semibold tracking-wide text-[#16a34a]">
              {isAdmin && isHome ? "Selamat Datang, Admin!" : "Jamu Sugih Waras"}
            </span>
          </motion.div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                className={`text-sm font-medium relative pb-1 ${
                  isActive(link.path)
                    ? "text-green-600 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-green-600 after:left-0 after:bottom-0"
                    : "hover:text-green-600"
                } ${isAdmin && link.path === "/produk" ? "pointer-events-none opacity-40" : ""}`}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {!isAdmin && (
              <motion.button
                onClick={() => setOpen(true)}
                className={`relative p-2 rounded-full shadow-sm transition-colors duration-500 ${
                  theme === "light" ? "bg-white text-gray-700 hover:bg-gray-100" : "bg-[#0f1624] text-gray-100 hover:bg-[#1b2333]"
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
            )}

            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "light" ? "bg-white text-gray-700 hover:bg-gray-100" : "bg-[#0f1624] text-yellow-400 hover:bg-[#1b2333]"
              }`}
              whileHover={{ rotate: 20, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </motion.button>

            {!isAdmin ? (
              <motion.button
                onClick={() => handleNavClick("/admin/login")}
                className="px-3 py-1.5 rounded-full text-sm bg-green-600 text-white hover:bg-green-700"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Admin
              </motion.button>
            ) : (
              <motion.button
                onClick={doLogout}
                className="px-3 py-1.5 rounded-full text-sm bg-red-600 text-white hover:bg-red-700"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Logout
              </motion.button>
            )}

            {/* Hamburger (mobile only) */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="space-y-1">
                <span className={`block h-0.5 w-5 bg-current transform transition ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transition ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transform transition ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-3 py-3 space-y-2 rounded-lg shadow-md bg-white/95 dark:bg-[#0f1624]/80 backdrop-blur-md"
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
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : "hover:bg-gray-100 dark:hover:bg-white/10"
                  } ${isAdmin && link.path === "/produk" ? "pointer-events-none opacity-40" : ""}`}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}

              {!isAdmin ? (
                <button
                  onClick={() => { handleNavClick("/admin/login"); setIsOpen(false); }}
                  className="w-full rounded-full px-3 py-2 bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Admin
                </button>
              ) : (
                <button
                  onClick={doLogout}
                  className="w-full rounded-full px-3 py-2 bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Logout
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
