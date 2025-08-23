import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer({ theme }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #0f1c18, #1a2c24)"
            : "linear-gradient(135deg, #166534, #14532d)",
        transition: "background 1s ease-in-out, color 0.6s ease",
        position: "relative",
        overflow: "hidden",
      }
    : {};

  // Scroll smooth handler
  const smoothScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`text-white font-[Poppins] ${
        theme === "dark" ? "text-gray-200" : "text-white"
      }`}
      style={backgroundStyle}
    >
      {/* Wave animation background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-40 opacity-25"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            fill={theme === "dark" ? "#34d399" : "#bbf7d0"}
            fillOpacity="0.4"
            d="M0,128L60,133.3C120,139,240,149,360,170.7C480,192,600,224,720,224C840,224,960,192,1080,165.3C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </motion.svg>

        {/* Glowing Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 4 + "px",
              height: Math.random() * 6 + 4 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 1, 0.3],
              backgroundColor: [
                "rgba(34,197,94,0.8)", // green
                "rgba(250,204,21,0.8)", // yellow
                "rgba(249,115,22,0.8)", // orange
                "rgba(34,197,94,0.8)", // back to green
              ],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="max-w-7xl mx-auto px-6 py-16 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left divide-y md:divide-y-0 divide-gray-700 md:divide-none">
          {/* Brand & Tagline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <img
                src="/assets/images/logo-atas.png"
                alt="Logo Jamu Sugih Waras"
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-xl font-bold">Jamu Sugih Waras</h2>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Menjaga tradisi herbal Nusantara dengan sentuhan modern,
              menghadirkan kesehatan alami untuk semua generasi.
            </p>
          </motion.div>

          {/* Navigasi Cepat */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="pt-6 md:pt-0"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={smoothScrollTop}
                  className="hover:text-green-300 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/produk"
                  onClick={smoothScrollTop}
                  className="hover:text-green-300 transition-colors"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  to="/testimoni"
                  onClick={smoothScrollTop}
                  className="hover:text-green-300 transition-colors"
                >
                  Testimoni
                </Link>
              </li>
              <li>
                <Link
                  to="/donasi"
                  onClick={smoothScrollTop}
                  className="hover:text-green-300 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/kontak"
                  onClick={smoothScrollTop}
                  className="hover:text-green-300 transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Kontak & Sosial */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-6 md:pt-0"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Hubungi Kami
            </h3>
            <div className="flex flex-col space-y-3 text-sm">
              <a
                href="mailto:info@sugihwaras.com"
                className="flex items-center gap-2 hover:text-green-300 transition-colors"
                aria-label="Email Sugih Waras"
              >
                <FaEnvelope /> info@sugihwaras.com
              </a>
              <a
                href="https://wa.me/6285745135415"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-300 transition-colors"
                aria-label="Whatsapp Sugih Waras"
              >
                <FaWhatsapp /> +62 857 4513 5415
              </a>
              <a
                href="https://www.instagram.com/rumahrempahsugihwaras/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-300 transition-colors"
                aria-label="Instagram Sugih Waras"
              >
                <FaInstagram /> @rumahrempahsugihwaras
              </a>
              <p className="text-gray-300 mt-4 text-sm">
                📍 Kalisongo, Malang <br />
                🕒 Senin - Sabtu, 08.00 - 17.00
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ikon sosial bulat */}
        <motion.div
          className="flex justify-center md:justify-end gap-4 mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="https://wa.me/6285745135415"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whatsapp"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 transition"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:info@sugihwaras.com"
            aria-label="Email"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.instagram.com/rumahrempahsugihwaras/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 transition"
          >
            <FaInstagram />
          </a>
        </motion.div>

        {/* Garis + Copyright */}
        <motion.div
          className="border-t border-gray-700 mt-10 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-xs text-gray-400">
            © 2025 Jamu Sugih Waras. Hak cipta dilindungi.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
