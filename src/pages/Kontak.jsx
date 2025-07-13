import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';

function Kontak({ theme }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const whatsappNumber = '+6281391546240';
  const whatsappMessage = `Halo, saya ${name} (${email}):\nPesan: ${message || 'Silakan hubungi saya!'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1a1f2b] text-white' : 'bg-gray-100 text-gray-800'} py-16 relative pt-24`}>
      <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto px-4">
        <h2 className={`text-4xl font-bold text-center ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'} mb-12`}>Hubungi Kami</h2>
        <div className="bg-white dark:bg-[#2a344a] p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nama</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4a704a] dark:focus:ring-[#a3e4b7]" required title="Masukkan nama Anda" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4a704a] dark:focus:ring-[#a3e4b7]" required title="Masukkan email Anda" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pesan</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4a704a] dark:focus:ring-[#a3e4b7] h-32" placeholder="Tulis pesan Anda di sini..." title="Tulis pesan Anda" />
            </div>
            <motion.button type="submit" className="w-full bg-[#4a704a] text-white py-3 rounded-lg hover:bg-[#355e3b] dark:bg-[#a3e4b7] dark:hover:bg-[#7fd8a1] transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} title="Kirim pesan via WhatsApp">Kirim Pesan</motion.button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-base mb-2">Atau hubungi kami langsung:</p>
            <div className="flex justify-center space-x-6">
              <motion.a href="mailto:jakorafood@gmail.com" className="text-[#4a704a] dark:text-[#a3e4b7] hover:underline" whileHover={{ scale: 1.1 }} title="Kirim email ke Jakora"><FaEnvelope size={24} /></motion.a>
              <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-[#4a704a] dark:text-[#a3e4b7] hover:underline" whileHover={{ scale: 1.1 }} title="Hubungi via WhatsApp"><FaWhatsapp size={24} /></motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Kontak;