import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Produk from './pages/Produk';
import Testimoni from './pages/Testimoni';
import FAQ from './pages/FAQ';
import Kontak from './pages/Kontak';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light'); // Tetap default 'light' tanpa deteksi otomatis

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/produk" element={<Produk theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/testimoni" element={<Testimoni theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/faq" element={<FAQ theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/kontak" element={<Kontak theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
        <ChatBot />
        <Footer />
      </div>
    </Router>
  );
}
      <Router basename="/subfolder">
        <Routes>
          <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/produk" element={<Produk theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
      </Router>

export default App;