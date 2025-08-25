import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

export default function FloatingCart() {
  const { items, total, updateQty, remove, setOpen, isOpen } = useCart();
  const nav = useNavigate();
  const [qtyDraft, setQtyDraft] = useState({});

  const onChangeQty = (id, raw) => {
    if (raw === "" || /^[0-9]{0,3}$/.test(raw)) {
      setQtyDraft((d) => ({ ...d, [id]: raw }));
    }
  };

  const commitQty = (id) => {
    setQtyDraft((d) => {
      const raw = d[id];
      let n = parseInt(raw ?? "", 10);
      if (isNaN(n) || n < 1) n = 1;
      if (n > 999) n = 999;
      updateQty(id, n);
      const { [id]: _, ...rest } = d;
      return rest;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="
              relative ml-auto h-full w-full max-w-md
              bg-white dark:bg-gray-900
              text-gray-800 dark:text-gray-100
              shadow-2xl flex flex-col rounded-l-xl
              transition-colors duration-300
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Keranjang</h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                title="Tutup"
              >
                <FaTimes className="text-red-500 text-lg" />
              </motion.button>
            </div>

            {/* Content */}
            <div
              className="
                flex-1 overflow-y-auto px-5 py-4 space-y-4
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
                dark:[&::-webkit-scrollbar-track]:bg-gray-900
              "
            >
              {!items.length && (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-10">
                  Belum ada item di keranjang.
                </div>
              )}

              {items.map((it) => {
                const displayVal = Object.prototype.hasOwnProperty.call(qtyDraft, it.id)
                  ? qtyDraft[it.id]
                  : String(it.qty);

                return (
                  <motion.div
                    key={it.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {it.image && (
                      <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded-md" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{it.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Rp {Number(it.price).toLocaleString("id-ID")}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={displayVal}
                          onChange={(e) => onChangeQty(it.id, e.target.value)}
                          onBlur={() => commitQty(it.id)}
                          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
                          className="w-16 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          onClick={() => remove(it.id)}
                          aria-label="Hapus item"
                          className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                          title="Hapus"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={!items.length}
                onClick={() => { setOpen(false); nav("/checkout"); }}
                className="w-full rounded-full px-5 py-3 text-white font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Checkout
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
