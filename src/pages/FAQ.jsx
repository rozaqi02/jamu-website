import { useLanguage } from '../context/LanguageContext';

const faqs = [
  {
    q: 'Berapa lama masa simpan Jakora dan Jatastik?',
    a: 'Simpen di suhu ruang dan hindari sinar matahari langsung. Bisa tahan 1-2 minggu.',
  },
  {
    q: 'Apakah produk vegan?',
    a: '100% vegan. Bebas daging dan bahan hewani.',
  },
  {
    q: 'Bisa request varian khusus?',
    a: 'Untuk saat ini belum bisa, tapi segera hadir custom mix!',
  },
  {
    q: 'Bagaimana pengiriman?',
    a: 'Kami kirim dari Padang. Estimasi 1-3 hari tergantung lokasi.',
  },
];

function FAQ() {
  const { language } = useLanguage();
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
        {language === 'id' ? 'Pertanyaan Umum ❓' : 'Frequently Asked Questions ❓'}
      </h2>
      <ul className="space-y-6">
        {faqs.map((item, idx) => (
          <li key={idx} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="font-semibold text-blue-600 dark:text-white text-lg mb-2">{item.q}</h3>
            <p className="text-gray-700 dark:text-gray-300">{item.a}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FAQ;