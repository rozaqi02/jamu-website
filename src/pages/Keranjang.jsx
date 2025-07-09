// src/pages/Keranjang.jsx
import { motion } from 'framer-motion';

function Keranjang() {
  return (
    <motion.section
      className="py-16 px-4 max-w-4xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-green-700 mb-8">Keranjang</h2>
      <p className="text-lg text-gray-700 mb-4">Keranjang Anda masih kosong.</p>
      <p className="text-gray-600">Tambahkan produk dari halaman Produk dengan menekan tombol "Lihat Detail" dan pilih varian yang diinginkan.</p>
    </motion.section>
  );
}

export default Keranjang;