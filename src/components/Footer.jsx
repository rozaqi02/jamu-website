import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-green-700 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h3 className="text-2xl font-bold mb-4">Jakora</h3>
          <p className="mb-4">Jajanan Vegan Berbasis Jamur</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <motion.a href="https://instagram.com" whileHover={{ scale: 1.2 }} className="text-white">
              <FaInstagram size={24} />
            </motion.a>
            <motion.a href="https://tiktok.com" whileHover={{ scale: 1.2 }} className="text-white">
              <FaTiktok size={24} />
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h4 className="text-lg font-semibold mb-2">Kontak Kami</h4>
          <p className="flex items-center justify-center gap-2 mb-2"><FaMapMarkerAlt /> Limau Manis, Kec. Pauh Kota Padang</p>
          <p className="flex items-center justify-center gap-2 mb-2"><FaEnvelope /> jakorafood@gmail.com</p>
          <p className="flex items-center justify-center gap-2"><FaPhone /> +62 813-9154-6240</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h4 className="text-lg font-semibold mb-2">Ikuti Kami</h4>
          <p className="mb-2">Dapatkan update terbaru dan promo eksklusif!</p>
          <motion.button
            className="bg-white text-green-700 px-4 py-2 rounded-full hover:bg-green-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Berlangganan
          </motion.button>
        </motion.div>
      </div>
      <div className="mt-8 text-center text-sm">
        <p>© 2025 Jakora. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;