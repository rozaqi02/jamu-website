import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa'; // Tambahkan impor FaRobot
import { motion, AnimatePresence } from 'framer-motion';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);
  const userName = 'Pengguna'; // Bisa diganti dengan nama pengguna yang sesungguhnya jika ada autentikasi

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (inputText) => {
    const lowerInput = inputText.toLowerCase().trim();
    if (lowerInput.includes('tas') || lowerInput.includes('bahan')) {
      if (lowerInput.includes('harga')) {
        return `${userName}! 😊 Tas atau bahan craft kami mulai dari Rp 80.000, tergantung desain dan material. Mau cek koleksi di toko atau custom? Aku bantu pilih yang kece buat kamu! 🎨`;
      } else if (lowerInput.includes('kustom')) {
        return `${userName}! 🔥 Kustom tas seru banget! Kamu bisa pilih warna, bahan, sama aksesori di halaman Kustomisasi. Mau aku bantu desain yang unik buat kamu? 😎`;
      } else {
        return `${userName}! 👜 Kami punya banyak tas handmade dan bahan craft kece. Cek di halaman Toko atau Instagram @izzalia.id ya! Ada yang kamu suka?`;
      }
    } else if (lowerInput.includes('tutorial') || lowerInput.includes('belajar')) {
      return `${userName}! 🎉 Tutorial craft ada di halaman Tutorial. Mulai dari jahit tas sederhana sampe proyek kreatif. Mau aku kasih tips spesial? 😄`;
    } else if (lowerInput.includes('pesan') || lowerInput.includes('beli')) {
      return `${userName}! 🛒 Yuk, pesen via WhatsApp (+62 852-3202-9768). Kasih tahu aku detailnya (warna, ukuran), aku bantu prosesin cepet! 🚀`;
    } else if (lowerInput.includes('kontak') || lowerInput.includes('hubungi')) {
      return `${userName}! 📞 Hubungi aku via WhatsApp (+62 852-3202-9768) atau cek Instagram @izzalia.id. Aku siap bantu 24/7! 😄`;
    } else if (lowerInput.includes('terima kasih') || lowerInput.includes('makasih')) {
      return `${userName}! Sama-sama! 😊 Seneng banget bisa bantu. Ada lagi yang mau ditanyain?`;
    } else {
      return `${userName}! Hmm, aku agak bingung nih 😅 Maksud kamu apa ya? Coba ceritain lebih detail, aku bantu sebisanya! 🌟`;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const botResponse = { text: generateResponse(input), sender: 'bot' };
    setTimeout(() => setMessages((prev) => [...prev, botResponse]), 500);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="bg-white rounded-lg shadow-xl w-80"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="flex justify-between items-center p-3 bg-[#4a704a] text-white rounded-t-lg">
              <span className="flex items-center gap-2"><FaRobot /> Grok Bot</span>
              <motion.button onClick={() => setIsOpen(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaTimes />
              </motion.button>
            </div>
            <div ref={chatContainerRef} className="p-3 h-64 overflow-y-auto space-y-2">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm p-2 rounded max-w-[80%] ${msg.sender === 'user' ? 'bg-[#4a704a] self-end ml-auto' : 'bg-gray-100 self-start mr-auto'}`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <form onSubmit={sendMessage} className="flex border-t border-gray-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 p-2 border-none focus:outline-none"
              />
              <button type="submit" className="p-2 bg-[#4a704a] text-white">
                Kirim
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            className="bg-[#4a704a] text-white p-4 rounded-full shadow-lg hover:bg-[#355e3b]"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ backgroundImage: `url('/assets/images/logo-chatbot.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Placeholder kosong agar gambar muncul sebagai latar belakang */}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;