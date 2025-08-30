import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaThLarge,
  FaListUl,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

/**
 * Halaman Produk — gaya marketplace
 * - Pencarian
 * - Sort dropdown: relevan, harga↑, harga↓, stok↑, stok↓
 * - Toggle layout: Grid / Compact
 * - Responsif mobile, dark/light dengan transisi halus
 */

const SORTS = [
  { key: "relevance", label: "Relevan" },
  { key: "price_asc", label: "Harga Termurah" },
  { key: "price_desc", label: "Harga Tertinggi" },
  { key: "stock_desc", label: "Stok Terbanyak" },
  { key: "stock_asc", label: "Stok Tersedikit" },
];

function Produk({ theme }) {
  const navigate = useNavigate();
  const { add: addToCart, setOpen: openCart } = useCart?.() || {};

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [layout, setLayout] = useState("grid"); // 'grid' | 'compact'
  const [sortKey, setSortKey] = useState("relevance");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // data state
  const [catalog, setCatalog] = useState([]); // flat list
  const [categories, setCategories] = useState(["Semua"]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // theme transition halus
  const pageStyle = {
    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
    transition:
      "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease",
  };

  /* =========================
     Fetch dari Supabase
     ========================= */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select(
        "id,name,price,stock,category,description,image_url,created_at"
      );

    if (error) {
      console.error("Supabase error:", error);
      setCatalog([]);
      setCategories(["Semua"]);
      setLoading(false);
      return;
    }

    const cleaned = (data || []).map((p) => ({
      ...p,
      price: Number(p?.price ?? 0),
      stock: Number(p?.stock ?? 0),
      name: p?.name ?? "",
      category: p?.category || "Lainnya",
      description: p?.description || "",
    }));

    const cats = [
      "Semua",
      ...Array.from(new Set(cleaned.map((p) => p.category))),
    ];
    setCategories(cats);
    setCatalog(cleaned);
    if (!cats.includes(activeCategory)) setActiveCategory("Semua");
    setLoading(false);
  }, [activeCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // refresh kalau balik fokus / auth berubah
  useEffect(() => {
    const onFocus = () => fetchProducts();
    window.addEventListener("focus", onFocus);
    const { data: sub } = supabase.auth.onAuthStateChange(async () => {
      await fetchProducts();
    });
    return () => {
      window.removeEventListener("focus", onFocus);
      sub?.subscription?.unsubscribe?.();
    };
  }, [fetchProducts]);

  /* =========================
     Derivations: filter + sort
     ========================= */
  const visibleProducts = useMemo(() => {
    let list = [...catalog];

    // filter kategori
    if (activeCategory !== "Semua") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // filter search
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const hay = `${p.name} ${p.description} ${p.category}`.toLowerCase();
        return hay.includes(q);
      });

      // bobot relevansi sederhana: nama diawali q > nama berisi q > lainnya
      list.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const s = (nm) => (nm.startsWith(q) ? 2 : nm.includes(q) ? 1 : 0);
        return s(bName) - s(aName);
      });
    }

    // sorting eksplisit
    switch (sortKey) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "stock_asc":
        list.sort((a, b) => a.stock - b.stock);
        break;
      case "stock_desc":
        list.sort((a, b) => b.stock - a.stock);
        break;
      default:
        // relevan: jika tak ada q, urut terbaru
        if (!q)
          list.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
    }

    return list;
  }, [catalog, activeCategory, searchTerm, sortKey]);

  /* =========================
     Action helpers
     ========================= */
  const handleOpenModal = (p) => {
    setSelectedProduct(p);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart?.(
      {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: Number(selectedProduct.price ?? 0),
        image: selectedProduct.image_url,
      },
      quantity
    );
    openCart?.(true);
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    const pid = selectedProduct.id;
    const qty = quantity;
    setSelectedProduct(null);
    navigate(`/checkout?pid=${pid}&qty=${qty}`);
  };

  /* =========================
     Render
     ========================= */
  return (
    <div
      className={`min-h-screen pt-24 font-poppins ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}
      style={pageStyle}
    >
      {/* ====== Title & Subtitle ====== */}
      <div className="site-container pb-2">
        <h1
          className={`text-3xl md:text-4xl font-[Montserrat] font-bold ${
            theme === "dark" ? "text-emerald-300" : "text-emerald-700"
          }`}
          style={{ transition: "color .5s ease" }}
        >
          Produk Jamu Sugih Waras
        </h1>
        <p className="mt-1 text-sm md:text-base opacity-80">
          Pilih <strong>varian dan jumlah</strong> sebelum menambah ke
          keranjang.
        </p>
      </div>

      {/* =================== Toolbar: Search + Sort + Layout =================== */}
      <div
        className="sticky top-[72px] z-30 border-b"
        style={{
          transition: "border-color .5s ease",
          borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
          backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
        }}
      >
        <div className="site-container py-3 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari produk atau kata kunci…"
              className={`w-full h-11 pl-11 pr-4 rounded-xl border text-sm md:text-base
                ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="sr-only">
              Urutkan
            </label>
            <select
              id="sort"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className={`h-11 rounded-xl px-3 border text-sm md:text-base
                ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`}
              aria-label="Filter urutkan"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* Layout toggle */}
            <div
              className="flex items-center rounded-xl overflow-hidden border"
              style={{
                transition: "border-color .5s ease",
                borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
              }}
            >
              <button
                type="button"
                onClick={() => setLayout("grid")}
                className={`h-11 px-3 flex items-center gap-2 text-sm ${
                  layout === "grid"
                    ? "bg-emerald-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-900 text-gray-200"
                    : "bg-white text-gray-700"
                } transition`}
                aria-pressed={layout === "grid"}
              >
                <FaThLarge /> <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setLayout("compact")}
                className={`h-11 px-3 flex items-center gap-2 text-sm ${
                  layout === "compact"
                    ? "bg-emerald-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-900 text-gray-200"
                    : "bg-white text-gray-700"
                } transition`}
                aria-pressed={layout === "compact"}
              >
                <FaListUl /> <span className="hidden sm:inline">Compact</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =================== Kategori =================== */}
      <div className="site-container">
        <div className="flex gap-2 flex-wrap py-4">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white"
                  : theme === "dark"
                  ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* =================== Daftar Produk =================== */}
      <section className="site-container pb-16">
        {/* Skeletons */}
        {loading && (
          <div
            className={
              layout === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                : "space-y-3"
            }
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`${
                  layout === "grid" ? "aspect-[4/5]" : "h-28"
                } rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse`}
              />
            ))}
          </div>
        )}

        {!loading && visibleProducts.length === 0 && (
          <p className="py-12 text-center opacity-70">Produk tidak ditemukan.</p>
        )}

        {!loading && visibleProducts.length > 0 && (
          <>
            {layout === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {visibleProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    view="grid"
                    id={p.id}
                    name={p.name}
                    image={p.image_url}
                    description={p.description}
                    price={p.price}
                    stock={p.stock}
                    theme={theme}
                    onViewDetail={() => handleOpenModal(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {visibleProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    view="compact"
                    id={p.id}
                    name={p.name}
                    image={p.image_url}
                    description={p.description}
                    price={p.price}
                    stock={p.stock}
                    theme={theme}
                    onViewDetail={() => handleOpenModal(p)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* =================== Modal Detail Produk =================== */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />
            {/* card */}
            <motion.div
              className="relative z-10 w-[92%] max-w-3xl rounded-2xl border overflow-hidden shadow-2xl bg-white dark:bg-gray-900"
              style={{
                transition: "border-color .5s ease",
                borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
              }}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              {/* header */}
              <div
                className="px-5 py-4 border-b"
                style={{
                  transition: "border-color .5s ease",
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-lg line-clamp-1">
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
              </div>

              {/* body */}
              <div className="p-5 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div
                    className="h-72 w-full rounded-xl overflow-hidden border bg-gray-100 dark:bg-gray-800"
                    style={{
                      transition: "border-color .5s ease",
                      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                    }}
                  >
                    {selectedProduct.image_url && (
                      <img
                        src={selectedProduct.image_url}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                </div>

                <div className="md:w-1/2 space-y-4">
                  <p className="text-sm leading-relaxed text-justify">
                    {selectedProduct.description || "Tanpa deskripsi."}
                  </p>

                  <div className="flex items-center flex-wrap gap-3">
                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                      Rp{" "}
                      {Number(selectedProduct.price ?? 0).toLocaleString(
                        "id-ID"
                      )}
                    </div>
                    <div className="text-sm opacity-80">
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
                        if (v > selectedProduct.stock)
                          v = selectedProduct.stock;
                        setQuantity(v);
                      }}
                      className="w-24 px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                      style={{
                        transition: "border-color .5s ease",
                        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                      }}
                    />

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
    </div>
  );
}

export default Produk;
