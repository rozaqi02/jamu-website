import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import '../styles/animations.css';

function Home({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen font-poppins text-[var(--text-color)] bg-[var(--bg-color)] overflow-hidden">
      {/* Navbar with animation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} setActiveSection={setActiveSection} />
      </motion.div>

      {/* Hero / Landing Section with entrance animation */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: 'spring' }}
        className="pt-20"
      >
        <HeroSection />
      </motion.section>

      {/* Footer only rendered once */}
      <Footer />
    </div>
  );
}

export default Home;