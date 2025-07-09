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
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>
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
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
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
          <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} addToCart={addToCart} />} />
          <Route path="/produk" element={<Produk theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} addToCart={addToCart} />} />
          <Route path="/testimoni" element={<Testimoni theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} addToCart={addToCart} />} />
          <Route path="/faq" element={<FAQ theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} addToCart={addToCart} />} />
          <Route path="/kontak" element={<Kontak theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} addToCart={addToCart} />} />
          <Route path="/keranjang" element={<Keranjang cartItems={cartItems} theme={theme} toggleTheme={toggleTheme} addToCart={addToCart} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;