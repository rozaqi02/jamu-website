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
  const [quickOptions] = useState([]);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    if (messages.length === 0 && !isOpen) {
      setMessages([
        {
          text: showNameForm
            ? 'Halo! Silakan masukkan nama panggilanmu.'
            : `Halo ${username}! Selamat datang di Jamu Sugih Waras Chat! Apa yang bisa aku bantu? 😊`,
          sender: 'bot',
        },
      ]);
    }
  }, [isOpen, messages.length, username, showNameForm]);

  const handleSetUsername = (e) => {
    e.preventDefault();
    const newUsername = e.target.elements.name.value.trim();
    if (newUsername) {
      setUsername(newUsername);
      localStorage.setItem('chatbotUsername', newUsername);
      setShowNameForm(false);
      setMessages((prev) => [
        ...prev,
        {
          text: `${newUsername}! Terima kasih, sekarang apa yang bisa aku bantu tentang Jamu Sugih Waras? 🌱`,
          sender: 'bot',
        },
      ]);
    }
  };

  const handleQuickOption = (option) => {
    setInput(option);
    setTimeout(() => {
      sendMessage({ preventDefault: () => {} });
    }, 100);
  };

  const generateResponse = (inputText) => {
    const lowerInput = inputText.toLowerCase().trim();
    const userName = username || 'Teman Sugih Waras';

    if (lowerInput.includes('harga')) {
      return `${userName}! 🌱 Wedang Kekinian Rp 25.000, Jamu Tradisional Rp 15.000.`;
    } else if (lowerInput.includes('hubungi') || lowerInput.includes('kontak')) {
      return `${userName}! 📞 Hubungi kami via WhatsApp (+62 857-4513-5415) atau email info@sugihwaras.com.`;
    } else if (lowerInput.includes('varian')) {
      return `${userName}! 🌱 Wedang: Blue Butterfly, Rosy, Turmeric. Jamu: Kunyit Asam, Beras Kencur, Temulawak.`;
    } else {
      return `${userName}! 😊 Aku siap bantu, silakan tanya seputar Jamu Sugih Waras.`;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const botResponse = { text: generateResponse(input), sender: 'bot' };
    setTimeout(() => setMessages((prev) => [...prev, botResponse]), 400);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-[Poppins]">
      {/* Welcome Bubble */}
      {showWelcomeMessage && !isOpen && (
        <div
          style={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '10px',
            padding: '14px',
            fontSize: '13px',
            position: 'fixed',
            bottom: '85px',
            right: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            maxWidth: '260px',
            lineHeight: '1.4',
          }}
          onClick={() => setIsOpen(true)}
        >
          Hai! Ada yang bisa kami bantu?
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: '#eee',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
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
            className="bg-white rounded-lg shadow-xl w-[95%] max-w-sm"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 bg-[#22624a] text-white rounded-t-lg text-sm">
              <span className="flex items-center gap-2 font-semibold">
                <img
                  src="/assets/images/logo-chatbot.png"
                  alt="Sugih Waras Chat"
                  className="w-6 h-6"
                />
                Sugih Waras Chat
              </span>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Chat Container */}
            <div
              ref={chatContainerRef}
              className="p-3 h-64 md:h-96 overflow-y-auto space-y-2 text-sm"
            >
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-2 rounded-lg max-w-[75%] ${
                      msg.sender === 'user'
                        ? 'bg-[#22624a] text-white ml-auto'
                        : 'bg-gray-100 text-gray-800 mr-auto'
                    } shadow`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Form Nama atau Input Chat */}
            {showNameForm ? (
              <form
                onSubmit={handleSetUsername}
                className="p-3 border-t border-gray-200 flex flex-col gap-2"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama panggilanmu"
                  className="p-2 border rounded focus:outline-none text-sm"
                />
                <motion.button
                  type="submit"
                  className="bg-[#22624a] text-white py-2 rounded hover:bg-[#1a3a2a] text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Simpan
                </motion.button>
              </form>
            ) : (
              <div className="p-2">
                {/* Quick Options */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {quickOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickOption(option)}
                      className="bg-[#22624a] text-white px-3 py-1 rounded-full text-xs hover:bg-[#1a3a2a] transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {/* Input Chat */}
                <form
                  onSubmit={sendMessage}
                  className="flex border-t border-gray-200 p-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="flex-1 p-2 border rounded-l text-sm focus:outline-none"
                  />
                  <motion.button
                    type="submit"
                    className="bg-[#22624a] text-white px-4 rounded-r hover:bg-[#1a3a2a] text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Kirim
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div className="relative">
            <motion.button
              className="rounded-full shadow-lg w-12 h-12 md:w-14 md:h-14"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: '#22624a',
                backgroundImage: `url('/assets/images/logo-chatbot.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;
