// src/components/ChatBot.jsx
import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(
    localStorage.getItem("chatbotUsername") || ""
  );
  const [showNameForm, setShowNameForm] = useState(!username);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    if (messages.length === 0) {
      setMessages([
        {
          text: showNameForm
            ? "Halo! Silakan masukkan nama panggilanmu."
            : `Halo ${username}! Selamat datang di Jamu Sugih Waras 🌱. Apa yang bisa aku bantu?`,
          sender: "bot",
        },
      ]);
    }
  }, [messages.length, showNameForm, username]);

  const handleSetUsername = (e) => {
    e.preventDefault();
    const newUsername = e.target.elements.name.value.trim();
    if (newUsername) {
      setUsername(newUsername);
      localStorage.setItem("chatbotUsername", newUsername);
      setShowNameForm(false);
      setMessages((prev) => [
        ...prev,
        {
          text: `${newUsername}, terima kasih! 🌿 Sekarang apa yang ingin kamu tanyakan?`,
          sender: "bot",
        },
      ]);
    }
  };

  const generateResponse = (inputText) => {
    const lower = inputText.toLowerCase().trim();
    const userName = username || "Teman";

    if (lower.includes("harga")) {
      return `Tentu ${userName}! 💰\n- Wedang Kekinian: Rp 25.000\n- Jamu Tradisional: Rp 15.000`;
    }
    if (lower.includes("varian")) {
      return `${userName}, berikut varian kami 🌱:\n🍵 Wedang: Blue Butterfly, Rosy, Turmeric\n🥤 Jamu: Kunyit Asam, Beras Kencur, Temulawak`;
    }
    if (lower.includes("order") || lower.includes("beli")) {
      return `Cara order ${userName}:\n1️⃣ Tambahkan produk ke keranjang\n2️⃣ Isi data checkout\n3️⃣ Transfer pembayaran ke BANK milik Jamu Sugih Waras\n4️⃣ Upload bukti di halaman konfirmasi pembayaran`;
    }
    if (lower.includes("hubungi") || lower.includes("admin")) {
      return `${userName}, kamu bisa hubungi admin langsung 📞 via WhatsApp:\n👉 wa.me/6285745135415`;
    }
    return `${userName}, aku siap bantu! 😊 Tanya seputar harga, varian, order, atau kontak admin.`;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const botResponse = { text: generateResponse(input), sender: "bot" };
    setTimeout(() => setMessages((prev) => [...prev, botResponse]), 500);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-30 font-[Poppins]">
      {/* Welcome Bubble */}
      {showWelcomeMessage && !isOpen && (
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
            padding: "14px",
            fontSize: "13px",
            position: "fixed",
            bottom: "85px",
            right: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            cursor: "pointer",
            maxWidth: "260px",
            lineHeight: "1.4",
          }}
          onClick={() => setIsOpen(true)}
        >
          Ada Pertanyaan?
          <div
            className="absolute -top-2 -right-2 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowWelcomeMessage(false);
            }}
          >
            ×
          </div>
        </div>
      )}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-[95%] max-w-sm flex flex-col max-h-[85vh] md:max-h-[70vh]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-[#22624a] text-white rounded-t-xl">
              <span className="flex items-center gap-2 font-semibold text-sm">
                <img
                  src="/assets/images/logo-chatbot.png"
                  alt="Sugih Waras Chat"
                  className="w-6 h-6 rounded-full"
                />
                Sugih Waras Chat
              </span>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Tutup"
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Chat Container */}
            <div
              ref={chatContainerRef}
              className="p-4 flex-1 overflow-y-auto space-y-3 text-sm bg-gray-50 dark:bg-gray-800"
            >
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-xl max-w-[80%] shadow-sm whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-[#22624a] text-white ml-auto"
                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 mr-auto"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input Section */}
            {showNameForm ? (
              <form
                onSubmit={handleSetUsername}
                className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama panggilanmu"
                  className="flex-1 p-2 border rounded text-sm bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none"
                />
                <motion.button
                  type="submit"
                  className="bg-[#22624a] text-white px-4 rounded text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Simpan
                </motion.button>
              </form>
            ) : (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                {/* Quick Options */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {["Daftar harga", "Varian produk", "Cara order", "Hubungi admin"].map(
                    (option, i) => (
                      <motion.button
                        key={i}
                        onClick={() => {
                          const userMessage = { text: option, sender: "user" };
                          setMessages((prev) => [...prev, userMessage]);
                          const botResponse = {
                            text: generateResponse(option),
                            sender: "bot",
                          };
                          setTimeout(
                            () => setMessages((prev) => [...prev, botResponse]),
                            300
                          );
                        }}
                        className="bg-[#22624a] text-white px-3 py-1.5 rounded-full text-xs hover:bg-[#14532d] transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option}
                      </motion.button>
                    )
                  )}
                </div>

                {/* Input Chat */}
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="flex-1 p-2 border rounded text-sm bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none"
                  />
                  <motion.button
                    type="submit"
                    className="bg-[#22624a] text-white px-4 rounded text-sm hover:bg-[#14532d]"
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
                backgroundColor: "#22624a",
                backgroundImage: `url('/assets/images/logo-chatbot.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label="Buka Chat"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;
