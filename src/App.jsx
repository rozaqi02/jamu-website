import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Beranda';
import Produk from './pages/Produk';
import Testimoni from './pages/Testimoni';
import Kontak from './pages/Kontak';
import Donasi from './pages/Donasi';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/produk" element={<Produk theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/testimoni" element={<Testimoni theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/kontak" element={<Kontak theme={theme} />} />
          <Route path="/donasi" element={<Donasi theme={theme} />} />
        </Routes>
        <ChatBot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;