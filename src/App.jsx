import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Home from './pages/Beranda';
import Produk from './pages/Produk';
import Testimoni from './pages/Testimoni';
import Kontak from './pages/Kontak';
import Donasi from './pages/FAQ';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

// Scroll reset tiap pindah route + trigger progress bar
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    NProgress.start();
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // simulasi loading singkat

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
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
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
        <Route
          path="/produk"
          element={
            <PageTransition>
              <Produk theme={theme} toggleTheme={toggleTheme} />
            </PageTransition>
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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Styling untuk progress bar agar hijau daun
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #nprogress .bar {
        background: #4a704a !important;
        height: 3px;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px #4a704a, 0 0 5px #4a704a;
      }
      #nprogress .spinner-icon {
        border-top-color: #4a704a;
        border-left-color: #4a704a;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div
        className={`min-h-screen font-poppins text-[var(--text-color)] ${
          theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'
        }`}
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <AnimatedRoutes theme={theme} toggleTheme={toggleTheme} />
        <Footer />
        <ChatBot theme={theme} />
      </div>
    </Router>
  );
}

export default App;
