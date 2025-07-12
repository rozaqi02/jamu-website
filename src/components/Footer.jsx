import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa';

function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const whatsappNumber = '+6281391546240';
  const email = 'jakorafood@gmail.com';
  const mapsLink = 'https://maps.app.goo.gl/KdFpSD5uySJCUWSq9';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 86400000); // Update setiap hari
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: FaTiktok, href: 'https://www.tiktok.com/@jakoraofficial', label: 'Tiktok' },
    { icon: FaInstagram, href: 'https://www.instagram.com/jakoraofficial/', label: 'Instagram' },
    { icon: FaEnvelope, href: `mailto:${email}`, label: 'Email' },
    { icon: FaWhatsapp, href: `https://wa.me/${whatsappNumber}`, label: 'WhatsApp' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <footer className="bg-gradient-to-b from-[#4a704a] to-[#355e3b] text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'40\' fill=\'rgba(163, 228, 183, 0.1)\'/%3E%3C/svg%3E')] opacity-20" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo dan Deskripsi */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <motion.img
              src="/assets/images/logo-jakora2.png"
              alt="Jakora Logo"
              className="w-32 h-auto mb-4 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <p className="text-sm leading-relaxed">
              Jakora adalah kewirausahaan sosial berbasis jamur yang berkomitmen mewujudkan Green Economy dan Ecological Sustainability di Indonesia. Produk kami, Jakora dan Jatastik, menawarkan solusi sehat dan inovatif.
            </p>
          </motion.div>

          {/* Kontak dan Media Sosial */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-[#a3e4b7] pb-2">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 hover:text-[#a3e4b7] transition-colors duration-300"
                >
                  <FaEnvelope className="text-lg" />
                  <span>{email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="flex items-center gap-2 hover:text-[#a3e4b7] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>{whatsappNumber}</span>
                </a>
              </li>
              <li>
                <a
                  href={mapsLink}
                  className="flex items-center gap-2"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(mapsLink, '_blank');
                  }}
                >
                  <span
                    className={`text-sm ${isHovered ? 'text-blue-300' : 'text-white'} hover:text-blue-300 transition-colors duration-300`}
                  >
                    Alamat Usaha: Limau Manis, Kec. Pauh Kota Padang Sumatera Barat
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Produk dan Info */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-[#a3e4b7] pb-2">Tentang Produk</h3>
            <ul className="space-y-3">
              <li>
                <p className="text-sm">
                  <strong>Jakora:</strong> Rendang jamur inovatif yang mendukung ekonomi hijau dan keberlanjutan ekologi.
                </p>
              </li>
              <li>
                <p className="text-sm">
                  <strong>Jatastik:</strong> Snack jamur sehat yang kaya nutrisi, cocok untuk gaya hidup sehat.
                </p>
              </li>
              <li>
                <p className="text-sm">
                  Kami berkomitmen menghadirkan produk berbasis jamur untuk mendukung kesejahteraan masyarakat dan lingkungan.
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Media Sosial */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-[#a3e4b7] pb-2">Ikuti Kami</h3>
            <div className="flex flex-col space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-[#a3e4b7] transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="text-2xl" />
                  <span className="text-sm">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Seksi Tambahan: Misi dan Visi */}
        <motion.div
          className="mt-12 border-t border-[#a3e4b7]/30 pt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-2xl font-bold text-center mb-6">Misi & Visi Jakora</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="bg-[#355e3b]/50 p-6 rounded-lg shadow-lg" variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-2">Misi</h4>
              <p className="text-sm leading-relaxed">
                Mewujudkan kewirausahaan sosial berbasis jamur untuk mendukung ekonomi hijau, menyediakan produk sehat, dan meningkatkan kesejahteraan masyarakat lokal.
              </p>
            </motion.div>
            <motion.div className="bg-[#355e3b]/50 p-6 rounded-lg shadow-lg" variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-2">Visi</h4>
              <p className="text-sm leading-relaxed">
                Menjadi pelopor keberlanjutan ekologi melalui inovasi produk jamur yang ramah lingkungan dan berkualitas tinggi di Indonesia.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Seksi Tambahan: Informasi Lain */}
        <motion.div
          className="mt-12 border-t border-[#a3e4b7]/30 pt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-sm">
            © {currentYear} Jakora. Hak cipta dilindungi. Semua hak dilindungi undang-undang.
          </p>
          <p className="text-xs mt-2">
            Dibuat dengan ❤️ untuk komunitas dan lingkungan. Kunjungi kami untuk info lebih lanjut!
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;