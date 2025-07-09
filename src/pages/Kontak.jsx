import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function Kontak() {
  const { language } = useLanguage();

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-blue-700 mb-6">
        {language === 'id' ? 'Hubungi Kami 📱' : 'Contact Us 📱'}
      </h2>
      <p className="text-lg mb-8 text-gray-700 dark:text-gray-200">
        {language === 'id'
          ? 'Ada pertanyaan atau pesanan? Hubungi kami sekarang juga!'
          : 'Have a question or want to place an order? Reach out to us now!'}
      </p>
      <div className="flex justify-center space-x-4">
        <motion.a
          href="mailto:jakorafood@gmail.com"
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700"
          whileHover={{ scale: 1.1 }}
        >
          Email
        </motion.a>
        <motion.a
          href="https://wa.me/6282245964007"
          className="bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600"
          whileHover={{ scale: 1.1 }}
        >
          WhatsApp
        </motion.a>
      </div>
    </section>
  );
}

export default Kontak;