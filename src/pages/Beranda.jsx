import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

function Beranda({ theme, toggleTheme }) {
  const [typingText, setTypingText] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const texts = useMemo(() => ['DAPATKAN', 'RASAKAN'], []);
  const images = [
    '/assets/images/Teh rempah.jpg',
    '/assets/images/Beras kencur premium.jpg',
    '/assets/images/Wedang secang.jpg',
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
    }, 5000);
    return () => clearInterval(imageInterval);
  }, [images.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const sectionVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const backgroundStyle = isMounted
    ? { backgroundColor: theme === 'dark' ? '#1a1f2b' : 'white', transition: 'background-color 0.3s ease' }
    : {};

  return (
    <div
      className={`min-h-screen font-[Poppins] ${theme === 'dark' ? 'text-white' : 'text-gray-800'} overflow-hidden relative`}
      style={backgroundStyle}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-[#22624a]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 200}px`,
            left: `${mousePosition.x - 200}px`,
            opacity: 0.6,
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-[#a3e4b7]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            right: `${window.innerWidth - mousePosition.x - 150}px`,
            opacity: 0.5,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.section
        id="home"
        className="h-screen flex items-center justify-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.div
          className="container mx-auto px-6 text-center"
          style={{ scale, rotate }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className={`text-xl font-semibold uppercase ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}
            variants={itemVariants}
          >
            {typingText}
          </motion.h2>
          <motion.h1
            className={`text-5xl md:text-7xl font-[Montserrat] font-bold mb-6 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}
            variants={itemVariants}
          >
            Jamu Sugih Waras
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            variants={itemVariants}
          >
            Rasakan manfaat rempah tradisional dalam kemasan modern untuk kesehatan dan kesejahteraan Anda.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={itemVariants}>
            <Link
              to="/produk"
              className="inline-flex items-center gap-2 bg-[#22624a] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#754a28] transition-all duration-300"
            >
              Jelajahi Produk <FaArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
  className="py-16 px-6 max-w-6xl mx-auto relative z-10"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={sectionVariants}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    {/* Gambar */}
    <motion.div
      className="overflow-hidden rounded-lg shadow-lg"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src="/assets/images/ibujualjamu.png"
        alt="Rumah Rempah Sugih Waras"
        className="w-full h-[300px] object-cover rounded-lg"
      />
    </motion.div>

    {/* Teks */}
    <motion.div variants={itemVariants}>
      <h2
        className={`text-4xl font-[Montserrat] font-bold mb-6 ${
          theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'
        }`}
      >
        Tentang Kami
      </h2>
      <p
        className={`text-lg leading-relaxed text-justify ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        Rumah Rempah Sugih Waras adalah UMKM yang berlokasi di Desa Kalisongo, Malang.
        Kami berkomitmen menghadirkan jamu tradisional berkualitas tinggi dengan sentuhan inovasi modern.
        Dengan memanfaatkan rempah pilihan dari petani lokal dan teknologi pengolahan terkini,
        Sugih Waras menjaga cita rasa autentik sekaligus meningkatkan khasiat jamu untuk generasi masa kini.
      </p>
    </motion.div>
  </div>
</motion.section>



      <motion.section
  className="py-16 px-6 max-w-6xl mx-auto relative z-10"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={sectionVariants}
>
  <motion.div
    className={`w-full rounded-lg py-4 mb-12 ${
      theme === 'dark' ? 'bg-[#1f2a37]' : 'bg-[#f1f5f4]'
    }`}
    variants={itemVariants}
  >
    <h2
      className={`text-4xl font-[Montserrat] font-bold text-center ${
        theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'
      }`}
    >
      Mengapa Pilih Kami?
    </h2>
  </motion.div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {['Sehat Alami', 'Berkelanjutan', 'Rasa Autentik'].map((item, index) => (
      <motion.div
        key={index}
        className="p-6 bg-white dark:bg-[#2a344a] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        variants={itemVariants}
        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'
          }`}
        >
          {item}
        </h3>
        <p
          className={`text-gray-600 dark:text-gray-300 ${
            theme === 'dark' ? 'text-opacity-80' : ''
          }`}
        >
          {item === 'Sehat Alami' && 'Jamu kami dari rempah organik untuk imunitas dan kesehatan.'}
          {item === 'Berkelanjutan' && 'Mendukung petani lokal dan lingkungan hijau.'}
          {item === 'Rasa Autentik' && 'Cita rasa tradisional dalam setiap kemasan.'}
        </p>
      </motion.div>
    ))}
  </div>
</motion.section>


<motion.section
  className="py-16 px-6 max-w-6xl mx-auto relative z-10"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={sectionVariants}
>
  {/* Judul */}
  <motion.div
    className={`rounded-xl py-4 px-6 mb-12 text-center ${
      theme === 'dark' ? 'bg-[#1f2a37]' : 'bg-gray-100'
    }`}
    variants={itemVariants}
  >
    <h2
      className={`text-4xl font-[Montserrat] font-bold ${
        theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'
      }`}
    >
      Informasi Menarik
    </h2>
  </motion.div>

  <div className="relative">
    {/* Garis Vertikal */}
    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2" />

    <div className="space-y-12">
      {[
        {
          title: 'Khasiat Rempah Lokal untuk Kesehatan',
          img: '/assets/images/rempah.jpg',
          desc: 'Rempah-rempah seperti jahe, kunyit, temulawak, serai, dan kayu manis yang digunakan Rumah Rempah Sugih Waras kaya akan antioksidan, antiinflamasi, dan vitamin. Khasiatnya mencakup peningkatan daya tahan tubuh, memperlancar peredaran darah, mengurangi peradangan, serta membantu pencernaan. Semua bahan diambil langsung dari petani lokal, memastikan kesegaran dan kualitasnya tetap terjaga.'
        },
        {
          title: 'Tren Konsumsi Herbal di Era Modern',
          img: '/assets/images/tren.jpg',
          desc: 'Di tengah meningkatnya kesadaran hidup sehat, produk herbal kembali menjadi pilihan banyak orang, terutama generasi muda. Jamu Sugih Waras dikemas modern, praktis, dan higienis, sehingga cocok dinikmati di rumah maupun dibawa bepergian. Tren “back to nature” membuat minuman herbal menjadi bagian gaya hidup sehat masa kini, tidak hanya sekadar warisan tradisi.'
        },
        {
          title: 'Kontribusi Jamu pada Ekonomi Lokal',
          img: '/assets/images/kontribusi.jpg',
          desc: 'Rumah Rempah Sugih Waras tidak hanya berfokus pada produksi jamu, tetapi juga pemberdayaan masyarakat Desa Kalisongo. Dengan peningkatan kapasitas produksi melalui inovasi teknologi, UMKM ini mampu menciptakan lapangan kerja baru, meningkatkan pendapatan keluarga, serta menghidupkan kembali potensi rempah lokal yang bernilai ekonomi tinggi.'
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className={`relative flex items-center w-full ${
            index % 2 === 0 ? 'justify-start' : 'justify-end'
          }`}
          variants={itemVariants}
        >
          {/* Nomor */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#22624a] text-white font-bold w-10 h-10 rounded-full flex items-center justify-center z-10">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Card */}
          <div
            className={`group relative w-5/12 bg-white dark:bg-[#2a344a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
              index % 2 === 0 ? 'mr-auto pr-6' : 'ml-auto pl-6'
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <h3
                className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'
                }`}
              >
                {item.title}
              </h3>
            </div>

            {/* Default (sebelum hover) */}
            <div className="p-4 text-sm text-gray-500 dark:text-gray-300 group-hover:hidden">
              Hover untuk detail!
            </div>

            {/* Detail (saat hover) */}
            <div className="hidden group-hover:block p-4 transition-all duration-500">
              <p className="text-sm text-justify text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>




      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold text-center mb-12 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}
          variants={itemVariants}
        >
          Produk Terbaik Kami
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {images.map((img, index) => {
    const titles = ['Teh rempah', 'Beras kencur premium', 'Wedang secang'];
    const prices = [30000, 10000, 20000]; // harga sesuai urutan

    return (
      <motion.div
        key={index}
        className="relative overflow-hidden rounded-lg shadow-lg"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={img}
          alt={`Produk ${titles[index]}`}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <motion.div
          className="absolute bottom-4 left-4 text-white"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <h4 className="text-lg font-semibold">{titles[index]}</h4>
          <p className="text-sm">Rp {prices[index].toLocaleString('id-ID')}</p>
        </motion.div>
      </motion.div>
    );
  })}
</div>

      </motion.section>

      <motion.section
        className="py-20 px-6 text-center relative z-10"
        style={{ backgroundColor: theme === 'dark' ? '#2a344a' : '#f5f5f5' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold mb-6 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#22624a]'}`}
          variants={itemVariants}
        >
          Mulai Hidup Sehat Sekarang
        </motion.h2>
        <motion.p
          className={`text-lg mb-8 max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          variants={itemVariants}
        >
          Pesan jamu herbal kami dan rasakan manfaatnya untuk kesehatan Anda.
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={itemVariants}>
          <a
            href="https://wa.me/6285745135415"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22624a] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#754a28] transition-all duration-300"
          >
            Pesan Sekarang <FaArrowRight />
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Beranda;