// src/pages/Kontak.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

function Kontak({ theme }) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [pesan, setPesan] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber = "+6285745135415";
  const whatsappMessage = `Halo, saya ${nama} (${email}, ${telepon}):\nPesan: ${
    pesan || "Saya ingin tahu lebih banyak tentang Jamu Sugih Waras!"
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !email) {
      alert("Nama dan email wajib diisi.");
      return;
    }
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );

    setSubmitted(true);
    setNama("");
    setEmail("");
    setTelepon("");
    setPesan("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div
      className={`min-h-screen py-16 relative pt-24 font-[Poppins]`}
      style={{
        backgroundColor: theme === "dark" ? "#1a1f2b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        transition:
          "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease",
      }}
    >
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex flex-col md:flex-row gap-12 justify-center">
          {/* Formulir Kontak */}
          <motion.div
            className="w-full md:w-1/2 lg:w-4/12 bg-[#22624a] p-6 md:p-8 rounded-2xl shadow-lg text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Hubungi Kami</h2>
            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              <div>
                <label className="block mb-1">Nama</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white/70 transition-colors duration-300"
                  required
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white/70 transition-colors duration-300"
                  required
                  placeholder="Masukkan email Anda"
                />
              </div>
              <div>
                <label className="block mb-1">Telepon</label>
                <input
                  type="tel"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white/70 transition-colors duration-300"
                  placeholder="Masukkan nomor telepon Anda"
                />
              </div>
              <div>
                <label className="block mb-1">Pesan</label>
                <textarea
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white/70 h-28 transition-colors duration-300"
                  placeholder="Tulis pesan Anda..."
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-white text-[#22624a] py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp /> Hubungi via WhatsApp
              </motion.button>
            </form>
            {submitted && (
              <p className="mt-3 text-xs text-green-200 transition-colors duration-300">
                ✅ Pesan berhasil diarahkan ke WhatsApp, terima kasih!
              </p>
            )}
          </motion.div>

          {/* Informasi */}
          <motion.div
            className="w-full md:w-1/2 lg:w-7/12 p-4 md:p-6 flex flex-col justify-between transition-colors duration-300"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <h3
                className={`text-2xl md:text-3xl font-bold mb-6 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
                }`}
              >
                Tingkatkan Kesehatan Anda dengan <br />
                <span
                  className={`transition-colors duration-300 ${
                    theme === "dark" ? "text-emerald-300" : "text-green-700"
                  }`}
                >
                  Jamu Sugih Waras 🌿
                </span>
              </h3>

              <ul
                className={`space-y-4 text-sm md:text-base transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <li className="flex items-start space-x-3">
                  <FaLeaf
                    className={`mt-1 transition-colors duration-300 ${
                      theme === "dark" ? "text-emerald-300" : "text-green-600"
                    }`}
                  />
                  <p>
                    Konsultasi langsung dengan tim kami untuk menemukan jamu
                    yang cocok.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <FaLeaf
                    className={`mt-1 transition-colors duration-300 ${
                      theme === "dark" ? "text-emerald-300" : "text-green-600"
                    }`}
                  />
                  <p>Paket harga ramah sesuai kebutuhan kesehatan Anda.</p>
                </li>
                <li className="flex items-start space-x-3">
                  <FaLeaf
                    className={`mt-1 transition-colors duration-300 ${
                      theme === "dark" ? "text-emerald-300" : "text-green-600"
                    }`}
                  />
                  <p>Dapatkan manfaat maksimal dari ramuan herbal alami.</p>
                </li>
              </ul>

              <div
                className={`mt-8 text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <p>📍 Alamat: Kalisongo, Malang</p>
                <p>📧 Email: info@sugihwaras.com</p>
              </div>
            </div>

            {/* Maps Embed dengan Marker Animasi */}
            <div className="relative mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] h-56 transition-colors duration-300">
              <iframe
                title="Lokasi Sugih Waras"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6285900855654!2d112.5861827!3d-7.9396367999999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e789eab3b13c61b%3A0x9c42f7d15bf6ab0!2sKalisongo%2C%20Malang!5e0!3m2!1sid!2sid!4v1734477111111!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Marker Animasi */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-red-600 text-3xl drop-shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaMapMarkerAlt />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Kontak;
