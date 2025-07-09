// src/pages/FAQ.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  { q: 'Apa itu Jakora?', a: 'Jakora adalah produk vegan berbasis jamur.' },
  { q: 'Bagaimana cara memesan?', a: 'Pesan melalui WhatsApp kami.' },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-[var(--yumsert-green)] mb-12">
      </h2>
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="bg-cream-100 dark:bg-green-900 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex justify-between items-center text-left p-6 hover:bg-cream-200 dark:hover:bg-green-800 focus:outline-none"
            >
              <h3 className="font-semibold text-[var(--yumsert-green)] dark:text-cream-100 text-lg">{item.q}</h3>
              <span className="text-[var(--yumsert-green)]">
                {openIndex === idx ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <p className="p-6 pt-0 text-gray-700 dark:text-cream-200">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;