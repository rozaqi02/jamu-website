import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('chatbotUsername') || '');
  const [showNameForm, setShowNameForm] = useState(!username);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    if (messages.length === 0 && !isOpen) {
      setMessages([{ text: showNameForm ? 'Halo! Silakan masukkan nama panggilanmu.' : `Halo ${username}! Selamat datang di Jakora Chat! Apa yang bisa aku bantu? 😊`, sender: 'bot' }]);
    }
  }, [isOpen, messages.length, username, showNameForm]);

  const handleSetUsername = (e) => {
    e.preventDefault();
    const newUsername = e.target.elements.name.value.trim();
    if (newUsername) {
      setUsername(newUsername);
      localStorage.setItem('chatbotUsername', newUsername);
      setShowNameForm(false);
      setMessages((prev) => [...prev, { text: `${newUsername}! Terima kasih, sekarang apa yang bisa aku bantu tentang Jakora? 🌱`, sender: 'bot' }]);
    }
  };

  const generateResponse = (inputText) => {
    const lowerInput = inputText.toLowerCase().trim();
    const userName = username || 'Teman Jakora';

    if (lowerInput.includes('halo') || lowerInput.includes('hai')) {
      const greetings = [
        `${userName}! Halo, selamat datang di Jakora Chat! Apa yang bisa aku bantu tentang produk jamur kami? 😊`,
        `${userName}! Hai, senang kamu ada di sini! Ingin tahu lebih tentang Jakora atau Jatastik? 🌱`,
        `${userName}! Halo bro, apa kabar? Mau info sehat dari produk kami? 🔥`,
        `${userName}! Hai teman, siap jelajahi kebaikan jamur Jakora? Aku bantu ya! 🎉`,
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    } else if (lowerInput.includes('terima kasih') || lowerInput.includes('makasih') || lowerInput.includes('thank you')) {
      return `${userName}! Sama-sama! 😊 Senang bisa membantu. Ada lagi tentang Jakora?`;
    } else if (lowerInput.includes('produk') || lowerInput.includes('jakora') || lowerInput.includes('jatastik')) {
      if (lowerInput.includes('harga')) {
        return `${userName}! 😊 Jakora mulai dari Rp 38.000, Jatastik Rp 12.000. Cek detail di halaman Produk ya!`;
      } else {
        return `${userName}! 🌱 Kami punya Jakora (rendang jamur) dan Jatastik (snack jamur). Lihat variasinya di halaman Produk!`;
      }
    } else if (lowerInput.includes('kontak') || lowerInput.includes('hubungi')) {
      return `${userName}! 📞 Hubungi kami via WhatsApp (+62 813-9154-6240) atau email info@jakora.id. Aku siap bantu! 😄`;
    } else {
      return `${userName}! Hmm, aku agak bingung nih 😅 Coba tanyakan tentang produk Jakora, kontak, atau info lainnya ya!`;
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
      {showWelcomeMessage && !isOpen && (
        <div
          id="welcomeMessages"
          dir="auto"
          style={{
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 'rgba(111, 111, 111, 0.2) 0px 10px 30px 0px, rgba(96, 96, 96, 0.2) 0px 0px 0px 1px',
            borderRadius: '10px',
            padding: '20px',
            margin: '8px',
            fontSize: '14px',
            opacity: 1,
            transform: 'scale(1)',
            transition: 'opacity 0.5s, transform 0.5s',
            position: 'fixed',
            bottom: '90px',
            cursor: 'pointer',
            zIndex: 2147483647,
            maxWidth: '400px',
            right: '20px',
            fontFamily: '"Segoe UI", "Segoe UI Emoji", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
          }}
          onClick={() => setIsOpen(true)}
        >
          Hai, Jakora Friend! Ada yang bisa kami bantu?
          <div
            id="welcomeMessagesCross"
            style={{
              backgroundColor: 'rgb(225, 225, 225)',
              width: '10px',
              height: '10px',
              color: 'black',
              boxShadow: 'rgba(111, 111, 111, 0.2) 0px 10px 30px 0px, rgba(96, 96, 96, 0.2) 0px 0px 0px 1px',
              borderRadius: '9999px',
              padding: '6px',
              margin: '8px',
              fontSize: '12px',
              transform: 'scale(1)',
              transition: 'opacity 0.5s, transform 0.5s',
              position: 'absolute',
              top: '-15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 500,
              border: '1px solid rgb(215, 215, 215)',
              cursor: 'pointer',
              zIndex: 2147483647,
              right: '-13px',
              opacity: 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowWelcomeMessage(false);
            }}
          >
            X
          </div>
        </div>
      )}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="bg-white rounded-lg shadow-xl w-[90%] max-w-md"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="flex justify-between items-center p-4 bg-[#4a704a] text-white rounded-t-lg">
              <span className="flex items-center gap-2"><img src="/assets/images/logo-chatbot.png" alt="Jakora Chat" className="w-8 h-8" /> Jakora Chat</span>
              <motion.button onClick={() => setIsOpen(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaTimes />
              </motion.button>
            </div>
            <div ref={chatContainerRef} className="p-4 h-80 overflow-y-auto space-y-2">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-[#4a704a] text-white self-end ml-auto' : 'bg-gray-100 text-gray-800 self-start mr-auto'} shadow-md glow`}
                    style={{ boxShadow: '0 0 10px rgba(74, 112, 74, 0.3)' }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {showNameForm ? (
              <form onSubmit={handleSetUsername} className="p-4 border-t border-gray-300 flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama panggilanmu"
                  className="p-2 border rounded-lg focus:outline-none"
                />
                <motion.button
                  type="submit"
                  className="bg-[#4a704a] text-white p-2 rounded-lg hover:bg-[#355e3b] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Simpan
                </motion.button>
              </form>
            ) : (
              <form onSubmit={sendMessage} className="flex border-t border-gray-300 p-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 p-3 border-none focus:outline-none rounded-l-lg"
                />
                <motion.button
                  type="submit"
                  className="bg-[#4a704a] text-white p-3 rounded-r-lg hover:bg-[#355e3b] transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Kirim
                </motion.button>
              </form>
            )}
          </motion.div>
        ) : (
          <motion.div className="relative">
            <motion.button
              className="bg-[#4a704a] text-white p-6 rounded-full shadow-lg hover:bg-[#355e3b]"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ backgroundImage: `url('/assets/images/logo-chatbot.png')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '60px', height: '60px' }}
            >
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;