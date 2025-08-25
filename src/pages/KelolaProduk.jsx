// src/pages/KelolaProduk.jsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaImage,
  FaBoxOpen,
  FaTags,
} from "react-icons/fa";

const emptyForm = {
  id: null,
  name: "",
  category: "",
  price: "",
  stock: "",
  image_url: "",
  description: "",
};

export default function KelolaProduk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Semua");

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [form, setForm] = useState(emptyForm);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("products")
      .select(
        "id,name,price,stock,category,description,image_url,updated_at,created_at"
      )
      .order("updated_at", { ascending: false });
    if (error) {
      console.error(error);
      setError(error.message || "Gagal memuat produk.");
      setProducts([]);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  function openCreate() {
    setMode("create");
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(p) {
    setMode("edit");
    setForm({
      id: p.id,
      name: p.name || "",
      category: p.category || "",
      price: String(p.price ?? ""),
      stock: String(p.stock ?? ""),
      image_url: p.image_url || "",
      description: p.description || "",
    });
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;
    setModalOpen(false);
    setForm(emptyForm);
  }

  function onChange(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function saveProduct(e) {
    e?.preventDefault?.();
    if (saving) return;
    setSaving(true);
    setError("");

    // Validasi sederhana
    if (!form.name.trim()) {
      setError("Nama produk wajib diisi.");
      setSaving(false);
      return;
    }
    const price = Number(form.price);
    const stock = parseInt(form.stock || "0", 10);
    if (isNaN(price) || price < 0) {
      setError("Harga tidak valid.");
      setSaving(false);
      return;
    }
    if (isNaN(stock) || stock < 0) {
      setError("Stok tidak valid.");
      setSaving(false);
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category.trim() || null,
      price,
      stock,
      image_url: form.image_url.trim() || null,
      description: form.description.trim() || null,
      updated_at: new Date().toISOString(),
    };

    let err = null;
    if (mode === "create") {
      const { error } = await supabase.from("products").insert(payload);
      err = error;
    } else {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", form.id);
      err = error;
    }

    if (err) {
      console.error(err);
      setError(err.message || "Gagal menyimpan produk.");
    } else {
      closeModal();
      await loadProducts();
    }
    setSaving(false);
  }

  async function deleteProduct(id) {
    if (!id || deletingId) return;
    const ok = window.confirm("Hapus produk ini? Tindakan ini tidak bisa dibatalkan.");
    if (!ok) return;
    setDeletingId(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert(error.message || "Gagal menghapus produk.");
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeletingId(null);
  }

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["Semua", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const matchSearch =
        !q ||
        (p.name || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q);
      const matchCat = catFilter === "Semua" || (p.category || "") === catFilter;
      return matchSearch && matchCat;
    });
  }, [products, search, catFilter]);

  return (
    <div className="max-w-7xl mx-auto pt-28 px-4 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Kelola Produk
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tambah, ubah, atau hapus produk. Semua aksi tersinkron dengan database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadProducts}
            className="rounded-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm"
            title="Muat ulang"
          >
            Refresh
          </button>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
          >
            <FaPlus /> Tambah Produk
          </button>
        </div>
      </div>

      {/* Toolbar filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="relative w-full md:max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama / kategori / deskripsi…"
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
          {filtered.length} dari {products.length} produk
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      {/* Grid produk */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center opacity-70 py-10">
          Tidak ada produk untuk filter saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-sm"
              whileHover={{ y: -2 }}
            >
              <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <FaImage className="text-3xl mb-1" />
                    <span className="text-xs">Tidak ada gambar</span>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {p.name}
                  </h3>
                  {p.category && (
                    <span className="whitespace-nowrap text-xs inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                      <FaTags /> {p.category}
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {p.description ? (
                    <p className="line-clamp-2">{p.description}</p>
                  ) : (
                    <span className="opacity-60">Tanpa deskripsi</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm mt-2">
                  <div className="text-emerald-700 dark:text-emerald-300 font-semibold">
                    Rp {Number(p.price ?? 0).toLocaleString("id-ID")}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaBoxOpen /> Stok: {p.stock ?? 0}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    disabled={deletingId === p.id}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm disabled:opacity-60"
                  >
                    <FaTrash />
                    {deletingId === p.id ? "Menghapus…" : "Hapus"}
                  </button>
                </div>

                <div className="text-[11px] opacity-60 mt-2 text-right">
                  {p.updated_at
                    ? `Update: ${new Date(p.updated_at).toLocaleString("id-ID")}`
                    : p.created_at
                    ? `Dibuat: ${new Date(p.created_at).toLocaleString(
                        "id-ID"
                      )}`
                    : ""}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal Create/Edit */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              className="relative z-10 w-[92%] max-w-2xl rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {mode === "create" ? "Tambah Produk" : "Edit Produk"}
                </h3>
                <button
                  onClick={closeModal}
                  className="rounded-full px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Tutup ✕
                </button>
              </div>

              <form onSubmit={saveProduct} className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
                      Nama *
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => onChange("name", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
                      Kategori
                    </label>
                    <input
                      value={form.category}
                      onChange={(e) => onChange("category", e.target.value)}
                      placeholder="contoh: Wedang Rempah"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
                      Harga (Rp) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.price}
                      onChange={(e) => onChange("price", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
                      Stok *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={(e) => onChange("stock", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
                      URL Gambar
                    </label>
                    <input
                      value={form.image_url}
                      onChange={(e) => onChange("image_url", e.target.value)}
                      placeholder="https://…"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
                      Deskripsi
                    </label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => onChange("description", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-sm rounded-md border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
                  >
                    {saving ? "Menyimpan…" : "Simpan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
