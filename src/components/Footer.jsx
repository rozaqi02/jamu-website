import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer({ theme }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const backgroundStyle = isMounted
    ? {
        background: theme === "dark"
          ? "linear-gradient(to right, #0f1c18, #1a2c24)"
          : "linear-gradient(to right, #14532d, #1a2c24)",
        transition: "background 0.5s ease",
      }
    : {};

  return (
    <footer
      className={`text-white font-[Poppins] ${
        theme === "dark" ? "text-gray-200" : "text-white"
      }`}
      style={backgroundStyle}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand & Tagline */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <img
                src="/assets/images/jamu.png"
                alt="Logo Jamu Sugih Waras"
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-xl font-bold">Jamu Sugih Waras</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Menjaga tradisi herbal Nusantara dengan sentuhan modern,
              menghadirkan kesehatan alami untuk semua generasi.
            </p>
          </motion.div>

          {/* Navigasi Cepat */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-green-300 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/produk"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-green-300 transition-colors"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  to="/kontak"
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-green-300 transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Kontak & Sosial */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Hubungi Kami
            </h3>
            <div className="flex flex-col space-y-3 text-sm">
              <a
                href="mailto:info@sugihwaras.com"
                className="flex items-center gap-2 hover:text-green-300 transition-colors"
              >
                <FaEnvelope /> info@sugihwaras.com
              </a>
              <a
                href="https://wa.me/6285745135415"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-300 transition-colors"
              >
                <FaWhatsapp /> +62 857 4513 5415
              </a>
              <a
                href="https://www.instagram.com/rumahrempahsugihwaras/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-300 transition-colors"
              >
                <FaInstagram /> @rumahrempahsugihwaras
              </a>
            </div>
          </motion.div>
        </div>

        {/* Garis + Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © 2025 Jamu Sugih Waras. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
