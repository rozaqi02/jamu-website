// src/pages/Produk.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";

function Produk({ theme }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Wedang Rempah");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [dataByCat, setDataByCat] = useState({});
  const [loading, setLoading] = useState(true);

  const toNum = (v) => Number(v ?? 0);

  // Ambil produk dari Supabase & kelompokkan per kategori
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);

      // ⬇️ DEBUG: panggilan ke Supabase + console.log hasilnya
      const { data, error } = await supabase
        .from("products")
        .select("id,name,price,stock,category,description,image_url")
        .order("name", { ascending: true });

      // 👉 INI LOG YANG KAMU MINTA
      console.log("Supabase products:", {
        error,
        rows: data?.length,
        sample: data?.[0],
      });

      if (error) {
        console.error("Supabase error saat ambil products:", error);
        setLoading(false);
        return;
      }
      if (!mounted) return;

      const grouped = (data || []).reduce((acc, p) => {
        const cat = p?.category ?? "Tanpa Kategori";
        (acc[cat] = acc[cat] || []).push(p);
        return acc;
      }, {});
      setDataByCat(grouped);

      const cats = Object.keys(grouped);
      if (cats.length && !grouped[activeCategory]) setActiveCategory(cats[0]);

      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mouse parallax blur
  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Transisi background mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "#1a1f2b" : "white",
        transition: "background-color 0.3s ease",
      }
    : {};

  const products = dataByCat;
  const filteredProducts = products[activeCategory]
    ? products[activeCategory].filter((p) =>
        (p?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } overflow-hidden relative pt-16`}
      style={backgroundStyle}
    >
      {/* Efek background blur mengikuti mouse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-[#22624a]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            opacity: 0.5,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        className="py-20 px-6 max-w-6xl mx-auto relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Judul */}
        <motion.h2
          className={`text-4xl font-[Montserrat] font-bold text-center mb-10 ${
            theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
          }`}
        >
          Jelajahi Produk Kami
        </motion.h2>

        {/* Search */}
        <div className="mb-10">
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-6 py-3 rounded-full border ${
                theme === "dark"
                  ? "bg-[#2a344a] border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-[#22624a] dark:focus:ring-[#a3e4b7]`}
            />
            <FaSearch
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Kategori */}
        <div className="flex justify-center mb-10 space-x-4 flex-wrap">
          {Object.keys(products).length === 0 && (
            <span className="text-sm opacity-70">Memuat kategori…</span>
          )}
          {Object.keys(products).map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? "bg-[#22624a] text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Produk grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {loading && (
            <>
              {[...Array(6)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-96 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="col-span-full text-center opacity-70">
              Tidak ada produk pada kategori ini.
            </div>
          )}

          {!loading &&
            filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                image={p.image_url}
                description={p.description}
                price={toNum(p.price)}
                stock={p.stock}
                theme={theme}
                onViewDetail={() => {
                  setSelectedProduct(p);
                  setQuantity(1);
                }}
              />
            ))}
        </motion.div>

        {/* Modal detail produk */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={`bg-white dark:bg-[#2a344a] p-8 rounded-2xl max-w-3xl w-full mx-4 relative shadow-2xl border ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-white bg-[#22624a] p-2 rounded-full hover:bg-[#14532d] transition-all"
                >
                  ×
                </button>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <img
                      src={selectedProduct.image_url}
                      alt={selectedProduct.name}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <h3
                      className={`text-3xl font-[Montserrat] font-bold ${
                        theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
                      }`}
                    >
                      {selectedProduct.name}
                    </h3>
                    <p
                      className={`text-lg ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {selectedProduct.description}
                    </p>
                    <p
                      className={`text-xl font-semibold ${
                        theme === "dark" ? "text-[#a3e4b7]" : "text-[#22624a]"
                      }`}
                    >
                      Rp {toNum(selectedProduct.price).toLocaleString("id-ID")}
                    </p>
                    <p
                      className={`text-md ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Stok Tersedia: {selectedProduct.stock} unit
                    </p>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="1"
                        max={selectedProduct.stock}
                        value={quantity}
                        onChange={(e) => {
                          let val = parseInt(e.target.value, 10);
                          if (isNaN(val) || val < 1) val = 1;
                          if (val > selectedProduct.stock)
                            val = selectedProduct.stock;
                          setQuantity(val);
                        }}
                        className={`w-20 px-3 py-2 rounded-full border ${
                          theme === "dark"
                            ? "bg-[#344e41] border-gray-600 text-white"
                            : "bg-gray-100 border-gray-300 text-gray-800"
                        } focus:outline-none focus:ring-2 focus:ring-[#22624a] dark:focus:ring-[#a3e4b7]`}
                      />
                      <motion.a
                        href={`https://wa.me/6285745135415?text=${encodeURIComponent(
                          `Halo, saya ingin membeli:\n- ${selectedProduct.name} x ${quantity} (Rp ${toNum(
                            selectedProduct.price
                          ).toLocaleString("id-ID")})\nTotal: Rp ${(
                            toNum(selectedProduct.price) * quantity
                          ).toLocaleString(
                            "id-ID"
                          )}\nSilakan proses pesanannya!`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#22624a] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#14532d] transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Pesan via WhatsApp
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}

export default Produk;
