// import React from 'react';

// function Donasi({ theme }) {
//   return (
//     <section className={`pt-24 pb-28 px-4 max-w-7xl mx-auto ${theme === 'dark' ? 'bg-[#1a1f2b] text-white' : 'bg-white text-gray-800'}`}>
//       <h2 className={`text-5xl font-extrabold text-center mb-12 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
//         Ayo Berdonasi
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Card 1 */}
//         <div className={`rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#2a344a]' : 'bg-white'}`}>
//           <img
//             src="/assets/images/disabilitas.jpg"
//             alt="Penyandang Disabilitas"
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-6">
//             <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
//               Penyandang Disabilitas
//             </h3>
//             <p className="mb-2 text-gray-600 dark:text-gray-300">
//               Mari berbagi untuk saudara-saudara penyandang disabilitas. Setiap bantuan berarti bagi mereka.
//             </p>
//             <p className="mb-4 text-gray-500 dark:text-gray-400">
//               Lokasi: Padang, Kota Tua
//             </p>
//             <a
//               href="https://kitabisa.com/explore/all"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-[#4a704a] text-white dark:bg-[#a3e4b7] dark:text-black px-4 py-2 rounded-full shadow hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition"
//             >
//               Donasi
//             </a>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className={`rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#2a344a]' : 'bg-white'}`}>
//           <img
//             src="/assets/images/asuhan.jpg"
//             alt="Panti Asuhan"
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-6">
//             <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
//               Panti Asuhan
//             </h3>
//             <p className="mb-2 text-gray-600 dark:text-gray-300">
//               Mari berbagi kebahagiaan dengan anak-anak di panti asuhan. Sumbangkan kasih dan rezekimu.
//             </p>
//             <p className="mb-4 text-gray-500 dark:text-gray-400">
//               Lokasi: Bukit Tinggi
//             </p>
//             <a
//               href="https://kitabisa.com/explore/all"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-[#4a704a] text-white dark:bg-[#a3e4b7] dark:text-black px-4 py-2 rounded-full shadow hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition"
//             >
//               Donasi
//             </a>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className={`rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#2a344a]' : 'bg-white'}`}>
//           <img
//             src="/assets/images/kebakaran.jpg"
//             alt="Kebakaran Pasar"
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-6">
//             <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
//               Kebakaran Pasar
//             </h3>
//             <p className="mb-2 text-gray-600 dark:text-gray-300">
//               Mari berbagi untuk saudara-saudara yang terkena musibah kebakaran pasar.
//             </p>
//             <p className="mb-4 text-gray-500 dark:text-gray-400">
//               Lokasi: Pasar Raya
//             </p>
//             <a
//               href="https://kitabisa.com/explore/all"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-[#4a704a] text-white dark:bg-[#a3e4b7] dark:text-black px-4 py-2 rounded-full shadow hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition"
//             >
//               Donasi
//             </a>
//           </div>
//         </div>

//         {/* Card 4 - Gempa */}
//         <div className={`rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#2a344a]' : 'bg-white'}`}>
//           <img
//             src="/assets/images/gempa.jpg"
//             alt="Bantuan Gempa"
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-6">
//             <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
//               Bantuan Gempa
//             </h3>
//             <p className="mb-2 text-gray-600 dark:text-gray-300">
//               Mari bantu saudara-saudara kita yang terdampak bencana gempa bumi. Donasi Anda sangat berarti.
//             </p>
//             <p className="mb-4 text-gray-500 dark:text-gray-400">
//               Lokasi: Sumatera Barat
//             </p>
//             <a
//               href="https://kitabisa.com/explore/all"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-[#4a704a] text-white dark:bg-[#a3e4b7] dark:text-black px-4 py-2 rounded-full shadow hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition"
//             >
//               Donasi
//             </a>
//           </div>
//         </div>

//         {/* Card 5 - Anak Yatim */}
//         <div className={`rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#2a344a]' : 'bg-white'}`}>
//           <img
//             src="/assets/images/yatim.jpg"
//             alt="Anak Yatim"
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-6">
//             <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
//               Anak Yatim
//             </h3>
//             <p className="mb-2 text-gray-600 dark:text-gray-300">
//               Bantu ringankan beban hidup anak-anak yatim dengan uluran tangan dan rezeki terbaik Anda.
//             </p>
//             <p className="mb-4 text-gray-500 dark:text-gray-400">
//               Lokasi: Sumatera Barat
//             </p>
//             <a
//               href="https://kitabisa.com/explore/all"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-[#4a704a] text-white dark:bg-[#a3e4b7] dark:text-black px-4 py-2 rounded-full shadow hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition"
//             >
//               Donasi
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Donasi;





// 22222






import React from 'react';
import { motion } from 'framer-motion';

function Donasi({ theme }) {
  const cards = [
    {
      img: '/assets/images/disabilitas.jpg',
      alt: 'Penyandang Disabilitas',
      title: 'Penyandang Disabilitas',
      desc: 'Mari berbagi untuk saudara-saudara penyandang disabilitas. Setiap bantuan berarti bagi mereka.',
      lokasi: 'Padang, Kota Tua',
    },
    {
      img: '/assets/images/asuhan.jpg',
      alt: 'Panti Asuhan',
      title: 'Panti Asuhan',
      desc: 'Mari berbagi kebahagiaan dengan anak-anak di panti asuhan. Sumbangkan kasih dan rezekimu.',
      lokasi: 'Bukit Tinggi',
    },
    {
      img: '/assets/images/kebakaran.jpg',
      alt: 'Kebakaran Pasar',
      title: 'Kebakaran Pasar',
      desc: 'Mari berbagi untuk saudara-saudara yang terkena musibah kebakaran pasar.',
      lokasi: 'Pasar Raya',
    },
    {
      img: '/assets/images/gempa.jpg',
      alt: 'Bantuan Gempa',
      title: 'Bantuan Gempa',
      desc: 'Mari bantu saudara-saudara kita yang terdampak bencana gempa bumi. Donasi Anda sangat berarti.',
      lokasi: 'Sumatera Barat',
    },
    {
      img: '/assets/images/yatim.jpg',
      alt: 'Anak Yatim',
      title: 'Anak Yatim',
      desc: 'Bantu ringankan beban hidup anak-anak yatim dengan uluran tangan dan rezeki terbaik Anda.',
      lokasi: 'Sumatera Barat',
    },
  ];

  return (
    <section
      className={`pt-24 pb-28 px-4 max-w-7xl mx-auto ${theme === 'dark' ? 'bg-[#1a1f2b] text-white' : 'bg-white text-gray-800'}`}
    >
      <motion.h2
        className={`text-5xl font-extrabold text-center mb-12 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Ayo Berdonasi
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-[#2a344a]' : 'bg-white'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px rgba(0,0,0,0.15)' }}
          >
            <img
              src={card.img}
              alt={card.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>
                {card.title}
              </h3>
              <p className="mb-2 text-gray-600 dark:text-gray-300">{card.desc}</p>
              <p className="mb-4 text-gray-500 dark:text-gray-400">Lokasi: {card.lokasi}</p>
              <a
                href="https://kitabisa.com/explore/all"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#4a704a] text-white dark:bg-[#a3e4b7] dark:text-black px-4 py-2 rounded-full shadow hover:bg-[#355e3b] dark:hover:bg-[#7fd8a1] transition"
              >
                Donasi
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Donasi;
