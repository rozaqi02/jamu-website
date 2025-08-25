import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
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
        backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
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
      } overflow-hidden relative pt-24`}
      style={backgroundStyle}
    >
      {/* efek blur halus & minimal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-80 h-80 bg-emerald-500/10 rounded-full"
          style={{
            top: `${mousePosition.y - 200}px`,
            left: `${mousePosition.x - 200}px`,
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.22, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        className="py-8 md:py-12 px-6 max-w-7xl mx-auto relative z-10"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2
          className={`text-3xl md:text-4xl font-[Montserrat] font-bold text-center mb-8 md:mb-12 ${
            theme === "dark" ? "text-emerald-300" : "text-emerald-700"
          }`}
        >
          Produk Kami
        </h2>

        {/* Search */}
        <div className="mb-10">
          <div className="relative w-full max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Cari produk…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-5 py-3 rounded-xl border ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />
            <FaSearch
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Kategori */}
        <div className="flex justify-center mb-10 gap-2 md:gap-3 flex-wrap">
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
                className={`px-4 md:px-5 py-2 rounded-full text-sm md:text-base transition ${
                  activeCategory === category
                    ? "bg-emerald-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
        </div>

        {/* Grid produk */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
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

        {/* Modal produk */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* overlay blur */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedProduct(null)}
              />
              {/* card */}
              <motion.div
                className="relative z-10 w-[92%] max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-2xl"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
              >
                {/* header */}
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {selectedProduct.name}
                  </h3>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    aria-label="Tutup"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    title="Tutup"
                  >
                    <FaTimes className="text-red-500 text-lg" />
                  </button>
                </div>

                {/* body */}
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

                  <div className="md:w-1/2 space-y-4">
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {selectedProduct.description || "Tanpa deskripsi."}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                        Rp {toNum(selectedProduct.price).toLocaleString("id-ID")}
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
                        className="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                      />

                      {/* ikon keranjang saja */}
                      <motion.button
                        onClick={handleAddToCart}
                        aria-label="Masukkan ke keranjang"
                        className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={selectedProduct.stock <= 0}
                        title="Masukkan keranjang"
                      >
                        <FaShoppingCart />
                      </motion.button>

                      <motion.button
                        onClick={handleBuyNow}
                        className="rounded-full px-4 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white hover:brightness-110 disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
