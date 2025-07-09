import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 shadow-md p-2 rounded-full hover:scale-110 transition-transform"
      whileTap={{ scale: 0.9 }}
    >
      🌐
    </motion.button>
  );
};

export default LanguageSwitcher;
