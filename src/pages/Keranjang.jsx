import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Keranjang({ cartItems, theme, toggleTheme, addToCart }) {
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
          <h2 className={`text-4xl font-bold text-center ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'} mb-8`}>Keranjang</h2>
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-600'} mb-4`}>
                Keranjang Anda masih kosong.
                <br />
                Tambahkan produk dari halaman Produk dengan menekan tombol "Lihat Detail" dan pilih varian yang diinginkan.
              </p>
              <motion.a
                href="/produk"
                className="inline-flex items-center gap-2 bg-[#4a704a] dark:bg-[#a3e4b7] text-white font-bold py-3 px-6 rounded-full hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Produk
              </motion.a>
            </div>
          ) : (
            <div>
              {/* Logika keranjang dengan item di sini */}
              <p>Item keranjang akan ditampilkan di sini.</p>
            </div>
          )}
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}

export default Keranjang;