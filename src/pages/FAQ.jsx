import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

function FAQ({ theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState([]); // multi-buka
  const { scrollYProgress } = useScroll();

  // Parallax untuk section scale
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  // Parallax untuk judul FAQ
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scaleTitle = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Apa itu Jamu Sugih Waras?",
      answer:
        "Jamu Sugih Waras adalah produk herbal tradisional dari rempah pilihan yang dikemas secara modern untuk mendukung kesehatan dan kesejahteraan Anda.",
    },
    {
      question: "Bagaimana cara menyimpan jamu?",
      answer:
        "Simpan jamu di tempat kering dan sejuk, hindari paparan sinar matahari langsung untuk menjaga kualitas.",
    },
    {
      question: "Apakah jamu ini halal?",
      answer:
        "Ya, semua produk Jamu Sugih Waras telah tersertifikasi halal dan aman untuk dikonsumsi.",
    },
    {
      question: "Berapa lama pengiriman biasanya?",
      answer: "Pengiriman biasanya memakan waktu 2-5 hari tergantung lokasi Anda.",
    },
    {
      question: "Bagaimana cara memesan dalam jumlah besar?",
      answer:
        "Untuk pemesanan grosir, silakan hubungi kami melalui WhatsApp (+6285745135415) untuk informasi lebih lanjut.",
    },
  ];

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } relative pt-20`}
      style={{
        backgroundColor: theme === "dark" ? "#1a1f2b" : "#f9fafb",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Glow background mengikuti mouse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-[#22624a]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.15, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        className="py-20 px-6 max-w-4xl mx-auto relative z-10"
        style={{ scale }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariant}
      >
        {/* Judul dengan Parallax */}
        <motion.h2
          className={`text-4xl md:text-5xl font-[Montserrat] font-bold text-center mb-14 ${
            theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
          }`}
          style={{ y: yTitle, scale: scaleTitle }}
          variants={itemVariant}
        >
          FAQ
        </motion.h2>

        <motion.div className="space-y-5" variants={containerVariant}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex.includes(index);
            return (
              <motion.div
                key={index}
                layout
                variants={itemVariant}
                className={`rounded-lg border transition-all duration-300 relative cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-[#22624a] to-[#3b7d5c] text-white border-[#22624a] shadow-lg"
                    : "bg-white dark:bg-[#2f3647] border-gray-200 dark:border-gray-600 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleIndex(index)}
              >
                <div className="p-5 flex justify-between items-center">
                  <motion.h3
                    className={`flex items-center gap-2 text-base font-semibold relative group ${
                      isActive
                        ? "text-white"
                        : theme === "dark"
                        ? "text-[#a3e4b7]"
                        : "text-[#22624a]"
                    }`}
                  >
                    <FaQuestionCircle />
                    {faq.question}

                    {/* Underline animasi */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-current rounded transition-all duration-500 origin-left
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    />
                  </motion.h3>
                  <motion.div
                    initial={false}
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold select-none"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isActive ? "minus" : "plus"}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        {isActive ? "−" : "+"}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-5 pb-5"
                    >
                      <p
                        className={`leading-relaxed ${
                          isActive
                            ? "text-white"
                            : theme === "dark"
                            ? "text-gray-200"
                            : "text-gray-700"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>
    </div>
  );
}

export default FAQ;
