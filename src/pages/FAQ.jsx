import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Tambahkan AnimatePresence
import { FaSearch } from 'react-icons/fa';

function Faq({ theme }) {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { question: 'Apa itu Jakora?', answer: 'Jakora adalah rendang jamur inovatif yang mendukung ekonomi hijau dan keberlanjutan ekologi.' },
    { question: 'Bagaimana cara memesan?', answer: 'Anda bisa memesan via WhatsApp di +6281391546240.' },
    { question: 'Apa bahan utama Jatastik?', answer: 'Jatastik terbuat dari jamur pilihan yang kaya nutrisi.' },
    { question: 'Apakah produk Jakora halal?', answer: 'Ya, semua produk Jakora telah tersertifikasi halal.' },
    { question: 'Berapa lama pengiriman?', answer: 'Pengiriman biasanya memakan 2-5 hari tergantung lokasi.' },
    { question: 'Apakah ada diskon?', answer: 'Ya, cek promo terbaru di Instagram atau WhatsApp kami.' },
    { question: 'Bagaimana cara penyimpanan?', answer: 'Simpan di tempat kering dan sejuk, hindari paparan sinar matahari langsung.' },
    { question: 'Apakah produk bebas pengawet?', answer: 'Ya, kami menggunakan bahan alami tanpa pengawet buatan.' },
    { question: 'Bisa pesan dalam jumlah besar?', answer: 'Ya, hubungi kami via WhatsApp untuk pemesanan grosir.' },
    { question: 'Apa keunggulan Jakora?', answer: 'Jakora ramah lingkungan dan kaya akan nutrisi dari jamur segar.' },
    { question: 'Bagaimana cara pembayaran?', answer: 'Kami menerima transfer bank dan pembayaran via e-wallet.' },
    { question: 'Ada garansi produk?', answer: 'Ya, kami menjamin kualitas, hubungi kami jika ada masalah.' },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1a1f2b] text-white' : 'bg-gray-100 text-gray-800'} py-16 relative pt-16`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-5xl font-extrabold text-center mb-12 mt-32 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
          Pertanyaan Umum
        </h1>
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a704a] text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-[#2a344a] p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;