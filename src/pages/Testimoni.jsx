import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
  { name: 'Chikal', text: 'Jakora bikin hariku lebih enak! 🥳', img: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Abimanyu', text: 'Rasanya otentik dan enak banget! 💸', img: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Tesya', text: 'Packaging keren, rasa mantap! 🚀', img: 'https://i.pravatar.cc/40?img=3' },
  { name: 'King Ansa', text: 'Beli terus, gak bosan! ✨', img: 'https://i.pravatar.cc/40?img=4' },
];

function Testimoni() {
  const { language } = useLanguage();
  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
        {language === 'id' ? 'Testimoni Pelanggan 💬' : 'Customer Testimonials 💬'}
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full" />
              <p className="font-semibold text-blue-600 dark:text-white">{t.name}</p>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300 italic">"{t.text}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimoni;