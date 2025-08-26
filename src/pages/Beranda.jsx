// import { motion, useScroll, useTransform } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa";
// import { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// function Beranda({ theme }) {
//   const [typingText, setTypingText] = useState("");
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const { scrollYProgress } = useScroll();
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
//   const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
//   // const { isAdmin, adminEmail } = useAuth();

//   const texts = useMemo(() => ["DAPATKAN", "RASAKAN"], []);

//   // Efek typing
//   useEffect(() => {
//     let textIndex = 0;
//     let charIndex = 0;
//     let isDeleting = false;

//     const typingInterval = setInterval(() => {
//       if (!isDeleting) {
//         setTypingText(texts[textIndex].slice(0, charIndex + 1));
//         charIndex++;
//         if (charIndex > texts[textIndex].length) {
//           isDeleting = true;
//         }
//       } else {
//         setTypingText(texts[textIndex].slice(0, charIndex - 1));
//         charIndex--;
//         if (charIndex === 0) {
//           isDeleting = false;
//           textIndex = (textIndex + 1) % texts.length;
//         }
//       }
//     }, 200);

//     return () => clearInterval(typingInterval);
//   }, [texts]);

//   // Efek pergerakan mouse
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   const sectionVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const [isMounted, setIsMounted] = useState(false);
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const backgroundStyle = isMounted
//     ? {
//         backgroundColor: theme === "dark" ? "#1a1f2b" : "white",
//         transition: "background-color 0.5s ease",
//       }
//     : {};

//   const images = [
//     "/assets/images/Teh rempah.jpg",
//     "/assets/images/Beras kencur premium.jpg",
//     "/assets/images/Wedang secang.jpg",
//   ];

//   return (
//     <div
//       className={`min-h-screen font-[Poppins] ${
//         theme === "dark" ? "text-white" : "text-gray-800"
//       } overflow-hidden relative`}
//       style={backgroundStyle}
//     >
//       {/* Efek lingkaran animasi mengikuti mouse */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
//         <motion.div
//           className="absolute w-96 h-96 bg-[#22624a]/20 rounded-full"
//           style={{
//             top: `${mousePosition.y - 200}px`,
//             left: `${mousePosition.x - 200}px`,
//             opacity: 0.6,
//             filter: "blur(50px)",
//           }}
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.6, 0.4, 0.6],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       </div>

//       {/* Hero Section */}
//       <motion.section
//         id="home"
//         className="h-screen flex items-center justify-center relative z-10"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={sectionVariants}
//       >
//         <motion.div
//           className="container mx-auto px-6 text-center"
//           style={{ scale, rotate }}
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h2
//             className={`text-xl font-semibold uppercase ${
//               theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
//             }`}
//             variants={itemVariants}
//           >
//             {typingText}
//           </motion.h2>
//           <motion.h1
//             className={`text-5xl md:text-7xl font-[Montserrat] font-bold mb-6 ${
//               theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
//             }`}
//             variants={itemVariants}
//           >
//             Jamu Sugih Waras
//           </motion.h1>
//           <motion.p
//             className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
//               theme === "dark" ? "text-gray-300" : "text-gray-600"
//             }`}
//             variants={itemVariants}
//           >
//             Rasakan manfaat rempah tradisional dalam kemasan modern untuk
//             kesehatan dan kesejahteraan Anda.
//           </motion.p>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             variants={itemVariants}
//           >
//             <Link
//               to="/produk"
//               className="inline-flex items-center gap-2 bg-[#22624a] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#14532d] transition-all duration-300"
//             >
//               Jelajahi Produk <FaArrowRight />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </motion.section>

//       {/* Tentang Kami */}
//       <motion.section
//         className="py-16 px-6 max-w-6xl mx-auto relative z-10"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={sectionVariants}
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//           <motion.div
//             className="overflow-hidden rounded-lg shadow-lg"
//             variants={itemVariants}
//             whileHover={{ scale: 1.02 }}
//           >
//             <img
//               src="/assets/images/ibujualjamu.png"
//               alt="Rumah Rempah Sugih Waras"
//               className="w-full h-[300px] object-cover rounded-lg"
//               loading="lazy"
//             />
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <h2
//               className={`text-4xl font-[Montserrat] font-bold mb-6 ${
//                 theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
//               }`}
//             >
//               Tentang Kami
//             </h2>
//             <p
//               className={`text-lg leading-relaxed text-justify ${
//                 theme === "dark" ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               Rumah Rempah Sugih Waras adalah UMKM yang berlokasi di Desa
//               Kalisongo, Malang. Kami berkomitmen menghadirkan jamu tradisional
//               berkualitas tinggi dengan sentuhan inovasi modern. Dengan
//               memanfaatkan rempah pilihan dari petani lokal dan teknologi
//               pengolahan terkini, Sugih Waras menjaga cita rasa autentik
//               sekaligus meningkatkan khasiat jamu untuk generasi masa kini.
//             </p>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Timeline Informasi Menarik */}
//       <motion.section
//         className="py-16 px-6 max-w-6xl mx-auto relative z-10"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={sectionVariants}
//       >
//         <motion.div
//           className={`rounded-xl py-4 px-6 mb-12 text-center ${
//             theme === "dark" ? "bg-[#1f2a37]" : "bg-gray-100"
//           }`}
//           variants={itemVariants}
//         >
//           <h2
//             className={`text-4xl font-[Montserrat] font-bold ${
//               theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
//             }`}
//           >
//             Informasi Menarik
//           </h2>
//         </motion.div>

//         <div className="relative">
//           <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2 hidden md:block" />

//           <div className="space-y-12">
//             {[
//               {
//                 title: "Khasiat Rempah Lokal untuk Kesehatan",
//                 img: "/assets/images/rempah.jpg",
//                 desc: "Rempah-rempah seperti jahe, kunyit, temulawak, serai, dan kayu manis yang digunakan Rumah Rempah Sugih Waras kaya akan antioksidan, antiinflamasi, dan vitamin. Khasiatnya mencakup peningkatan daya tahan tubuh, memperlancar peredaran darah, mengurangi peradangan, serta membantu pencernaan. Semua bahan diambil langsung dari petani lokal, memastikan kesegaran dan kualitasnya tetap terjaga.",
//               },
//               {
//                 title: "Tren Konsumsi Herbal di Era Modern",
//                 img: "/assets/images/tren.jpg",
//                 desc: "Di tengah meningkatnya kesadaran hidup sehat, produk herbal kembali menjadi pilihan banyak orang, terutama generasi muda. Jamu Sugih Waras dikemas modern, praktis, dan higienis, sehingga cocok dinikmati di rumah maupun dibawa bepergian. Tren “back to nature” membuat minuman herbal menjadi bagian gaya hidup sehat masa kini, tidak hanya sekadar warisan tradisi.",
//               },
//               {
//                 title: "Kontribusi Jamu pada Ekonomi Lokal",
//                 img: "/assets/images/kontribusi.jpg",
//                 desc: "Rumah Rempah Sugih Waras tidak hanya berfokus pada produksi jamu, tetapi juga pemberdayaan masyarakat Desa Kalisongo. Dengan peningkatan kapasitas produksi melalui inovasi teknologi, UMKM ini mampu menciptakan lapangan kerja baru, meningkatkan pendapatan keluarga, serta menghidupkan kembali potensi rempah lokal yang bernilai ekonomi tinggi.",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className={`relative flex w-full ${
//                   index % 2 === 0
//                     ? "md:justify-start"
//                     : "md:justify-end md:text-right"
//                 }`}
//                 variants={itemVariants}
//               >
//                 <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#22624a] text-white font-bold w-10 h-10 rounded-full flex items-center justify-center z-10 hidden md:flex">
//                   {String(index + 1).padStart(2, "0")}
//                 </div>

//                 <div
//                   className={`relative w-full md:w-5/12 rounded-xl shadow-lg overflow-hidden p-4 ${
//                     theme === "dark" ? "bg-[#1e293b] text-gray-200" : "bg-white text-gray-700"
//                   } ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
//                 >
//                   <div className="flex items-center gap-4 mb-3">
//                     <img
//                       src={item.img}
//                       alt={item.title}
//                       className="w-20 h-20 object-cover rounded-md"
//                       loading="lazy"
//                     />
//                     <h3
//                       className={`text-lg font-semibold ${
//                         theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                   </div>
//                   <p
//                     className={`text-sm text-justify ${
//                       theme === "dark" ? "text-gray-200" : "text-gray-600"
//                     }`}
//                   >
//                     {item.desc}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Produk Terbaik */}
//       <motion.section
//         className="py-16 px-6 max-w-6xl mx-auto relative z-10"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={sectionVariants}
//       >
//         <motion.h2
//           className={`text-4xl font-[Montserrat] font-bold text-center mb-12 ${
//             theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
//           }`}
//           variants={itemVariants}
//         >
//           Produk Terbaik Kami
//         </motion.h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {images.map((img, index) => {
//             const titles = [
//               "Teh rempah",
//               "Beras kencur premium",
//               "Wedang secang",
//             ];
//             const prices = [30000, 10000, 20000];

//             return (
//               <Link key={index} to="/produk">
//                 <motion.div
//                   className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <img
//                     src={img}
//                     alt={`Produk ${titles[index]}`}
//                     className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                   <motion.div
//                     className="absolute bottom-4 left-4 text-white"
//                     initial={{ y: 20, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     transition={{ delay: index * 0.1, duration: 0.5 }}
//                   >
//                     <h4 className="text-lg font-semibold">{titles[index]}</h4>
//                     <p className="text-sm">
//                       Rp {prices[index].toLocaleString("id-ID")}
//                     </p>
//                   </motion.div>
//                 </motion.div>
//               </Link>
//             );
//           })}
//         </div>
//       </motion.section>

//       {/* CTA */}
//       <motion.section
//         className="py-20 px-6 text-center relative z-10"
//         style={{ backgroundColor: theme === "dark" ? "#2a344a" : "#f5f5f5" }}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={sectionVariants}
//       >
//         <motion.h2
//           className={`text-4xl font-[Montserrat] font-bold mb-6 ${
//             theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
//           }`}
//           variants={itemVariants}
//         >
//           Mulai Hidup Sehat Sekarang
//         </motion.h2>
//         <motion.p
//           className={`text-lg mb-8 max-w-xl mx-auto ${
//             theme === "dark" ? "text-gray-300" : "text-gray-600"
//           }`}
//           variants={itemVariants}
//         >
//           Pesan jamu herbal kami dan rasakan manfaatnya untuk kesehatan Anda.
//         </motion.p>
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           variants={itemVariants}
//         >
//           <Link
//             to="/produk"
//             className="inline-flex items-center gap-2 bg-[#22624a] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#14532d] transition-all duration-300"
//           >
//             Pesan Sekarang <FaArrowRight />
//           </Link>
//         </motion.div>
//       </motion.section>
//     </div>
//   );
// }

// export default Beranda;

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

function Beranda({ theme }) {
  // Typing headline mini
  const [typingText, setTypingText] = useState("");
  const texts = useMemo(() => ["DAPATKAN", "RASAKAN"], []);
  useEffect(() => {
    let textIndex = 0, charIndex = 0, isDeleting = false;
    const iv = setInterval(() => {
      if (!isDeleting) {
        setTypingText(texts[textIndex].slice(0, charIndex + 1));
        charIndex++;
        if (charIndex > texts[textIndex].length) isDeleting = true;
      } else {
        setTypingText(texts[textIndex].slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; }
      }
    }, 140);
    return () => clearInterval(iv);
  }, [texts]);

  // Parallax mouse (smooth)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Layer offsets
  const l1x = useTransform(smx, (v) => v * 18);
  const l1y = useTransform(smy, (v) => v * 18);
  const l2x = useTransform(smx, (v) => v * -28);
  const l2y = useTransform(smy, (v) => v * -22);
  const l3x = useTransform(smx, (v) => v * 12);
  const l3y = useTransform(smy, (v) => v * -10);

  // Scroll subtle
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 6]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // Transisi global 0.5s untuk background/color/border/shadow/filter
  const smoothTransition = "background-color .5s ease, color .5s ease, border-color .5s ease, box-shadow .5s ease, filter .5s ease, background .5s ease";

  const backgroundStyle = isMounted
    ? {
        background:
          theme === "dark"
            ? "radial-gradient(1000px circle at 20% 15%, rgba(163,228,183,0.09), transparent 45%), linear-gradient(180deg, #0f1520 0%, #1a1f2b 100%)"
            : "radial-gradient(1000px circle at 75% 10%, rgba(34,98,74,0.08), transparent 45%), linear-gradient(180deg, #ffffff 0%, #f7faf7 100%)",
        transition: smoothTransition,
      }
    : {};

  // Variants
  const sectionVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const images = [
    "/assets/images/Teh rempah.jpg",
    "/assets/images/Beras kencur premium.jpg",
    "/assets/images/Wedang secang.jpg",
  ];

  return (
    <div
      className={`min-h-screen font-[Poppins] ${theme === "dark" ? "text-white" : "text-gray-800"} overflow-hidden relative transition-colors duration-500 ease-in-out`}
      style={backgroundStyle}
    >
      {/* HERO */}
      <section id="home" className="relative pt-28 md:pt-32 transition-colors duration-500 ease-in-out">
        {/* Dekor glow */}
        <motion.div
          className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
          style={{
            x: l2x,
            y: l2y,
            background:
              theme === "dark"
                ? "conic-gradient(from 180deg, rgba(163,228,183,.18), transparent 40%)"
                : "conic-gradient(from 180deg, rgba(34,98,74,.16), transparent 40%)",
            transition: smoothTransition,
          }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-28 -left-28 w-[560px] h-[560px] rounded-full blur-3xl opacity-30"
          style={{
            x: l1x,
            y: l1y,
            background:
              theme === "dark"
                ? "conic-gradient(from 40deg, rgba(163,228,183,.14), transparent 40%)"
                : "conic-gradient(from 40deg, rgba(34,98,74,.12), transparent 40%)",
            transition: smoothTransition,
          }}
        />

        {/* Content */}
        <motion.div
          className="site-container relative"
          style={{ scale, rotate }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left copy */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-500 ease-in-out"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className={`${theme === "dark" ? "text-emerald-300 border-emerald-700/50 bg-emerald-900/10" : "text-emerald-700 border-emerald-200 bg-emerald-50"} transition-colors duration-500 ease-in-out`}>
                  {typingText || "DAPATKAN"}
                </span>
              </motion.div>

              <motion.h1
                className="mt-4 leading-[1.15] font-[Montserrat] font-extrabold text-4xl md:text-5xl transition-colors duration-500 ease-in-out"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Jamu Sugih Waras
                <br />
                <span className={`${theme === "dark" ? "text-jakora-light-green" : "text-jakora-green"} transition-colors duration-500 ease-in-out`}>
                  Rempah Tradisi, Rasa Masa Kini
                </span>
              </motion.h1>

              <motion.p
                className={`mt-4 max-w-xl mx-auto lg:mx-0 text-base md:text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors duration-500 ease-in-out`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Nikmati manfaat rempah Nusantara dalam kemasan modern. Lebih
                praktis, higienis, dan pas untuk rutinitas sehatmu setiap hari.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  to="/produk"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors duration-500 ease-in-out"
                >
                  Jelajahi Produk <FaArrowRight />
                </Link>
                <Link
                  to="/testimoni"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 border ${theme === "dark" ? "border-gray-700 hover:bg-white/5" : "border-gray-300 hover:bg-gray-50"} transition-colors duration-500 ease-in-out`}
                >
                  Lihat Testimoni
                </Link>
              </motion.div>
            </div>

            {/* Right visual + parallax layers */}
            <div className="lg:col-span-6 relative h-[420px] md:h-[520px]">
              {/* Card utama */}
              <motion.div
                className={`absolute right-4 left-4 md:right-8 md:left-auto top-8 md:top-10 w-auto md:w-[420px] rounded-3xl overflow-hidden border shadow-xl ${theme === "dark" ? "bg-[#0f1520] border-gray-800" : "bg-white border-gray-200"} transition-colors duration-500 ease-in-out`}
                style={{ x: l1x, y: l1y }}
              >
                <img
                  src="/assets/images/Wedang secang.jpg"
                  alt="Wedang Secang"
                  className="h-64 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${theme === "dark" ? "text-jakora-light-green" : "text-jakora-green"} transition-colors duration-500 ease-in-out`}>
                      Wedang Secang
                    </h3>
                  </div>
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-2 transition-colors duration-500 ease-in-out">
                    Hangatkan badan dan tenangkan pikiran dengan racikan rempah pilihan.
                  </p>
                </div>
              </motion.div>

              {/* Layer 2 */}
              <motion.div
                className="absolute -left-2 md:-left-6 bottom-10 md:bottom-16 w-40 md:w-52 rounded-2xl overflow-hidden shadow-lg border transition-colors duration-500 ease-in-out"
                style={{ x: l2x, y: l2y }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <img
                  src="/assets/images/Teh rempah.jpg"
                  alt="Teh Rempah"
                  className="w-full h-28 md:h-36 object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Layer 3 */}
              <motion.div
                className="absolute right-2 md:right-10 -bottom-4 md:-bottom-2 w-36 md:w-48 rounded-2xl overflow-hidden shadow-lg border transition-colors duration-500 ease-in-out"
                style={{ x: l3x, y: l3y }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src="/assets/images/Beras kencur premium.jpg"
                  alt="Beras Kencur Premium"
                  className="w-full h-28 md:h-36 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tentang Kami */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto relative z-10 transition-colors duration-500 ease-in-out"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            className="overflow-hidden rounded-lg shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/assets/images/ibujualjamu.png"
              alt="Rumah Rempah Sugih Waras"
              className="w-full h-[300px] object-cover rounded-lg"
              loading="lazy"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2
              className={`text-4xl font-[Montserrat] font-bold mb-6 ${theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"} transition-colors duration-500 ease-in-out`}
            >
              Tentang Kami
            </h2>
            <p
              className={`text-lg leading-relaxed text-justify ${theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors duration-500 ease-in-out`}
            >
              Rumah Rempah Sugih Waras adalah UMKM yang berlokasi di Desa
              Kalisongo, Malang. Kami berkomitmen menghadirkan jamu tradisional
              berkualitas tinggi dengan sentuhan inovasi modern. Dengan
              memanfaatkan rempah pilihan dari petani lokal dan teknologi
              pengolahan terkini, Sugih Waras menjaga cita rasa autentik
              sekaligus meningkatkan khasiat jamu untuk generasi masa kini.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Informasi */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto relative z-10 transition-colors duration-500 ease-in-out"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.div
          className={`rounded-xl py-4 px-6 mb-12 text-center ${theme === "dark" ? "bg-[#1f2a37]" : "bg-gray-100"} transition-colors duration-500 ease-in-out`}
          variants={itemVariants}
        >
          <h2 className={`text-4xl font-[Montserrat] font-bold ${theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"} transition-colors duration-500 ease-in-out`}>
            Informasi Menarik
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2 hidden md:block transition-colors duration-500 ease-in-out" />

          <div className="space-y-12">
            {[
              {
                title: "Khasiat Rempah Lokal untuk Kesehatan",
                img: "/assets/images/rempah.jpg",
                desc: "Rempah-rempah seperti jahe, kunyit, temulawak, serai, dan kayu manis ...",
              },
              {
                title: "Tren Konsumsi Herbal di Era Modern",
                img: "/assets/images/tren.jpg",
                desc: "Di tengah meningkatnya kesadaran hidup sehat, produk herbal kembali ...",
              },
              {
                title: "Kontribusi Jamu pada Ekonomi Lokal",
                img: "/assets/images/kontribusi.jpg",
                desc: "Rumah Rempah Sugih Waras tidak hanya berfokus pada produksi jamu ...",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`relative flex w-full ${index % 2 === 0 ? "md:justify-start" : "md:justify-end md:text-right"}`}
                variants={itemVariants}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#22624a] text-white font-bold w-10 h-10 rounded-full flex items-center justify-center z-10 hidden md:flex">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div
                  className={`relative w-full md:w-5/12 rounded-xl shadow-lg overflow-hidden p-4 ${theme === "dark" ? "bg-[#1e293b] text-gray-200" : "bg-white text-gray-700"} transition-colors duration-500 ease-in-out ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded-md" loading="lazy" />
                    <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"} transition-colors duration-500 ease-in-out`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={`text-sm text-justify ${theme === "dark" ? "text-gray-200" : "text-gray-600"} transition-colors duration-500 ease-in-out`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Produk Terbaik */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto relative z-10 transition-colors duration-500 ease-in-out"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold text-center mb-12 ${theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"} transition-colors duration-500 ease-in-out`}
          variants={itemVariants}
        >
          Produk Terbaik Kami
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((img, index) => {
            const titles = ["Teh rempah", "Beras kencur premium", "Wedang secang"];
            const prices = [30000, 10000, 20000];

            return (
              <Link key={index} to="/produk">
                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-colors duration-500 ease-in-out"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={img}
                    alt={`Produk ${titles[index]}`}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div
                    className="absolute bottom-4 left-4 text-white"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <h4 className="text-lg font-semibold">{titles[index]}</h4>
                    <p className="text-sm">Rp {prices[index].toLocaleString("id-ID")}</p>
                  </motion.div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-20 px-6 text-center relative z-10 transition-colors duration-500 ease-in-out"
        style={{ backgroundColor: theme === "dark" ? "#2a344a" : "#f5f5f5", transition: smoothTransition }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold mb-6 ${theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"} transition-colors duration-500 ease-in-out`}
          variants={itemVariants}
        >
          Mulai Hidup Sehat Sekarang
        </motion.h2>
        <motion.p
          className={`text-lg mb-8 max-w-xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"} transition-colors duration-500 ease-in-out`}
          variants={itemVariants}
        >
          Pesan jamu herbal kami dan rasakan manfaatnya untuk kesehatan Anda.
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={itemVariants}>
          <Link
            to="/produk"
            className="inline-flex items-center gap-2 bg-[#22624a] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#14532d] transition-colors duration-500 ease-in-out"
          >
            Pesan Sekarang <FaArrowRight />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Beranda;
