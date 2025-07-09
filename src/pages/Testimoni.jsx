import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const testimonials = [
  { name: 'Ani', text: 'Rendang Jakora enak banget, vegan tapi rasanya kaya daging!', image: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Budi', text: 'Jatastik Spicy jadi camilan favorit keluarga!', image: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Cici', text: 'Suka banget sama konsep sustainability-nya!', image: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Dedi', text: 'Pengiriman cepat, produk segar!', image: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Eka', text: 'Rasa originalnya autentik, recommended!', image: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Fani', text: 'Harga worth it untuk kualitas ini!', image: 'https://i.pravatar.cc/150?img=6' },
  { name: 'Gani', text: 'Blackpaper unik, beda dari yang lain!', image: 'https://i.pravatar.cc/150?img=7' },
  { name: 'Hadi', text: 'Customer service ramah banget!', image: 'https://i.pravatar.cc/150?img=8' },
  { name: 'Indi', text: 'Diet jadi mudah dengan Jakora!', image: 'https://i.pravatar.cc/150?img=9' },
  { name: 'Joko', text: 'Jatastik Cheese creamy, suka!', image: 'https://i.pravatar.cc/150?img=10' },
  { name: 'Kiki', text: 'Packing rapi, sampai kondisi bagus!', image: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Lina', text: 'Suka banget sama tekstur jamurnya!', image: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Mira', text: 'Promo di IG bikin hemat!', image: 'https://i.pravatar.cc/150?img=13' },
  { name: 'Nico', text: 'Spicy-nya pas, nggak terlalu pedas!', image: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Oki', text: 'Produk lokal yang berkualitas!', image: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Pipi', text: 'Jakora cocok buat acara keluarga!', image: 'https://i.pravatar.cc/150?img=16' },
  { name: 'Qori', text: 'Sustainability-nya keren banget!', image: 'https://i.pravatar.cc/150?img=17' },
  { name: 'Rina', text: 'Rasa originalnya juara!', image: 'https://i.pravatar.cc/150?img=18' },
  { name: 'Sari', text: 'Jatastik renyah, nagih!', image: 'https://i.pravatar.cc/150?img=19' },
  { name: 'Toni', text: 'Harga terjangkau untuk vegan!', image: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Udin', text: 'Pengiriman on time, terima kasih!', image: 'https://i.pravatar.cc/150?img=21' },
  { name: 'Vina', text: 'Blackpaper jadi favorit aku!', image: 'https://i.pravatar.cc/150?img=22' },
  { name: 'Wawan', text: 'Kualitas jamur top notch!', image: 'https://i.pravatar.cc/150?img=23' },
  { name: 'Xena', text: 'Suka sama konsep green economy!', image: 'https://i.pravatar.cc/150?img=24' },
  { name: 'Yudi', text: 'Spicy-nya bikin ketagihan!', image: 'https://i.pravatar.cc/150?img=25' },
  { name: 'Zara', text: 'Jatastik Cheese enak banget!', image: 'https://i.pravatar.cc/150?img=26' },
  { name: 'Asep', text: 'Packing aman, sampai bagus!', image: 'https://i.pravatar.cc/150?img=27' },
  { name: 'Bela', text: 'Rasa autentik, suka!', image: 'https://i.pravatar.cc/150?img=28' },
  { name: 'Candra', text: 'Harga pas buat kualitas ini!', image: 'https://i.pravatar.cc/150?img=29' },
  { name: 'Dina', text: 'Suka banget sama Jakora!', image: 'https://i.pravatar.cc/150?img=30' },
];

function Testimoni({ theme, toggleTheme, cartItems, addToCart }) {
  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} cartItems={cartItems} />
      <main className="pt-16">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-[#4a704a] dark:text-[#a3e4b7] mb-8">Testimoni Pelanggan</h2>
          <div className="space-y-8">
            <div className="marquee-container overflow-hidden whitespace-nowrap">
              <motion.div
                className="marquee-content-left inline-flex space-x-6"
                animate={{ x: ['0%', '-100%'] }}
                transition={{ duration: 120, ease: 'linear', repeat: Infinity }} // Sangat lambat
              >
                {testimonials.slice(0, 15).map((testi, index) => (
                  <div key={index} className="marquee-item inline-flex items-center space-x-2">
                    <img src={testi.image} alt={testi.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className={theme === 'dark' ? 'text-white' : 'text-gray-600'}>{testi.text}</p>
                      <span className="text-sm text-[#4a704a] dark:text-[#a3e4b7]">{testi.name}</span>
                    </div>
                  </div>
                ))}
                {testimonials.slice(0, 15).map((testi, index) => (
                  <div key={`dup-${index}`} className="marquee-item inline-flex items-center space-x-2">
                    <img src={testi.image} alt={testi.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className={theme === 'dark' ? 'text-white' : 'text-gray-600'}>{testi.text}</p>
                      <span className="text-sm text-[#4a704a] dark:text-[#a3e4b7]">{testi.name}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="marquee-container overflow-hidden whitespace-nowrap">
              <motion.div
                className="marquee-content-right inline-flex space-x-6"
                animate={{ x: ['-100%', '0%'] }}
                transition={{ duration: 120, ease: 'linear', repeat: Infinity }} // Sangat lambat
              >
                {testimonials.slice(15, 30).map((testi, index) => (
                  <div key={index} className="marquee-item inline-flex items-center space-x-2">
                    <img src={testi.image} alt={testi.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className={theme === 'dark' ? 'text-white' : 'text-gray-600'}>{testi.text}</p>
                      <span className="text-sm text-[#4a704a] dark:text-[#a3e4b7]">{testi.name}</span>
                    </div>
                  </div>
                ))}
                {testimonials.slice(15, 30).map((testi, index) => (
                  <div key={`dup-${index}`} className="marquee-item inline-flex items-center space-x-2">
                    <img src={testi.image} alt={testi.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className={theme === 'dark' ? 'text-white' : 'text-gray-600'}>{testi.text}</p>
                      <span className="text-sm text-[#4a704a] dark:text-[#a3e4b7]">{testi.name}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}

export default Testimoni;