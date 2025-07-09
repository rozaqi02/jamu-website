import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Produk from './pages/Produk';
import Testimoni from './pages/Testimoni';
import FAQ from './pages/FAQ';
import Kontak from './pages/Kontak';
import Keranjang from './pages/Keranjang';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { motion } from 'framer-motion';

// Komponen Layout Baru
function AppLayout({ theme, toggleTheme, cartItems, addToCart }) {
  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [cartItems, setCartItems] = useState([]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Simpan tema ke localStorage
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    // Terapkan tema awal dari localStorage atau default ke 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, variant: product.variants[0] }];
    });
    alert(`${product.name} ditambahkan ke keranjang!`);
  };

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} addToCart={addToCart} />}>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/keranjang" element={<Keranjang cartItems={cartItems} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;