import { FaEnvelope, FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#4a704a] text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="mailto:jakora@example.com" className="hover:text-[#a3e4b7] transition-colors duration-300">
            <FaEnvelope size={24} />
          </a>
          <a href="https://wa.me/6281391546240" className="hover:text-[#a3e4b7] transition-colors duration-300">
            <FaWhatsapp size={24} />
          </a>
          <a href="https://www.tiktok.com/@jakoraofficial" className="hover:text-[#a3e4b7] transition-colors duration-300">
            <FaTiktok size={24} />
          </a>
          <a href="https://www.instagram.com/jakoraofficial/" className="hover:text-[#a3e4b7] transition-colors duration-300">
            <FaInstagram size={24} />
          </a>
        </div>
        <p className="text-sm mt-4">
          <a href="https://maps.app.goo.gl/KdFpSD5uySJCUWSq9" className="hover:text-[#a3e4b7] transition-colors duration-300">
            Alamat Usaha: Limau Manis, Kec. Pauh Kota Padang Sumatera Barat
          </a>
        </p>
        <p className="text-sm mt-2">&copy; 2025 Jakora. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;