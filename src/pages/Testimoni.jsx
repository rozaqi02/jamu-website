import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Chikal', text: 'Jakora bikin hariku lebih enak! 🥳', img: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Abimanyu', text: 'Rasanya otentik dan enak banget! 💸', img: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Tesya', text: 'Packaging keren, rasa mantap! 🚀', img: 'https://i.pravatar.cc/40?img=3' },
  { name: 'King Ansa', text: 'Beli terus, gak bosan! ✨', img: 'https://i.pravatar.cc/40?img=4' },
];

function Testimoni() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-[var(--yumsert-green)] mb-8">
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-cream-100 dark:bg-green-900 shadow-lg p-6 rounded-lg transition-shadow duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
          >
            <div className="flex items-center gap-4">
              <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full" />
              <p className="font-semibold text-[var(--yumsert-green)] dark:text-cream-100">{t.name}</p>
            </div>
            <p className="mt-4 text-gray-700 dark:text-cream-200 italic">"{t.text}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimoni;