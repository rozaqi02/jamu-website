import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Kontak({ theme, toggleTheme, cartItems, addToCart }) {
  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} />
      <main className="pt-16">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center text-[#4a704a] dark:text-[#a3e4b7] mb-12">Hubungi Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-white dark:bg-[#2a344a] p-8 rounded-xl shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Informasi Kontak</h3>
              <p className="text-gray-600 dark:text-white mb-2">WhatsApp: +62 813-9154-6240</p>
              <p className="text-gray-600 dark:text-white mb-2">Email: info@jakora.id</p>
              <p className="text-gray-600 dark:text-white mb-2">Instagram: @jakora.id</p>
              <motion.a
                href="https://wa.me/6281391546240"
                className="inline-flex items-center gap-2 bg-[#4a704a] dark:bg-[#a3e4b7] text-white font-bold py-3 px-6 rounded-full mt-6 hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chat Sekarang
              </motion.a>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-[#2a344a] p-8 rounded-xl shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Kirim Pesan</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama"
                  className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border-none focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border-none focus:outline-none"
                />
                <textarea
                  placeholder="Pesan"
                  className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border-none focus:outline-none h-32"
                />
                <motion.button
                  type="submit"
                  className="w-full bg-[#4a704a] dark:bg-[#a3e4b7] text-white font-bold py-3 rounded-lg hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Kirim
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}

export default Kontak;