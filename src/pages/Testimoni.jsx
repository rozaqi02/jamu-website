import { useState, useEffect, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

/* ===== Util kecil & aksesibilitas ===== */
function useIsMobile(bp = 768) {
  const [m, setM] = useState(
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const onR = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [bp]);
  return m;
}
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* ===== Data contoh (boleh kamu ganti dari DB) ===== */
const TESTIMONIALS = [
  { name: "Ani S.", city: "Malang", text: "Jamu ini bikin badan saya lebih segar, rasanya juga enak!", rating: 5, product: "Wedang Imun" },
  { name: "Budi P.", city: "Sidoarjo", text: "Latte rempahnya juara, bantu banget buat rileks pas malam.", rating: 4, product: "Turmeric Creamy Latte" },
  { name: "Citra L.", city: "Bandung", text: "Anak saya jarang sakit setelah minum, mantap!", rating: 5, product: "Wedang Imun" },
  { name: "Dedi R.", city: "Surabaya", text: "Teh rempahnya bikin hati tenang dan badan fit!", rating: 4, product: "Teh Rempah" },
  { name: "Eka T.", city: "Yogyakarta", text: "Beras kencur favorit keluarga. Stamina naik!", rating: 5, product: "Beras Kencur Premium" },
  { name: "Fani M.", city: "Jakarta", text: "Wedang secang bikin badan hangat & enteng.", rating: 4, product: "Wedang Secang" },
  { name: "Gina H.", city: "Malang", text: "Latte kunyitnya enak, kulit terasa lebih cerah!", rating: 5, product: "Turmeric Creamy Latte" },
  { name: "Hadi K.", city: "Denpasar", text: "Rasa autentik dan bikin sehat, recommended!", rating: 5, product: "Teh Rempah" },
  { name: "Indah Y.", city: "Semarang", text: "Blue butterfly latte unik, cocok saat stres.", rating: 4, product: "Blue Butterfly Latte" },
];

function Testimoni({ theme }) {
  const isMobile = useIsMobile(768);
  const prefersReducedMotion = useReducedMotion();

  /* ====== HERO PARALLAX (Efek #1, #2, #8) ====== */
  const heroRef = useRef(null);
  const mx = useMotionValue(0); // -1 .. 1
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 90, damping: 18 });
  const smy = useSpring(my, { stiffness: 90, damping: 18 });

  // desktop: dari pointer dalam hero; mobile: device tilt; fallback: scroll.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      mx.set(clamp(x * 2, -1, 1));
      my.set(clamp(y * 2, -1, 1));
    };

    // device tilt (iOS/Android) — tidak semua browser mengizinkan
    let tiltHandler;
    if (isMobile && typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      tiltHandler = (ev) => {
        const gx = (ev.gamma || 0) / 30;   // -90..90 → ~-3..3 → clamp
        const by = (ev.beta || 0) / 45;    // -180..180 → ~-4..4
        mx.set(clamp(gx, -1, 1));
        my.set(clamp(by, -1, 1));
      };
      window.addEventListener("deviceorientation", tiltHandler, true);
    }

    // pointer hanya di desktop
    if (!isMobile) el.addEventListener("mousemove", onMove);

    return () => {
      if (!isMobile) el.removeEventListener("mousemove", onMove);
      if (tiltHandler) window.removeEventListener("deviceorientation", tiltHandler, true);
    };
  }, [isMobile, mx, my]);

  // layer parallax (3 lapis)
  const l1x = useTransform(smx, (v) => v * -30);
  const l1y = useTransform(smy, (v) => v * -24);
  const l2x = useTransform(smx, (v) => v * 20);
  const l2y = useTransform(smy, (v) => v * 18);
  const l3x = useTransform(smx, (v) => v * -12);
  const l3y = useTransform(smy, (v) => v * 10);

  // glow aura (Efek #2)
  const auraX = useTransform(smx, (v) => `${50 + v * 8}%`);
  const auraY = useTransform(smy, (v) => `${50 + v * 10}%`);

  /* ====== SCROLL PARALLAX STRIP (Efek #3) ====== */
  const stripRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });
  const stripY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  /* ====== Carousel state (Efek #5, #6) ====== */
  const perPage = 3;
  const pages = Math.ceil(TESTIMONIALS.length / perPage);
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0); // 0..100
  const [paused, setPaused] = useState(false);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { amount: 0.4 });

  // autoplay + progress
  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPage((pg) => (pg + 1) % pages);
          return 0;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(t);
  }, [paused, inView, pages]);

  // swipe (mobile)
  useEffect(() => {
    let startX = 0;
    const el = inViewRef.current;
    if (!el) return;
    const onTouchStart = (e) => (startX = e.changedTouches[0].clientX);
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      setPage((pg) => (dx < 0 ? (pg + 1) % pages : (pg - 1 + pages) % pages));
      setProgress(0);
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [pages]);

  /* ====== Stats ringkas untuk hero ====== */
  const avg = useMemo(() => {
    const s = TESTIMONIALS.reduce((a, b) => a + b.rating, 0);
    return (s / TESTIMONIALS.length).toFixed(1);
  }, []);

  const smooth = "background-color .5s ease, color .5s ease, border-color .5s ease, box-shadow .5s ease";

  return (
    <div
      className={`min-h-screen pt-24 font-poppins ${theme === "dark" ? "text-white" : "text-gray-800"}`}
      style={{ transition: smooth, backgroundColor: theme === "dark" ? "#111826" : "#ffffff" }}
    >
      {/* ===== HERO with Parallax (Efek #1, #2, #8) ===== */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Layer 1: big gradient blob */}
        <motion.div
          style={{ x: l1x, y: l1y }}
          className="pointer-events-none absolute -top-32 -left-24 w-[620px] h-[620px] rounded-full blur-3xl opacity-25"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                theme === "dark"
                  ? "conic-gradient(from 40deg, rgba(163,228,183,.18), transparent 40%)"
                  : "conic-gradient(from 40deg, rgba(34,98,74,.14), transparent 40%)",
              transition: smooth,
            }}
          />
        </motion.div>

        {/* Layer 2: dots glow follows pointer */}
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute w-[420px] h-[420px] rounded-full blur-2xl opacity-25"
            style={{
              left: auraX,
              top: auraY,
              translateX: "-50%",
              translateY: "-50%",
              background:
                theme === "dark"
                  ? "radial-gradient(circle at center, rgba(163,228,183,.35), transparent 60%)"
                  : "radial-gradient(circle at center, rgba(34,98,74,.25), transparent 60%)",
              transition: smooth,
            }}
          />
        )}

        {/* Layer 3: subtle ring */}
        <motion.div
          style={{ x: l3x, y: l3y }}
          className="pointer-events-none absolute -bottom-20 -right-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-20"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                theme === "dark"
                  ? "conic-gradient(from 180deg, rgba(163,228,183,.14), transparent 40%)"
                  : "conic-gradient(from 180deg, rgba(34,98,74,.12), transparent 40%)",
              transition: smooth,
            }}
          />
        </motion.div>

        <div className="site-container relative py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.h1
  className="headline-shimmer font-playfair font-extrabold text-[2.1rem] md:text-5xl leading-[1.15]"
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  style={{ animation: prefersReducedMotion ? "none" : undefined }}
>
  Cerita Nyata Pelanggan
  <br /> Jamu Sugih Waras
</motion.h1>

              <style>{`@keyframes shimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}`}</style>

              <p
                className={`mt-3 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                style={{ transition: smooth }}
              >
                Rangkuman pengalaman asli pengguna: rasa, manfaat, dan momen favorit mereka.
              </p>

              {/* mini stats */}
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="px-4 py-2 rounded-xl border" style={{ transition: smooth, borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">{avg}</span> / 5 ⭐ rata-rata
                </div>
                <div className="px-4 py-2 rounded-xl border" style={{ transition: smooth, borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}>
                  {TESTIMONIALS.length}+ ulasan terkurasi
                </div>
              </div>
            </div>

            {/* Magnetic CTA (Efek #8) */}
            <motion.div
              className="lg:col-span-5 flex justify-center lg:justify-end"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
            >
              <motion.div
                className="rounded-2xl px-6 py-4 border shadow-md cursor-pointer select-none"
                style={{
                  transition: smooth,
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                }}
                onMouseMove={(e) => {
                  if (prefersReducedMotion) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - (r.left + r.width / 2);
                  const y = e.clientY - (r.top + r.height / 2);
                  e.currentTarget.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
                }}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translate(0,0)")}
              >
                <div className="flex items-center gap-3">
                  <FaQuoteLeft className="text-2xl text-emerald-600 dark:text-emerald-300" />
                  <div>
                    <div className="font-semibold">Bagikan pengalamanmu</div>
                    <div className="text-sm opacity-80">Ulasanmu membantu pelanggan lain.</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE micro quotes (Efek #9) ===== */}
      <section className="py-4 overflow-hidden">
        <div className="site-container">
          <div className="marquee-container">
            <div className="marquee-content-left">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={`mq1-${i}`} className="marquee-item text-xs md:text-sm">
                  <div className="px-3 py-1 rounded-full border"
                       style={{ borderColor: theme === "dark" ? "#374151" : "#d1d5db", transition: smooth }}>
                    “{t.text.split(".")[0]}…”
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STRIP PARALLAX (Efek #3) ===== */}
      <section ref={stripRef} className="relative py-16 overflow-hidden">
        <motion.div style={{ y: stripY }} className="absolute inset-0 -z-10">
          <img
            src="/assets/images/rempah.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <div className="site-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl font-playfair"
          >
            “Sehat itu sederhana — kembali pada rempah, kembali pada alam.”
          </motion.p>
        </div>
      </section>

      {/* ===== CAROUSEL Testimoni (Efek #4, #5, #6, #7) ===== */}
      <section ref={inViewRef} className="site-container pb-20">
        {/* pager */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm opacity-80">Halaman {page + 1}/{pages}</div>
          <div className="flex gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i); setProgress(0); }}
                className={`w-2.5 h-2.5 rounded-full ${i === page ? "bg-emerald-600" : "bg-gray-400 dark:bg-gray-600"}`}
                aria-label={`Ke halaman ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* progress */}
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-emerald-600 dark:bg-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {TESTIMONIALS.slice(page * perPage, page * perPage + perPage).map((t, idx) => (
                <TiltCard key={`${t.name}-${idx}`} theme={theme}>
                  <TestimonialCard t={t} theme={theme} />
                </TiltCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

/* ====== KOMONEN: Card Testimoni (Efek #4 tilt via parent) ====== */
function TestimonialCard({ t, theme }) {
  const smooth = "background-color .5s ease, color .5s ease, border-color .5s ease, box-shadow .5s ease";
  return (
    <div
      className="relative p-5 rounded-2xl border shadow-sm h-full"
      style={{
        transition: smooth,
        backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
      }}
    >
      <FaQuoteLeft className="text-xl text-emerald-600 dark:text-emerald-300 mb-3" />
      <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-200" : "text-gray-600"}`}>
        {t.text}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">{t.name}</div>
          <div className="text-xs opacity-75">{t.city} • {t.product}</div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className={`text-sm ${i < t.rating ? "text-emerald-500" : "text-gray-400 dark:text-gray-600"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ====== KOMONEN: Tilt 3D (Efek #4) ====== */
function TiltCard({ children, theme }) {
  const isMobile = useIsMobile(768);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      if (prefersReducedMotion) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx.set(clamp(-py * 10, -10, 10));
      ry.set(clamp(px * 12, -12, 12));
    };
    const reset = () => { rx.set(0); ry.set(0); };

    if (!isMobile) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", reset);
    }

    // fallback mobile: sedikit tilt saat scroll
    let scrollCb;
    if (isMobile) {
      scrollCb = () => {
        const y = window.scrollY % 30;
        rx.set((y - 15) * 0.2);
        ry.set(((y - 15) * -0.2));
      };
      window.addEventListener("scroll", scrollCb, { passive: true });
    }

    return () => {
      if (!isMobile) {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", reset);
      }
      if (scrollCb) window.removeEventListener("scroll", scrollCb);
    };
  }, [isMobile, prefersReducedMotion, rx, ry]);

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ transformStyle: "preserve-3d", rotateX: rx, rotateY: ry }}
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
    >
      {children}
    </motion.div>
  );
}

export default Testimoni;
