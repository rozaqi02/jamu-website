import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaLeaf } from "react-icons/fa";

function Kontak({ theme }) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [pesan, setPesan] = useState("");

  const whatsappNumber = "+6285745135415";
  const whatsappMessage = `Halo, saya ${nama} (${email}, ${telepon}):\nPesan: ${
    pesan || "Saya ingin tahu lebih banyak tentang Jamu Sugih Waras!"
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );
    setNama("");
    setEmail("");
    setTelepon("");
    setPesan("");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-[#1a1f2b] text-white" : "bg-white text-gray-800"
      } py-16 relative pt-24 font-poppins`}
    >
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex flex-col md:flex-row gap-12 justify-center">
          {/* Formulir Kontak (Kiri) */}
          <motion.div
            className="w-full md:w-1/2 lg:w-4/12 bg-[#0a3d2f] p-6 rounded-2xl shadow-lg text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Hubungi Kami</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full p-3 rounded-lg bg-transparent border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-transparent border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  placeholder="Masukkan email Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telepon</label>
                <input
                  type="tel"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  className="w-full p-3 rounded-lg bg-transparent border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Masukkan nomor telepon Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <textarea
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="w-full p-3 rounded-lg bg-transparent border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 h-28"
                  placeholder="Tulis pesan Anda..."
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-green-400 text-[#0a3d2f] py-3 rounded-lg font-semibold hover:bg-green-300 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kirim Pesan
              </motion.button>
            </form>
            <p className="mt-4 text-xs text-gray-300">
              Dengan menghubungi kami, Anda menyetujui{" "}
              <a href="#" className="underline text-green-400">
                Kebijakan Privasi
              </a>
            </p>
          </motion.div>

          {/* Informasi Kanan */}
          <motion.div
            className="w-full md:w-1/2 lg:w-7/12 p-6 flex flex-col justify-center"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-[#0a3d2f]">
              Tingkatkan Kesehatan Anda dengan <br /> Jamu Sugih Waras 🌿
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start space-x-3">
                <FaLeaf className="text-green-600 mt-1" />
                <p>Konsultasi langsung dengan tim kami untuk menemukan jamu yang cocok.</p>
              </li>
              <li className="flex items-start space-x-3">
                <FaLeaf className="text-green-600 mt-1" />
                <p>Paket harga ramah sesuai kebutuhan kesehatan Anda.</p>
              </li>
              <li className="flex items-start space-x-3">
                <FaLeaf className="text-green-600 mt-1" />
                <p>Dapatkan manfaat maksimal dari ramuan herbal alami.</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Kontak;
