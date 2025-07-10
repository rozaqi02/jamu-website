import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

function FAQ({ theme, toggleTheme }) {
  const faqs = [
    { question: 'Apa itu Jakora?', answer: 'Jakora adalah produk rendang jamur vegan inovatif yang mendukung gaya hidup sehat dan berkelanjutan.' },
    { question: 'Bagaimana cara memesan produk?', answer: 'Pesanan dapat dilakukan melalui WhatsApp (+62 813-9154-6240) dengan menyebutkan detail produk yang diinginkan.' },
    { question: 'Apakah produk Jakora bersertifikat halal?', answer: 'Ya, semua produk Jakora telah bersertifikat halal dan aman untuk dikonsumsi.' },
    { question: 'Berapa lama waktu pengiriman?', answer: 'Pengiriman memakan waktu 2-5 hari tergantung lokasi, menggunakan jasa ekspedisi terpercaya.' },
    { question: 'Adakah promo atau diskon tersedia?', answer: 'Informasi promo terbaru dapat dilihat di akun Instagram resmi kami.' },
    { question: 'Bagaimana cara menyimpan produk dengan baik?', answer: 'Simpan produk di tempat sejuk dan kering, jauhkan dari paparan sinar matahari langsung.' },
    { question: 'Bisa pesan produk secara khusus?', answer: 'Ya, hubungi kami melalui WhatsApp untuk pemesanan khusus sesuai kebutuhan.' },
    { question: 'Apa manfaat kesehatan dari konsumsi jamur?', answer: 'Jamur kaya akan vitamin D, antioksidan, dan serat yang mendukung sistem kekebalan tubuh.' },
  ];

  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-16">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 max-w-7xl mx-auto"
        >
          <h2 className={`text-4xl font-bold text-center ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'} mb-12 animate-fadeIn`}>Pertanyaan yang Sering Diajukan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, rotate: 1 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => document.getElementById(`faq-${index}`).classList.toggle('hidden')}
              >
                <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-2 flex items-center justify-between">
                  {faq.question}
                  <span className="text-2xl">▼</span>
                </h3>
                <p id={`faq-${index}`} className="text-gray-600 dark:text-white mt-2 hidden">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default FAQ;