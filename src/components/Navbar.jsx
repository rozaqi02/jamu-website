import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaShoppingCart, FaTimes, FaChevronRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef(null);
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

  // Lock scroll + ESC
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

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
            {/* Brand desktop */}
            <div className="hidden md:flex flex-col leading-tight">
              <motion.span className="brand-mark text-xl md:text-2xl" layout>
                Jamu <span className="brand-swash">Sugih</span> Waras
              </motion.span>
              {isAdmin && (
                <span className="text-[11px] md:text-xs font-medium opacity-75 mt-0.5">
                  Selamat Datang, Admin!
                </span>
              )}
            </div>
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
                aria-label="Buka keranjang"
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
              aria-label="Ganti tema"
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </motion.button>

            {/* Hide Admin/Logout on mobile */}
            {!isAdmin ? (
              <motion.button
                onClick={() => handleNavClick("/admin/login")}
                className="hidden md:inline-flex px-3 py-1.5 rounded-full text-sm bg-green-600 text-white hover:bg-green-700"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Admin
              </motion.button>
            ) : (
              <motion.button
                onClick={async () => { await doLogout(); }}
                className="hidden md:inline-flex px-3 py-1.5 rounded-full text-sm bg-red-600 text-white hover:bg-red-700"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Logout
              </motion.button>
            )}

            {/* Hamburger */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className={`md:hidden p-2 rounded-none focus:outline-none bg-transparent hover:bg-transparent shadow-none ${theme === "light" ? "text-black" : "text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Buka menu"
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-6 bg-current" />
                <span className="block h-0.5 w-6 bg-current" />
                <span className="block h-0.5 w-6 bg-current" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ===== Mobile Drawer Sidebar ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/50 backdrop-blur-md backdrop-saturate-150 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className={`drawer-neutral fixed top-0 right-0 h-[100dvh] w-[88%] sm:w-[380px] md:hidden bg-white dark:bg-[#0f1624] shadow-xl flex flex-col ${theme === "light" ? "text-black" : "text-white"}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
            >
              {/* Header drawer */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <img src="/assets/images/jamu.png" alt="Logo" className="h-8 w-auto" />
                  <div className="flex flex-col leading-tight">
                    <span className="brand-mark text-lg">
                      Jamu <span className="brand-swash">Sugih</span> Waras
                    </span>
                    {isAdmin && (
                      <span className="text-[11px] opacity-75 mt-0.5">Selamat Datang, Admin!</span>
                    )}
                  </div>
                </div>
                <button
                  ref={closeBtnRef}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30"
                  aria-label="Tutup menu"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Konten drawer */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-1.5">
                {navLinks.map((link) => {
                  const disabled = isAdmin && link.path === "/produk";
                  const active = isActive(link.path);
                  return (
                    <button
                      key={link.name}
                      onClick={() => !disabled && handleNavClick(link.path)}
                      className={[
                        "w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-base transition text-left bg-transparent",
                        disabled
                          ? "opacity-40 cursor-not-allowed"
                          : active
                          ? "font-semibold underline underline-offset-4 decoration-2 text-black dark:text-white"
                          : "text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      <span>{link.name}</span>
                      <FaChevronRight className={`ml-2 ${active ? "opacity-80" : "opacity-40"} ${theme === "light" ? "text-black" : "text-white"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Footer drawer */}
              <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 border-t border-black/10 dark:border-white/10 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={toggleTheme}
                    className="flex-1 px-3 py-2 rounded-lg bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90 transition"
                  >
                    {theme === "light" ? "Mode Gelap" : "Mode Terang"}
                  </button>

                  {!isAdmin ? (
                    <button
                      onClick={() => handleNavClick("/admin/login")}
                      className="flex-1 px-3 py-2 rounded-lg bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90 transition"
                    >
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={async () => { await doLogout(); setIsOpen(false); }}
                      className="flex-1 px-3 py-2 rounded-lg bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90 transition"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
