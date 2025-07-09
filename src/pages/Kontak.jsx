import { motion } from 'framer-motion';
import { useState } from 'react';

function Kontak() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Nama: ${formData.name}%0AEmail: ${formData.email}%0APesan: ${formData.message}`;
    const waLink = `https://wa.me/6281391546240?text=${message}`;
    window.open(waLink, '_blank');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-green-700 mb-6">Hubungi Kami 📱</h2>
      <p className="text-lg mb-8 text-gray-700">
        Ada pertanyaan atau pesanan? Isi formulir di bawah ini!
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Anda"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Anda"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Pesan Anda"
              className="w-full p-2 border border-gray-300 rounded h-24"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Kirim via WhatsApp
          </motion.button>
        </form>
      </div>
      <div className="mt-8 text-gray-700">
        <p><strong>Alamat:</strong> Limau Manis, Kec. Pauh Kota Padang Sumatera Barat</p>
        <p><strong>Email:</strong> jakorafood@gmail.com</p>
        <p><strong>WA:</strong> ‪+62 813-9154-6240‬</p>
      </div>
    </section>
  );
}

export default Kontak;