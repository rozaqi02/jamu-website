import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FloatingCart() {
  const { items, total, updateQty, remove, setOpen, isOpen } = useCart();
  const nav = useNavigate();
  const [qtyDraft, setQtyDraft] = useState({}); // { [id]: 'string' }

  const onChangeQty = (id, raw) => {
    // izinkan kosong & hanya digit (maks 3)
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
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
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
            className="relative ml-auto h-full w-full max-w-md bg-white dark:bg-[#1a1f2b] shadow-2xl flex flex-col rounded-l-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Keranjang
              </h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 text-sm rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
              >
                Tutup ✕
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
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
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {it.image && (
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 dark:text-gray-100 truncate">
                        {it.name}
                      </div>
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
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                          }}
                          className="w-16 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => remove(it.id)}
                          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Hapus
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
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Total
                </span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={!items.length}
                onClick={() => {
                  setOpen(false);
                  nav("/checkout");
                }}
                className="w-full rounded-full px-5 py-3 text-white font-semibold bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
