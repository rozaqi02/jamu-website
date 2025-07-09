import { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const responses = {
  halo: 'Hai! Aku Jakora-bot. Ada yang bisa aku bantu?',
  produk: 'Kami punya dua produk: Jakora (rendang jamur) dan Jatastik (keripik jamur).',
  harga: 'Untuk harga silakan cek bagian produk, kami menyediakan info lengkap di sana.',
  jamur: 'Semua jajanan kami berbahan dasar jamur sawit yang bergizi!',
  vegan: 'Ya, semua produk kami 100% vegan dan halal.',
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    const botReply = {
      sender: 'bot',
      text:
        responses[input.toLowerCase()] ||
        'Maaf, aku belum paham itu. Coba kata kunci seperti "produk", "harga", atau "jamur".',
    };
    setMessages([...messages, userMessage, botReply]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80">
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <img src="/assets/images/logo-jakora2.png" alt="Bot" className="h-6 w-6" />
              <span className="font-semibold">Jakora-Bot</span>
            </div>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>
          <div className="p-3 h-64 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm p-2 rounded ${msg.sender === 'user' ? 'bg-orange-100 self-end text-right' : 'bg-blue-100 text-left'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-300">
            <input
              className="flex-grow p-2 text-sm border-none outline-none dark:bg-gray-800 dark:text-white"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="bg-blue-600 text-white px-4" onClick={sendMessage}>
              Kirim
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <FaRobot size={24} />
        </button>
      )}
    </div>
  );
}

export default ChatBot;
