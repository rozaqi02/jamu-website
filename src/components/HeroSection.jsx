// src/components/HeroSection.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function HeroSection() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const titleRef = useRef(null);

  const titles = [
    'Jajanan Jamur Kekinian 🍄',
    'Jakora, Jamur Rasa Rendang! 🍛',
    'Jatastik, Renyah Nabati Tanpa Ragu! 💥',
    '100% Vegan & Natural ✨',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayedTitle('');
    let charIndex = 0;
    const currentText = titles[currentTitle];
    const typingInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        setDisplayedTitle((prev) => prev + currentText[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentTitle]);

  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/assets/images/hero-bg.jpg')" }}
    >
      <div className="text-center">
        <motion.h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-[var(--yumsert-blue)] drop-shadow-lg px-4 typing-effect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedTitle}
        </motion.h1>
        <p className="mt-4 text-lg md:text-2xl text-[var(--yumsert-orange)]">
          Nikmati camilan sehat dari jamur premium ✨
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
