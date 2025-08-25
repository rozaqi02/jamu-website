import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

function Testimoni({ theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const progressRef = useRef(null);

  const testimonials = [
    { name: "Ani S.", text: "Jamu ini bikin badan saya lebih segar, rasanya juga enak banget!", rating: 5 },
    { name: "Budi P.", text: "Latte rempahnya juara, bantu banget buat rileks pas malam hari.", rating: 4 },
    { name: "Citra L.", text: "Wedang imun ini top, anak saya jarang sakit lagi setelah minum.", rating: 5 },
    { name: "Dedi R.", text: "Keren lah, teh rempahnya bikin hati tenang dan badan fit!", rating: 4 },
    { name: "Eka T.", text: "Saya suka banget sama beras kencur, stamina naik drastis!", rating: 5 },
    { name: "Fani M.", text: "Wedang secang ini mantap, jantungan saya agak reda nih.", rating: 4 },
    { name: "Gina H.", text: "Latte kunyitnya enak dan kulit saya jadi lebih cerah, serius!", rating: 5 },
    { name: "Hadi K.", text: "Produknya oke, rasa autentik dan bikin sehat, recommended!", rating: 5 },
    { name: "Indah Y.", text: "Blue butterfly latte ini unik, bikin pikiran tenang pas stres.", rating: 4 },
  ];

  const totalPages = Math.ceil(testimonials.length / 3);

  // efek mouse glow
  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // auto slide + progress bar (pause aware)
  useEffect(() => {
    if (paused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentPage((p) => (p + 1) % totalPages);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressRef.current);
  }, [paused, totalPages, currentPage]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "#1a1f2b" : "white",
        transition: "background-color 0.5s ease",
      }
    : {};

  const variants = {
    enter: { opacity: 0, x: 80 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  };

  const calcTilt = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * -6;
    const rotateY = ((x - midX) / midX) * 6;
    return { rotateX, rotateY };
  };

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } relative pt-20`}
      style={backgroundStyle}
    >
      {/* Background efek glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-[#22624a]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        className="py-24 px-6 max-w-7xl mx-auto relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold text-center mb-14 ${
            theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
          }`}
        >
          Testimoni Pelanggan
        </motion.h2>

        {/* Slider */}
        <div className="relative w-full overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials
                .slice(currentPage * 3, currentPage * 3 + 3)
                .map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    className={`p-6 rounded-2xl border shadow-md transition-all duration-500 cursor-pointer 
                    ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-200"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                    }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "rotateX(0deg) rotateY(0deg) scale(1)";
                      setPaused(false);
                    }}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const { rotateX, rotateY } = calcTilt(e, card);
                      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                    }}
                  >
                    <FaQuoteLeft
                      className={`text-3xl mb-4 ${
                        theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
                      }`}
                    />
                    <p
                      className={`mb-4 leading-relaxed ${
                        theme === "dark" ? "text-gray-100" : "text-gray-600"
                      }`}
                    >
                      {testimonial.text}
                    </p>
                    <h4
                      className={`text-lg font-semibold ${
                        theme === "dark" ? "text-white" : "text-[#22624a]"
                      }`}
                    >
                      {testimonial.name}
                    </h4>
                    <div className="flex space-x-1 mt-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < testimonial.rating
                              ? theme === "dark"
                                ? "text-[#a3e4b7]"
                                : "text-[#22624a]"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i);
                setProgress(0); // reset progress biar sinkron
              }}
              className={`w-3 h-3 rounded-full transition transform ${
                currentPage === i
                  ? "bg-[#22624a] scale-125"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-2/3 max-w-sm mx-auto h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#22624a] dark:bg-[#a3e4b7]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </motion.section>
    </div>
  );
}

export default Testimoni;
