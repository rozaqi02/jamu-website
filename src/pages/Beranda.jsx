import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';

function Beranda({ theme }) {
  const [typingText, setTypingText] = useState('DAPATKAN');
  const [currentImage, setCurrentImage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const texts = useMemo(() => ['DAPATKAN', 'NIKMATI'], []);
  const images = [
    '/assets/images/jakora-premium1.png',
    '/assets/images/jakora-premium2.png',
    '/assets/images/jakora-premium3.png',
  ];
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

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      let i = 0;
      const timer = setInterval(() => {
        setTypingText(texts[index].slice(0, i + 1));
        i++;
        if (i > texts[index].length) clearInterval(timer);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(imageInterval);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>

      {/* HERO SECTION */}
      <section id="home" className="h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('/assets/images/hero-bg.jpg')` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        <motion.div
          className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0" variants={itemVariants}>
            <motion.h2 className={`text-lg font-semibold uppercase ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
              {typingText}
            </motion.h2>
            <motion.h1 className="text-4xl md:text-6xl mb-4 font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#4a704a] to-[#355e3b] dark:from-[#a3e4b7] dark:to-[#7fd8a1]">
              Rendang Analog Inovatif dan Sehat
            </motion.h1>
            <motion.p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
              Pangan inovatif dari jamur tangkos sawit berteknologi kemasan self heating yang praktis,
              sehat dan citarasa Minangkabau guna mendukung produk berbasis potensi lokal.
            </motion.p>
            <motion.a
              href="/produk"
              className="inline-flex items-center gap-2 bg-[#4a704a] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#355e3b] dark:bg-[#a3e4b7] dark:hover:bg-[#7fd8a1] transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yuk, Belanja Produk Kami <FaArrowRight />
            </motion.a>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Produk Jakora"
              className="w-full max-w-md rounded-xl drop-shadow-2xl object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* WHY JAKORA */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <h2 className={`text-5xl font-extrabold text-center ${theme === 'dark' ? 'text-[#8A9A5B]' : 'text-[#4a704a]'} mb-12 bg-[#4a704a]/10 p-6 rounded-xl`}>
          Mengapa Memilih Jakora?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Sehat Alami</h3>
            <p className="text-gray-600 dark:text-white">Produk jamur 100% alami untuk gaya hidup sehat.</p>
          </motion.div>
          <motion.div className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Berkelanjutan</h3>
            <p className="text-gray-600 dark:text-white">Mendukung Green Economy dan ekologi.</p>
          </motion.div>
          <motion.div className="bg-white dark:bg-[#2a344a] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-4">Rasa Autentik</h3>
            <p className="text-gray-600 dark:text-white">Cita rasa tradisional dalam setiap gigitan.</p>
          </motion.div>
        </div>

        {/* EDUKASI */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="py-20 px-4 bg-[#f5f5f5] dark:bg-[#2a344a] rounded-xl"
        >
          <h2 className={`text-5xl font-extrabold text-center ${theme === 'dark' ? 'text-[#8A9A5B]' : 'text-[#4a704a]'} mb-8`}>
            Informasi Menarik
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#4a704a]/20 top-0"></div>
          <div className="relative">

        {/* Garis Tengah */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#4a704a]/30"></div>
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className={`w-full md:w-1/2 mb-2 ${
                index % 2 === 0 ? 'ml-auto' : 'mr-auto'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-4 bg-white dark:bg-[#344e41] p-2 md:p-4 rounded-xl shadow-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={
                    index === 1
                      ? '/assets/images/kelapa.jpg'
                      : index === 2
                      ? '/assets/images/pasar.jpg'
                      : '/assets/images/diabetes.jpg'
                  }
                  alt="Info"
                  className="w-24 h-24 rounded-md object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#4a704a] dark:text-[#a3e4b7] mb-1">
                    {index === 1
                      ? 'Indonesia Produsen Sawit Terbesar Di Dunia'
                      : index === 2
                      ? 'Pertumbuhan Pasar Plant-Based Food'
                      : '21 Juta Kasus Diabetes Melitus'}
                  </h3>
                  <p className="text-gray-600 dark:text-white text-justify">
                    {hoveredIndex === index ? (
                      index === 1 ? (
                        'Indonesia adalah produsen minyak sawit terbesar di dunia. Sejak 2006, Indonesia mengungguli Malaysia sebagai produsen minyak sawit mentah (crude palm oil ) terbesar. Pada tahun 2023, produksi minyak sawit nasional mencapai sekitar 47 juta ton , menyumbang lebih dari 50% total produksi global (Sumber: Ditjenbun Kementan RI, 2023).'
                      ) : index === 2 ? (
                        'Pasar plant-based food di Asia Tenggara diperkirakan tumbuh hingga USD 3,4 miliar pada 2027 , dengan Indonesia sebagai salah satu pasar utama (Mordor Intelligence, 2023).'
                      ) : (
                        'Lebih dari 21 juta orang Indonesia hidup dengan diabetes pada tahun 2024 Kementerian Kesehatan (2024) mencatat bahwa terdapat 21,8 juta kasus Diabetes Melitus di Indonesia. Prevalensi ini menunjukkan tren kenaikan yang signifikan, dengan mayoritas kasus terjadi di usia 15 tahun ke atas. Dari jumlah tersebut, sekitar 50% penderita tidak menyadari bahwa mereka mengidap diabetes. Risiko komplikasi serius seperti penyakit jantung, gagal ginjal, dan amputasi juga meningkat secara drastis akibat keterlambatan diagnosis dan pengobatan.'
                      )
                    ) : (
                      'Hover untuk detail!'
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
          </div>
        </motion.section>
      </motion.section>

      {/* SECTION PEMESANAN LIMBAH TANGKOS SAWIT */}

      <section className="pt-4 pb-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">

  <img
    src="/assets/images/limbah.jpg"
    alt="Limbah Tangkos Sawit"
    className="w-[34rem] h-80 rounded-md object-cover"
  />
  <div className="md:w-1/2">
    <h2 className={`text-2xl font-extrabold mb-3 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
      Menerima Pemesanan Limbah Tangkos Sawit di Daerah Terdekat Anda
    </h2>
    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 text-justify">
      Memberdayakan Limbah, Menciptakan Nilai : Menyediakan Tangkos Sawit Berkualitas sebagai Substrat Budidaya Jamur dan Solusi Pengelolaan Limbah Pabrik Kelapa Sawit.
    </p>
    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 text-justify">
      Kami hadir sebagai mitra dalam mendorong ekonomi sirkular di sektor perkebunan sawit dengan memanfaatkan limbah tangkos sawit secara optimal. Sebagai rantai ketiga dari proses pengolahan TBS, kami menyediakan tangkos sawit berkualitas untuk berbagai kebutuhan industri hijau, termasuk budidaya jamur, pupuk organik, hingga energi terbarukan.
    </p>
    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 text-justify">
      <span className="font-semibold text-[#4a704a] dark:text-[#a3e4b7]">Layanan Kami Tersedia di:</span> Kabupaten Dharmasraya, Kabupaten Pasaman Barat, dan Kota Padang. Hubungi kami untuk informasi pemesanan di wilayah Anda!
    </p>
    <p className="font-semibold text-lg text-[#4a704a] dark:text-[#a3e4b7] mb-3">
      Harga: 1 Truk Rp. 400.000
    </p>
    <div className="flex justify-center md:justify-end">
      <a
        href="https://wa.me/6281391546240"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#4a704a] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#355e3b] dark:bg-[#a3e4b7] dark:hover:bg-[#7fd8a1] text-sm transition-all duration-300 transform hover:scale-105"
      >
        Pesan Sekarang via WhatsApp
      </a>
    </div>
  </div>
</section>

{/* FAQ */}
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1a1f2b] text-white' : 'bg-gray-100 text-gray-800'} py-16`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-5xl font-extrabold text-center mb-8 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
          Pertanyaan Umum
        </h1>

        <div className="space-y-4">
          {(showAllFaq ? faqs : faqs.slice(0, 3)).map((faq, index) => (
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

        {!showAllFaq && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowAllFaq(true)}
              className="px-4 py-2 text-sm bg-[#4a704a] text-white rounded-full shadow hover:bg-[#355e3b] dark:bg-[#a3e4b7] dark:hover:bg-[#7fd8a1] transition-all">

             Pertanyaan Lainnya... 
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default Beranda;