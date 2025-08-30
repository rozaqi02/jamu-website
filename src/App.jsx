// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Context
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import FloatingCart from "./components/FloatingCart";

// Pages
import Home from "./pages/Beranda";
import Produk from "./pages/Produk";
import Testimoni from "./pages/Testimoni";
import Kontak from "./pages/Kontak";
import Donasi from "./pages/FAQ";
import Checkout from "./pages/Checkout";
import Purchase from "./pages/Purchase";
import AdminLogin from "./pages/AdminLogin";
import KelolaProduk from "./pages/KelolaProduk"; // renamed
import Orders from "./pages/Orders";

// Components
import Navbar from "./components/Navbar";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Progress + scroll top tiap pindah route
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    NProgress.start();
    window.scrollTo(0, 0);
    const timer = setTimeout(() => NProgress.done(), 500);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
}

// Wrapper animasi transisi halaman
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** BlockAdmin: larang admin mengakses halaman pembelian/produk */
function BlockAdmin({ children }) {
  const { isAdmin, loadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuth && isAdmin) {
      navigate("/", { replace: true });
    }
  }, [isAdmin, loadingAuth, navigate]);

  if (loadingAuth) return <div className="pt-24 text-center">Memeriksa akses…</div>;
  if (isAdmin) return null;
  return children;
}

function AnimatedRoutes({ theme, toggleTheme }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home theme={theme} />
            </PageTransition>
          }
        />

        {/* Produk diblok untuk admin */}
        <Route
          path="/produk"
          element={
            <BlockAdmin>
              <PageTransition>
                <Produk theme={theme} toggleTheme={toggleTheme} />
              </PageTransition>
            </BlockAdmin>
          }
        />

        <Route
          path="/testimoni"
          element={
            <PageTransition>
              <Testimoni theme={theme} toggleTheme={toggleTheme} />
            </PageTransition>
          }
        />
        <Route
          path="/kontak"
          element={
            <PageTransition>
              <Kontak theme={theme} />
            </PageTransition>
          }
        />
        <Route
          path="/donasi"
          element={
            <PageTransition>
              <Donasi theme={theme} />
            </PageTransition>
          }
        />

        {/* Checkout diblok admin */}
        <Route
          path="/checkout"
          element={
            <BlockAdmin>
              <PageTransition>
                <Checkout />
              </PageTransition>
            </BlockAdmin>
          }
        />

        {/* Halaman pembayaran diblok admin */}
        <Route
          path="/pay"
          element={
            <BlockAdmin>
              <PageTransition>
                <Purchase />
              </PageTransition>
            </BlockAdmin>
          }
        />
        <Route
          path="/purchase/:orderNumber"
          element={
            <BlockAdmin>
              <PageTransition>
                <Purchase />
              </PageTransition>
            </BlockAdmin>
          }
        />

        {/* Login admin */}
        <Route
          path="/admin/login"
          element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          }
        />

        {/* Kelola Produk (admin only) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <PageTransition>
                <KelolaProduk />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        {/* Orderan admin */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute requireAdmin>
              <PageTransition>
                <Orders />
              </PageTransition>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

// Chrome/layout
function AppChrome({ theme, toggleTheme }) {
  const location = useLocation();
  const path = location.pathname;

  // Footer dibuang hanya di halaman-halaman ini (bukan di /admin)
  const cleanRoutes = ["/checkout", "/pay", "/admin/login"];
  const isClean = cleanRoutes.some((p) => path === p || path.startsWith("/admin/login"));

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen font-poppins text-[var(--text-color)] bg-[var(--bg-color)] transition-colors duration-500">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <AnimatedRoutes theme={theme} toggleTheme={toggleTheme} />
        {!isClean && <Footer theme={theme} />}
        {!isClean && <FloatingCart />}
        {!isClean && <ChatBot theme={theme} />}
      </div>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const style = document.createElement("style");
    style.innerHTML = `
      #nprogress { pointer-events: none; }
      #nprogress .bar {
        background: var(--yumsert-green) !important;
        height: 3px;
        position: fixed; top: 0; left: 0; width: 100%;
        z-index: 1031; transition: opacity 0.4s ease;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px var(--yumsert-green), 0 0 5px var(--yumsert-green);
      }
      #nprogress .spinner, #nprogress .spinner-icon { display: none !important; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router>
      <CartProvider>  
        <AuthProvider>
          <AppChrome theme={theme} toggleTheme={toggleTheme} />
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
