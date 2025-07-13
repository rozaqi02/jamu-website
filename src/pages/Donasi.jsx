import { motion } from 'framer-motion';

function Donasi({ theme }) {
  const cards = [
    { img: '/assets/images/disabilitas.jpg', alt: 'Penyandang Disabilitas', title: 'Penyandang Disabilitas', desc: 'Mari berbagi untuk penyandang disabilitas.', lokasi: 'Padang, Kota Tua' },
    { img: '/assets/images/asuhan.jpg', alt: 'Panti Asuhan', title: 'Panti Asuhan', desc: 'Berbagi kebahagiaan dengan anak-anak panti asuhan.', lokasi: 'Bukit Tinggi' },
    { img: '/assets/images/kebakaran.jpg', alt: 'Kebakaran Pasar', title: 'Kebakaran Pasar', desc: 'Bantu korban musibah kebakaran pasar.', lokasi: 'Pasar Raya' },
    { img: '/assets/images/gempa.jpg', alt: 'Bantuan Gempa', title: 'Bantuan Gempa', desc: 'Bantu korban bencana gempa bumi.', lokasi: 'Sumatera Barat' },
    { img: '/assets/images/yatim.jpg', alt: 'Anak Yatim', title: 'Anak Yatim', desc: 'Ringankan beban anak-anak yatim.', lokasi: 'Sumatera Barat' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1a1f2b] text-white' : 'bg-white text-gray-800'} py-16 relative pt-24`}>
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="px-4 max-w-7xl mx-auto">
        <motion.h2 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>Ayo Berdonasi</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div key={index} className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-[#2a344a]' : 'bg-white'}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ scale: 1.05, boxShadow: '0 20px 25px rgba(0,0,0,0.15)' }} title={`Donasi untuk ${card.title}`}>
              <img src={card.img} alt={card.alt} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>{card.title}</h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">{card.desc}</p>
                <p className="mb-4 text-gray-500 dark:text-gray-400">Lokasi: {card.lokasi}</p>
                <motion.a href="https://kitabisa.com/explore/all" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#4a704a] text-white dark:bg-[#a3e4b7] dark:text-black px-4 py-2 rounded-full shadow hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} title="Donasi sekarang">Donasi</motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Donasi;