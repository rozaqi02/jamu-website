import { useState, useEffect, useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaLeaf,
  FaShieldAlt,
  FaHeart,
  FaClock,
  FaStar,
} from "react-icons/fa";

/* ======================
   Util kecil
   ====================== */
function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return mobile;
}

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

/* Counter animasi yang ramah performa */
function CountUp({ to = 100, duration = 1.2, suffix = "", className = "", grouping = true }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v));

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      mv.set(to);
      return;
    }
    const start = performance.now();
    const tick = (t) => {
      const p = clamp((t - start) / (duration * 1000), 0, 1);
      mv.set(p * to);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration, prefersReducedMotion, mv]);

  const [val, setVal] = useState(0);
  useEffect(() => rounded.on("change", setVal), [rounded]);

  const fmt = new Intl.NumberFormat("id-ID", { useGrouping: grouping });
  return (
    <div ref={ref} className={className}>
      {fmt.format(val)}
      {suffix}
    </div>
  );
}

function Beranda({ theme }) {
  const isMobile = useIsMobile(768);
  const prefersReducedMotion = useReducedMotion();

  /* ======================
     Parallax & Scroll
     ====================== */
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Mouse parallax (Hero) — 3 layer
  const heroRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });

  const intensity = isMobile || prefersReducedMotion ? 0 : 1; // matikan di mobile/PRM
  const l1x = useTransform(smx, (v) => v * 18 * intensity);
  const l1y = useTransform(smy, (v) => v * 18 * intensity);
  const l2x = useTransform(smx, (v) => v * -26 * intensity);
  const l2y = useTransform(smy, (v) => v * -20 * intensity);
  const l3x = useTransform(smx, (v) => v * 12 * intensity);
  const l3y = useTransform(smy, (v) => v * -10 * intensity);

  // rotasi kartu hero (reactive, bukan .get())
  const rotX = useTransform(smy, (v) => v * -4 * intensity);
  const rotY = useTransform(smx, (v) => v *  6 * intensity);

  // Scroll parallax halus untuk dekor glow di Hero
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 80 * intensity]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, -60 * intensity]);

  const onMouseMoveHero = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x * 2);
    my.set(y * 2);
  };

  /* ======================
     Typing mini untuk badge
     ====================== */
  const [typingText, setTypingText] = useState("");
  const texts = useMemo(() => ["DAPATKAN", "RASAKAN"], []);
  useEffect(() => {
    let textIndex = 0,
      charIndex = 0,
      isDeleting = false;
    const iv = setInterval(() => {
      if (prefersReducedMotion) {
        setTypingText(texts[textIndex]);
        return;
      }
      if (!isDeleting) {
        setTypingText(texts[textIndex].slice(0, charIndex + 1));
        charIndex++;
        if (charIndex > texts[textIndex].length) isDeleting = true;
      } else {
        setTypingText(texts[textIndex].slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
    }, 120);
    return () => clearInterval(iv);
  }, [texts, prefersReducedMotion]);

  /* ======================
     Variants umum
     ====================== */
  const sectionVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  /* ======================
     Data statis
     ====================== */
  const heroImages = [
    { src: "/assets/images/Wedang secang.jpg", title: "Wedang Secang" },
    { src: "/assets/images/Teh rempah.jpg", title: "Teh Rempah" },
    { src: "/assets/images/Beras kencur premium.jpg", title: "Beras Kencur Premium" },
  ];

  const favoriteProducts = [
    { id: "teh-rempah", title: "Teh Rempah", price: 30000, img: "/assets/images/Teh rempah.jpg" },
    { id: "beras-kencur-premium", title: "Beras Kencur Premium", price: 10000, img: "/assets/images/Beras kencur premium.jpg" },
    { id: "wedang-secang", title: "Wedang Secang", price: 20000, img: "/assets/images/Wedang secang.jpg" },
  ];

  const benefits = [
    { icon: <FaLeaf />, text: "Bahan Alami" },
    { icon: <FaShieldAlt />, text: "Higienis & Aman" },
    { icon: <FaHeart />, text: "Rasa Disukai Keluarga" },
    { icon: <FaClock />, text: "Praktis untuk Harian" },
    { icon: <FaStar />, text: "UMKM Malang" },
  ];

  /* ======================
     Magnetic button (EFEK #7)
     ====================== */
  const ctaRef = useRef(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const onMagnet = (e) => {
    if (!ctaRef.current || prefersReducedMotion || isMobile) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    btnX.set(clamp(x * 0.15, -12, 12));
    btnY.set(clamp(y * 0.15, -12, 12));
  };
  const resetMagnet = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "text-white" : "text-gray-800"} overflow-hidden relative transition-colors duration-500`}
    >
      {/* Progress scroll halus */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-[3px] bg-[var(--yumsert-green)] z-[60]"
      />

      {/* ====================== HERO ====================== */}
      <section
        id="home"
        ref={heroRef}
        onMouseMove={onMouseMoveHero}
        className="relative pt-28 md:pt-32 pb-10"
      >
        {/* Dekor parallax scroll (EFEK #2) */}
        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute -top-24 -right-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-25 hidden sm:block"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                theme === "dark"
                  ? "conic-gradient(from 180deg, rgba(163,228,183,.18), transparent 40%)"
                  : "conic-gradient(from 180deg, rgba(34,98,74,.16), transparent 40%)",
            }}
          />
        </motion.div>
        <motion.div
          style={{ y: glowY2 }}
          className="pointer-events-none absolute -bottom-28 -left-28 w-[620px] h-[620px] rounded-full blur-3xl opacity-25 hidden sm:block"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                theme === "dark"
                  ? "conic-gradient(from 40deg, rgba(163,228,183,.14), transparent 40%)"
                  : "conic-gradient(from 40deg, rgba(34,98,74,.12), transparent 40%)",
            }}
          />
        </motion.div>

        <motion.div
          className="site-container relative"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left copy */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span
                  className={
                    theme === "dark"
                      ? "text-emerald-300 border-emerald-700/50 bg-emerald-900/10"
                      : "text-emerald-700 border-emerald-200 bg-emerald-50"
                  }
                >
                  {typingText || "DAPATKAN"}
                </span>
              </motion.div>

              {/* Headline shimmer stabil */}
              <motion.h1
                key={theme} /* paksa re-mount agar gradient refresh */
                className="mt-4 leading-[1.1] font-playfair font-extrabold text-[2.4rem] md:text-6xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <span className="headline-shimmer">
                  Jamu Sugih Waras
                  <br />
                  Rempah Tradisi, Rasa Masa Kini
                </span>
              </motion.h1>

              <motion.p
                className={`mt-4 max-w-xl mx-auto lg:mx-0 text-base md:text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Nikmati manfaat rempah Nusantara dalam kemasan modern. Praktis,
                higienis, dan pas untuk rutinitas sehat harianmu.
              </motion.p>

              {/* CTA + Magnetic */}
              <motion.div
                className="mt-7 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <motion.div
                  ref={ctaRef}
                  onMouseMove={onMagnet}
                  onMouseLeave={resetMagnet}
                  style={{ x: btnX, y: btnY }}
                >
                  <Link
                    to="/produk"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-white bg-emerald-600 hover:bg-emerald-700 shadow-md"
                  >
                    Jelajahi Produk <FaArrowRight />
                  </Link>
                </motion.div>
                <Link
                  to="/kontak"
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 border ${
                    theme === "dark"
                      ? "border-gray-700 hover:bg-white/5"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Tentang Kami
                </Link>
              </motion.div>
            </div>

            {/* Right visual — Parallax Mouse + Tilt */}
            <div className="lg:col-span-6 relative h-[420px] md:h-[520px]">
              {/* Card utama */}
              <motion.div
                className={`absolute right-4 left-4 md:right-8 md:left-auto top-8 md:top-10 w-auto md:w-[440px] rounded-3xl overflow-hidden border shadow-xl ${
                  theme === "dark" ? "bg-[#0f1520] border-gray-800" : "bg-white border-gray-200"
                }`}
                style={{ x: l1x, y: l1y, rotateX: rotX, rotateY: rotY, willChange: "transform" }}
              >
                <img
                  src={heroImages[0].src}
                  alt={heroImages[0].title}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className={theme === "dark" ? "text-emerald-300 font-semibold" : "text-emerald-700 font-semibold"}>
                      {heroImages[0].title}
                    </h3>
                  </div>
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                    Hangatkan badan & tenangkan pikiran dengan racikan rempah pilihan.
                  </p>
                </div>
              </motion.div>

              {/* Layer 2 */}
              <motion.div
                className="absolute -left-2 md:-left-6 bottom-10 md:bottom-16 w-40 md:w-52 rounded-2xl overflow-hidden shadow-lg border"
                style={{ x: l2x, y: l2y }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <img
                  src={heroImages[1].src}
                  alt={heroImages[1].title}
                  className="w-full h-28 md:h-36 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* Layer 3 */}
              <motion.div
                className="absolute right-2 md:right-10 -bottom-4 md:-bottom-2 w-36 md:w-48 rounded-2xl overflow-hidden shadow-lg border"
                style={{ x: l3x, y: l3y }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src={heroImages[2].src}
                  alt={heroImages[2].title}
                  className="w-full h-28 md:h-36 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* Ornamen daun mengapung */}
              {!prefersReducedMotion && (
                <>
                  <img
                    src="/assets/images/leaf_1.png"
                    alt=""
                    className="sticker w-10 left-10 top-8"
                    aria-hidden
                    decoding="async"
                    loading="lazy"
                  />
                  <img
                    src="/assets/images/leaf_2.png"
                    alt=""
                    className="sticker w-8 right-8 top-20"
                    aria-hidden
                    decoding="async"
                    loading="lazy"
                  />
                </>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ====================== MARQUEE BENEFIT ====================== */}
      <section className="py-6">
        <div className="site-container">
          <div className="marquee-container">
            <div className="marquee-content-left">
              {benefits.concat(benefits).map((b, i) => (
                <div key={`m1-${i}`} className="marquee-item text-sm">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border">
                    {b.icon}
                  </div>
                  <span className="mt-1">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 marquee-container">
            <div className="marquee-content-right">
              {benefits.concat(benefits).map((b, i) => (
                <div key={`m2-${i}`} className="marquee-item text-sm">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border">
                    {b.icon}
                  </div>
                  <span className="mt-1">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== TENTANG KAMI ====================== */}
      <motion.section
        className="py-16 site-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            className="overflow-hidden rounded-xl shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
          >
            <img
              src="/assets/images/ibujualjamu.png"
              alt="Rumah Rempah Sugih Waras"
              className="w-full h-[320px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2
              className={`text-4xl font-playfair font-bold mb-4 ${
                theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
              }`}
            >
              Tentang Kami
            </h2>
            <p
              className={`text-lg leading-relaxed text-justify ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Rumah Rempah Sugih Waras adalah UMKM di Malang yang berkomitmen
              menghadirkan jamu tradisional berkualitas tinggi dengan sentuhan
              inovasi modern. Kami memanfaatkan rempah pilihan dari petani
              lokal dan proses higienis agar cita rasa autentik tetap terjaga.
            </p>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2">
                <FaShieldAlt /> Proses produksi higienis
              </li>
              <li className="flex items-center gap-2">
                <FaLeaf /> 100% bahan rempah alami
              </li>
              <li className="flex items-center gap-2">
                <FaHeart /> Rasa nikmat untuk keluarga
              </li>
              <li className="flex items-center gap-2">
                <FaClock /> Praktis & cepat diseduh
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* ====================== PRODUK FAVORIT ====================== */}
      <motion.section
        className="py-16 site-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
      >
        <motion.h2
          className={`text-4xl font-playfair font-bold text-center mb-10 ${
            theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
          }`}
          variants={itemVariants}
        >
          Koleksi Favorit
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favoriteProducts.map((p, idx) => (
            <Link key={p.id} to="/produk" aria-label={`Lihat ${p.title}`}>
              <TiltCard delay={idx * 0.08}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">{p.title}</h4>
                  <p className="text-sm">Rp {p.price.toLocaleString("id-ID")}</p>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ====================== STATISTIK ====================== */}
      <motion.section
        className="py-14 site-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
      >
        <div
          className={`rounded-2xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center ${
            theme === "dark" ? "bg-[#1f2a37]" : "bg-gray-100"
          }`}
        >
          <div>
            <CountUp to={2021} duration={1.1} className="text-3xl font-bold" grouping={false} />
            <p className="mt-1 text-sm opacity-80">Mulai berdiri</p>
          </div>
          <div>
            <CountUp to={12} duration={1.1} className="text-3xl font-bold" />
            <p className="mt-1 text-sm opacity-80">Varian jamu</p>
          </div>
          <div>
            <CountUp to={3500} duration={1.3} className="text-3xl font-bold" />
            <p className="mt-1 text-sm opacity-80">Pelanggan puas</p>
          </div>
          <div>
            <CountUp to={100} duration={1} suffix="%" className="text-3xl font-bold" />
            <p className="mt-1 text-sm opacity-80">Bahan alami</p>
          </div>
        </div>
      </motion.section>

      {/* ====================== QUOTE STRIP – Parallax Scroll ====================== */}
      <ParallaxStrip theme={theme} />

      {/* ====================== CTA – Parallax Mouse ====================== */}
      <motion.section
        className="py-20 text-center relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        onMouseMove={(e) => {
          if (prefersReducedMotion || isMobile) return;
          const r = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 20;
          e.currentTarget.style.setProperty("--ox", `${x}px`);
          e.currentTarget.style.setProperty("--oy", `${y}px`);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.setProperty("--ox", `0px`);
          e.currentTarget.style.setProperty("--oy", `0px`);
        }}
        style={{
          backgroundColor: theme === "dark" ? "#2a344a" : "#f5f5f5",
        }}
      >
        {!prefersReducedMotion && (
          <>
            <motion.img
              src="/assets/images/leaf_1.png"
              alt=""
              aria-hidden
              className="w-12 opacity-50 absolute left-[10%] top-[20%]"
              style={{ x: "var(--ox)", y: "var(--oy)" }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
              loading="lazy"
              decoding="async"
            />
            <motion.img
              src="/assets/images/leaf_2.png"
              alt=""
              aria-hidden
              className="w-10 opacity-50 absolute right-[8%] bottom-[18%]"
              style={{ x: "var(--ox)", y: "var(--oy)" }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
              loading="lazy"
              decoding="async"
            />
          </>
        )}

        <motion.h2
          className={`text-4xl font-playfair font-bold mb-6 ${
            theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
          }`}
          variants={itemVariants}
        >
          Mulai Hidup Sehat Sekarang
        </motion.h2>
        <motion.p
          className={`text-lg mb-8 max-w-xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
          variants={itemVariants}
        >
          Pesan jamu herbal kami dan rasakan manfaatnya untuk kesehatan Anda.
        </motion.p>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
        >
          <Link
            to="/produk"
            className="inline-flex items-center gap-2 bg-[var(--yumsert-green)] text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-[#14532d]"
          >
            Pesan Sekarang <FaArrowRight />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}

/* ======================
   Komponen Pendukung
   ====================== */

/* TiltCard — tilt 3D halus mengikuti kursor (EFEK #8) */
function TiltCard({ children, delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const onMove = (e) => {
    if (prefersReducedMotion || isMobile || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(clamp(-py * 8, -8, 8));
    ry.set(clamp(px * 10, -10, 10));
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-xl shadow-lg border bg-white/90 dark:bg-[#101826] dark:border-gray-800 cursor-pointer"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        transformStyle: "preserve-3d",
        rotateX: prefersReducedMotion ? 0 : rx,
        rotateY: prefersReducedMotion ? 0 : ry,
        willChange: "transform",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay, type: "spring", stiffness: 90, damping: 16 }}
    >
      {children}
    </motion.div>
  );
}

/* ParallaxStrip — background bergerak lambat saat scroll (EFEK #3) */
function ParallaxStrip({ theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <img
          src="/assets/images/rempah.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <div className="site-container text-center">
        <motion.blockquote
          className={`mx-auto max-w-3xl text-2xl md:text-3xl font-playfair ${
            theme === "dark" ? "text-white" : "text-[#1a1f2b]"
          }`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          “Sehat itu sederhana — kembali pada rempah, kembali pada alam.
          Sugih&nbsp;Waras hadir untuk menemani rutinitas sehatmu.”
        </motion.blockquote>
      </div>
    </section>
  );
}

export default Beranda;
