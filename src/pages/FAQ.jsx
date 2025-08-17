import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

function FAQ({ theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "#1a1f2b" : "#f9fafb",
        transition: "background-color 0.3s ease",
      }
    : {};

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
      answer:
        "Pengiriman biasanya memakan waktu 2-5 hari tergantung lokasi Anda.",
    },
    {
      question: "Bagaimana cara memesan dalam jumlah besar?",
      answer:
        "Untuk pemesanan grosir, silakan hubungi kami melalui WhatsApp (+6285745135415) untuk informasi lebih lanjut.",
    },
  ];

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } relative pt-20`}
      style={backgroundStyle}
    >
      {/* Efek background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-[#22624a]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Section */}
      <motion.section
        className="py-20 px-6 max-w-4xl mx-auto relative z-10"
        style={{ scale }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold text-center mb-14 ${
            theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
          }`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          FAQ
        </motion.h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                className={`rounded-lg shadow-sm cursor-pointer border transition-all duration-300 relative ${
                  isActive
                    ? "bg-[#22624a] text-white border-[#22624a] shadow-lg"
                    : "bg-white dark:bg-[#2a344a] border-gray-200 dark:border-gray-700 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                {/* Garis aksen kiri */}
                {isActive && (
                  <motion.div
                    layoutId="active-line"
                    className="absolute left-0 top-0 h-full w-1 bg-[#a3e4b7] rounded-l-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                <div className="p-5 flex justify-between items-center">
                  <motion.h3
                    className={`flex items-center gap-2 text-base font-semibold ${
                      isActive
                        ? "text-white"
                        : theme === "dark"
                        ? "text-[#a3e4b7]"
                        : "text-[#22624a]"
                    }`}
                  >
                    <motion.span
                      animate={
                        isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }
                      }
                      transition={{ duration: 0.4 }}
                    >
                      <FaQuestionCircle />
                    </motion.span>
                    {faq.question}
                  </motion.h3>
                  <motion.span
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl select-none"
                  >
                    ▼
                  </motion.span>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-5 pb-5"
                    >
                      <p
                        className={`leading-relaxed ${
                          isActive
                            ? "text-white/95"
                            : theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
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
        </div>
      </motion.section>
    </div>
  );
}

export default FAQ;
