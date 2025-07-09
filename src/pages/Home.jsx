import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home({ theme, toggleTheme, cartItems, addToCart }) {
  const educations = [
    {
      title: 'Manfaat Jamur untuk Kesehatan',
      content: 'Jamur kaya akan vitamin D, antioksidan, dan serat yang baik untuk sistem kekebalan tubuh.',
    },
    {
      title: 'Proses Pembuatan Jakora',
      content: 'Jakora dibuat dengan proses fermentasi alami menggunakan jamur pilihan untuk rasa autentik.',
    },
    {
      title: 'Sustainability Jakora',
      content: 'Produk Jakora mendukung ekonomi hijau dengan memanfaatkan limbah pertanian sebagai media jamur.',
    },
    {
      title: 'Nutrisi Jamur',
      content: 'Jamur mengandung protein tinggi dan rendah lemak, cocok untuk diet sehat.',
    },
    {
      title: 'Pengolahan Jamur',
      content: 'Pelajari cara mengolah jamur agar tetap bergizi dan lezat.',
    },
    {
      title: 'Dampak Lingkungan',
      content: 'Konsumsi jamur membantu mengurangi jejak karbon dibanding daging.',
    },
  ];

  return (
    <div className="min-h-screen font-poppins text-[var(--text-color)] bg-white overflow-hidden relative">
      <Navbar theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} />
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: 'spring' }}
      >
        <HeroSection />
      </motion.section>
      <motion.div
        className="container mx-auto px-6 py-12 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-[#a3e4b7] mb-8">Edukasi Menarik tentang Jakora</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              <h3 className="text-xl font-semibold text-[#a3e4b7] mb-2">{edu.title}</h3>
              <p className="text-white">{edu.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Home;