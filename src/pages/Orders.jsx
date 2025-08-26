// src/pages/Orders.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaTrash } from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  // Hapus order (state)
  const [confirmDel, setConfirmDel] = useState({ open: false, order: null });
  const [deletingId, setDeletingId] = useState(null);

  // filter/sort
  const [q, setQ] = useState("");
  const [dateRange, setDateRange] = useState("all"); // all|today|yesterday|7d|30d
  const [statusFilter, setStatusFilter] = useState("all"); // all|pending|confirmed
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("desc");

  // draft status (disimpan saat klik Perbarui)
  const [draftMap, setDraftMap] = useState({});

  const [preview, setPreview] = useState({
    open: false,
    urls: [],
    index: 0,
    orderNumber: "",
  });

  const rangeToISO = useCallback(() => {
    const now = new Date();
    const start = new Date();
    const end = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    if (dateRange === "today") {
      // tetap hari ini
    } else if (dateRange === "yesterday") {
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
    } else if (dateRange === "7d") {
      start.setDate(now.getDate() - 6);
    } else if (dateRange === "30d") {
      start.setDate(now.getDate() - 29);
    } else {
      return null;
    }
    return { gte: start.toISOString(), lte: end.toISOString() };
  }, [dateRange]);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("orders")
      .select(`
        id,
        order_number,
        customer_name,
        customer_email,
        total_amount,
        status,
        paid_at,
        created_at,
        payment_proofs:payment_proofs ( id, proof_url, uploaded_at, original_name )
      `);

    const needle = q.trim();
    if (needle) {
      query = query.or(
        `order_number.ilike.%${needle}%,customer_name.ilike.%${needle}%`
      );
    }
    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }
    const rng = rangeToISO();
    if (rng) {
      query = query.gte("created_at", rng.gte).lte("created_at", rng.lte);
    }
    query = query.order(sortBy, { ascending: sortDir === "asc" });

    const { data, error } = await query;
    if (error) {
      console.error("Load orders error:", error);
      setOrders([]);
    } else {
      setOrders(data || []);
      const nextDraft = {};
      (data || []).forEach((o) => {
        nextDraft[o.id] = o.status;
      });
      setDraftMap(nextDraft);
    }
    setLoading(false);
  }, [q, statusFilter, sortBy, sortDir, rangeToISO]);

  // Satu effect dengan debounce — aman untuk ESLint
  useEffect(() => {
    const t = setTimeout(() => {
      loadOrders();
    }, 300);
    return () => clearTimeout(t);
  }, [loadOrders]);

  const totalCount = useMemo(() => orders.length, [orders]);
  const confirmedCount = useMemo(
    () => orders.filter((o) => o.status === "confirmed").length,
    [orders]
  );
  const pendingCount = totalCount - confirmedCount;

  async function saveStatus(id) {
    const next = draftMap[id];
    if (!["pending", "confirmed"].includes(next)) return;
    setSavingId(id);

    const payload =
      next === "confirmed"
        ? { status: next, paid_at: new Date().toISOString() }
        : { status: next, paid_at: null };

    const { error } = await supabase.from("orders").update(payload).eq("id", id);
    if (error) {
      console.error("Update status error:", error);
      alert(error.message || "Gagal memperbarui status.");
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...payload } : o))
      );
    }
    setSavingId(null);
  }

  const openPreview = (orderNumber, urls, startIdx = 0) => {
    if (!urls?.length) return;
    setPreview({ open: true, urls, index: startIdx, orderNumber });
  };
  const closePreview = () => setPreview((p) => ({ ...p, open: false }));
  const prevImg = () =>
    setPreview((p) => ({ ...p, index: (p.index - 1 + p.urls.length) % p.urls.length }));
  const nextImg = () =>
    setPreview((p) => ({ ...p, index: (p.index + 1) % p.urls.length }));

  const headerSortIcon = (col) =>
    sortBy !== col ? (
      <FaSort className="inline ml-1 opacity-60" />
    ) : sortDir === "asc" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );

  const toggleSort = (col) => {
    if (sortBy !== col) {
      setSortBy(col);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  // --------- Hapus Order (Opsi A: CASCADE di DB) ----------
  // Ekstrak key file dari public URL storage
  const extractStoragePath = (url) => {
    // Contoh: https://xxxx.supabase.co/storage/v1/object/public/proofs/ORD-123/filename.png
    const m = url?.match(/\/object\/public\/proofs\/(.+)$/);
    return m ? m[1] : null; // => "ORD-123/filename.png"
  };

  async function performDelete(order) {
    setDeletingId(order.id);
    try {
      // (Opsional) Hapus file di storage supaya tidak jadi orphan
      const paths =
        (order.payment_proofs || [])
          .map((p) => extractStoragePath(p.proof_url))
          .filter(Boolean);

      if (paths.length) {
        const { error: rmErr } = await supabase.storage.from("proofs").remove(paths);
        if (rmErr) {
          // Tidak fatal — baris DB tetap kita hapus
          console.warn("Gagal menghapus sebagian file storage:", rmErr.message);
        }
      }

      // Hapus order (payment_proofs akan ikut terhapus oleh ON DELETE CASCADE)
      const { error: delOrderErr } = await supabase
        .from("orders")
        .delete()
        .eq("id", order.id);
      if (delOrderErr) throw delOrderErr;

      // Update UI
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
      setDraftMap((prev) => {
        const next = { ...prev };
        delete next[order.id];
        return next;
      });
    } catch (e) {
      console.error("Delete order error:", e);
      alert(e.message || "Gagal menghapus order.");
    } finally {
      setDeletingId(null);
      setConfirmDel({ open: false, order: null });
    }
  }
  // -------------------------------------------------------

  return (
    <div className="max-w-6xl mx-auto pt-28 px-4 pb-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Daftar Orderan</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            Total: <b>{totalCount}</b>
          </span>
          <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
            Pending: <b>{pendingCount}</b>
          </span>
          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200">
            Confirmed: <b>{confirmedCount}</b>
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={loadOrders}
            className="ml-2 rounded-full px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white"
            title="Muat ulang"
          >
            Refresh
          </motion.button>
        </div>
      </div>

      {/* Toolbar filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari No. Order / Nama…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100"
        >
          <option value="all">Semua Waktu</option>
          <option value="today">Hari Ini</option>
          <option value="yesterday">Kemarin</option>
          <option value="7d">7 Hari Terakhir</option>
          <option value="30d">30 Hari Terakhir</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100"
        >
          <option value="all">Semua Status</option>
          <option value="pending">pending</option>
          <option value="confirmed">confirmed</option>
        </select>
      </div>

      {loading ? (
        <div className="py-10 opacity-70">Memuat…</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <tr className="text-left">
                <th
                  className="px-3 py-2 border-b dark:border-gray-700 cursor-pointer"
                  onClick={() => toggleSort("order_number")}
                >
                  No. Order {headerSortIcon("order_number")}
                </th>
                <th
                  className="px-3 py-2 border-b dark:border-gray-700 cursor-pointer"
                  onClick={() => toggleSort("created_at")}
                >
                  Waktu {headerSortIcon("created_at")}
                </th>
                <th
                  className="px-3 py-2 border-b dark:border-gray-700 cursor-pointer"
                  onClick={() => toggleSort("customer_name")}
                >
                  Customer {headerSortIcon("customer_name")}
                </th>
                <th
                  className="px-3 py-2 border-b dark:border-gray-700 cursor-pointer"
                  onClick={() => toggleSort("total_amount")}
                >
                  Total {headerSortIcon("total_amount")}
                </th>
                <th
                  className="px-3 py-2 border-b dark:border-gray-700 cursor-pointer"
                  onClick={() => toggleSort("status")}
                >
                  Status {headerSortIcon("status")}
                </th>
                <th className="px-3 py-2 border-b dark:border-gray-700">Bukti Bayar</th>
                <th className="px-3 py-2 border-b dark:border-gray-700">Perbarui</th>
                <th className="px-3 py-2 border-b dark:border-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-100">
              {orders.map((o) => {
                const urls = (o.payment_proofs || [])
                  .map((p) => p.proof_url)
                  .filter(Boolean);
                const draft = draftMap[o.id] ?? o.status;
                const changed = draft !== o.status;

                return (
                  <tr key={o.id} className="align-top">
                    <td className="px-3 py-2 border-b dark:border-gray-800 font-mono text-xs md:text-sm">
                      {o.order_number}
                    </td>
                    <td className="px-3 py-2 border-b dark:border-gray-800 text-xs">
                      <div>
                        {o.created_at
                          ? new Date(o.created_at).toLocaleString("id-ID")
                          : "-"}
                      </div>
                      {o.paid_at && (
                        <div className="text-[11px] opacity-70">
                          Paid: {new Date(o.paid_at).toLocaleString("id-ID")}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 border-b dark:border-gray-800">
                      <div className="font-medium">
                        {o.customer_name || "-"}
                      </div>
                      <div className="opacity-70">{o.customer_email || "-"}</div>
                    </td>
                    <td className="px-3 py-2 border-b dark:border-gray-800">
                      Rp {Number(o.total_amount || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-3 py-2 border-b dark:border-gray-800">
                      <select
                        className={`rounded-md px-2 py-1 border text-sm bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100 ${
                          draft === "confirmed" ? "border-green-300" : "border-yellow-300"
                        }`}
                        value={draft}
                        onChange={(e) =>
                          setDraftMap((m) => ({ ...m, [o.id]: e.target.value }))
                        }
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                      </select>
                      {changed && (
                        <div className="text-[11px] mt-1 text-amber-600 dark:text-amber-300">
                          * belum disimpan
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 border-b dark:border-gray-800">
                      {urls.length ? (
                        <div className="flex flex-wrap gap-2">
                          {urls.slice(0, 3).map((u, idx) => (
                            <button
                              key={`${u}-${idx}`}
                              onClick={() => openPreview(o.order_number, urls, idx)}
                              className="block w-16 h-16 rounded overflow-hidden border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              title="Klik untuk preview"
                            >
                              <img
                                src={u}
                                alt={`Proof ${idx + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </button>
                          ))}
                          {urls.length > 3 && (
                            <button
                              onClick={() => openPreview(o.order_number, urls, 0)}
                              className="w-16 h-16 rounded border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800"
                            >
                              +{urls.length - 3} lagi
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="opacity-60">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2 border-b dark:border-gray-800">
                      <button
                        onClick={() => saveStatus(o.id)}
                        disabled={savingId === o.id || !changed}
                        className="rounded-full px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white disabled:opacity-60"
                        title="Simpan status"
                      >
                        {savingId === o.id ? "Menyimpan…" : "Perbarui"}
                      </button>
                    </td>
                    <td className="px-3 py-2 border-b dark:border-gray-800">
                      <button
                        onClick={() => setConfirmDel({ open: true, order: o })}
                        disabled={deletingId === o.id}
                        className="rounded-full px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white disabled:opacity-60 flex items-center gap-2"
                        title="Hapus order"
                      >
                        <FaTrash />
                        {deletingId === o.id ? "Menghapus…" : "Hapus"}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {!orders.length && (
                <tr>
                  <td colSpan="8" className="text-center py-6 opacity-70">
                    Belum ada orderan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Preview Bukti */}
      <AnimatePresence>
        {preview.open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closePreview}
            />
            <motion.div
              className="relative z-10 max-w-3xl w-[92%] bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm font-semibold">
                  Bukti Pembayaran • {preview.orderNumber} • {preview.index + 1}/{preview.urls.length}
                </div>
                <button
                  onClick={closePreview}
                  className="px-3 py-1.5 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm"
                >
                  Tutup ✕
                </button>
              </div>
              <div className="relative p-3 md:p-4">
                <img
                  src={preview.urls[preview.index]}
                  alt="Payment Proof"
                  className="max-h-[70vh] w-full object-contain rounded"
                />
                {preview.urls.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow"
                      title="Sebelumnya"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow"
                      title="Berikutnya"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Konfirmasi Hapus */}
      <AnimatePresence>
        {confirmDel.open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => (deletingId ? null : setConfirmDel({ open: false, order: null }))} // jangan bisa ditutup saat deleting
            />
            <motion.div
              className="relative z-10 w-[92%] max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold mb-2">Hapus Order?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Order <span className="font-mono">{confirmDel.order?.order_number}</span> akan dihapus permanen. Bukti pembayaran terkait juga akan terhapus (cascade).
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmDel({ open: false, order: null })}
                  disabled={!!deletingId}
                  className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-60"
                >
                  Batal
                </button>
                <button
                  onClick={() => performDelete(confirmDel.order)}
                  disabled={!!deletingId}
                  className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-60 flex items-center gap-2"
                >
                  <FaTrash />
                  {deletingId ? "Menghapus…" : "Hapus"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
