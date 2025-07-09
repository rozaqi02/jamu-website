import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h3 className="text-2xl font-bold">Jakora</h3>
          <p className="mt-2">Jajanan Vegan Berbasis Jamur</p>
          <div className="mt-4 flex justify-center space-x-4">
            <motion.a href="https://instagram.com" whileHover={{ scale: 1.2 }}>
              <FaInstagram size={24} />
            </motion.a>
            <motion.a href="https://tiktok.com" whileHover={{ scale: 1.2 }}>
              <FaTiktok size={24} />
            </motion.a>
          </div>
          <p className="mt-4 text-sm">© 2025 Jakora. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;