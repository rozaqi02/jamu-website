// src/pages/Produk.jsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function Produk({ theme }) {
  const navigate = useNavigate();
  const { add: addToCart, setOpen: openCart } = useCart?.() || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Wedang Rempah");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [dataByCat, setDataByCat] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const toNum = (v) => Number(v ?? 0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("id,name,price,stock,category,description,image_url")
      .order("name", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      setDataByCat({});
      setLoading(false);
      return;
    }

    const grouped = (data || []).reduce((acc, p) => {
      const cat = p?.category ?? "Tanpa Kategori";
      (acc[cat] = acc[cat] || []).push(p);
      return acc;
    }, {});
    setDataByCat(grouped);

    const cats = Object.keys(grouped);
    if (cats.length && !grouped[activeCategory]) setActiveCategory(cats[0]);

    setLoading(false);
  }, [activeCategory]);

  // initial + theme mount transition
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const onFocus = () => fetchProducts();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchProducts]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(async () => {
      await fetchProducts();
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, [fetchProducts]);

  useEffect(() => {
    const handle = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "#1a1f2b" : "#ffffff",
        transition: "background-color 0.5s ease",
      }
    : {};

  const products = dataByCat;
  const filteredProducts = products[activeCategory]
    ? products[activeCategory].filter((p) =>
        (p?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart?.({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: toNum(selectedProduct.price),
      qty: quantity,
      image: selectedProduct.image_url,
    });
    openCart?.(true);
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    const pid = selectedProduct.id;
    const qty = quantity;
    setSelectedProduct(null);
    navigate(`/checkout?pid=${pid}&qty=${qty}`);
  };

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } overflow-hidden relative pt-16`}
      style={backgroundStyle}
    >
      {/* efek blur mengikuti mouse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-[#22624a]/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.25, 0.45] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        className="py-20 px-6 max-w-6xl mx-auto relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Kategori */}
        <div className="flex justify-center mb-10 gap-3 flex-wrap">
          {loading && (
            <span className="text-sm opacity-70">Memuat kategori…</span>
          )}
          {!loading && Object.keys(products).length === 0 && (
            <span className="text-sm opacity-70">Belum ada produk.</span>
          )}
          {!loading &&
            Object.keys(products).map((category) => (
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

        {/* Grid produk */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="h-96 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}

          {!loading &&
            filteredProducts.length === 0 &&
            Object.keys(products).length > 0 && (
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

        {/* Modal ala KelolaProduk: overlay blur + card simple */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedProduct(null)}
              />
              <motion.div
                className="relative z-10 w-[92%] max-w-3xl rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
              >
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {selectedProduct.name}
                  </h3>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="rounded-full px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Tutup ✕
                  </button>
                </div>

                <div className="p-5 flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="h-72 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                      {selectedProduct.image_url ? (
                        <img
                          src={selectedProduct.image_url}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="md:w-1/2 space-y-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedProduct.description || "Tanpa deskripsi."}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                        Rp{" "}
                        {toNum(selectedProduct.price).toLocaleString("id-ID")}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Stok: {selectedProduct.stock}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max={selectedProduct.stock}
                        value={quantity}
                        onChange={(e) => {
                          let v = parseInt(e.target.value, 10);
                          if (isNaN(v) || v < 1) v = 1;
                          if (v > selectedProduct.stock) v = selectedProduct.stock;
                          setQuantity(v);
                        }}
                        className="w-24 px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                      />

                      <motion.button
                        onClick={handleAddToCart}
                        className="rounded-full px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={selectedProduct.stock <= 0}
                      >
                        Masukkan Keranjang
                      </motion.button>

                      <motion.button
                        onClick={handleBuyNow}
                        className="rounded-full px-4 py-2 text-sm bg-[#22624a] hover:bg-[#14532d] text-white"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={selectedProduct.stock <= 0}
                      >
                        Beli
                      </motion.button>
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
