import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Produk from './pages/Produk';
import Testimoni from './pages/Testimoni';
import FAQ from './pages/FAQ';
import Kontak from './pages/Kontak';

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add('light');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/produk" element={<Produk theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/testimoni" element={<Testimoni theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/faq" element={<FAQ theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/kontak" element={<Kontak theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  );
}

export default App;