import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

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
];

function Testimoni({ theme, toggleTheme }) {
  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-16">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 max-w-7xl mx-auto"
        >
          <h2 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'} mb-8 animate-fadeIn`}>Testimoni Pelanggan</h2>
          <div className="space-y-8">
            <div className="marquee-container overflow-hidden whitespace-nowrap">
              <motion.div
                className="marquee-content-left inline-flex space-x-6"
                animate={{ x: ['0%', '-100%'] }}
                transition={{ duration: 480, ease: 'linear', repeat: Infinity }}
              >
                {testimonials.slice(0, 8).map((testi, index) => (
                  <div key={index} className="marquee-item inline-flex items-center space-x-2">
                    <img src={testi.image} alt={testi.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{testi.text}</p>
                      <span className={`text-sm ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>{testi.name}</span>
                    </div>
                  </div>
                ))}
                {testimonials.slice(0, 8).map((testi, index) => (
                  <div key={`dup-${index}`} className="marquee-item inline-flex items-center space-x-2">
                    <img src={testi.image} alt={testi.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{testi.text}</p>
                      <span className={`text-sm ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>{testi.name}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="marquee-container overflow-hidden whitespace-nowrap">
              <motion.div
                className="marquee-content-right inline-flex space-x-6"
                animate={{ x: ['-100%', '0%'] }}
                transition={{ duration: 480, ease: 'linear', repeat: Infinity }}
              >
                {testimonials.slice(8, 15).map((testi, index) => (
                  <div key={index} className="marquee-item inline-flex items-center space-x-2">
                    <img src={testi.image} alt={testi.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{testi.text}</p>
                      <span className={`text-sm ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>{testi.name}</span>
                    </div>
                  </div>
                ))}
                {testimonials.slice(8, 15).map((testi, index) => (
                  <div key={`dup-${index}`} className="marquee-item inline-flex items-center space-x-2">
                    <img src={testi.image} alt={testi.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{testi.text}</p>
                      <span className={`text-sm ${theme === 'dark' ? 'text-[#a3e4b7]' : 'text-[#4a704a]'}`}>{testi.name}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Testimoni;