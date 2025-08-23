import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function FloatingCart() {
  const { items, count, total, updateQty, remove, setOpen, isOpen } = useCart();
  const nav = useNavigate();

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 rounded-full px-4 py-3 shadow-lg bg-[#22624a] text-white hover:bg-[#14532d] transition"
      >
        Keranjang ({count})
      </button>

      {/* Drawer sederhana */}
      {isOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl p-4 overflow-y-auto"
            onClick={(e)=>e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Keranjang</h3>
              <button onClick={() => setOpen(false)} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-800">Tutup</button>
            </div>

            {!items.length && <div className="opacity-70">Belum ada item.</div>}

            {items.map(it => (
              <div key={it.id} className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-gray-700">
                {it.image && <img src={it.image} alt={it.name} className="w-14 h-14 object-cover rounded" />}
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm opacity-70">Rp {Number(it.price).toLocaleString('id-ID')}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="number" min="1" value={it.qty}
                      onChange={e=>updateQty(it.id, e.target.value)}
                      className="w-16 rounded border px-2 py-1 bg-transparent"
                    />
                    <button onClick={()=>remove(it.id)} className="text-red-600 text-sm">Hapus</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>

            <button
              disabled={!items.length}
              onClick={()=>{ setOpen(false); nav('/checkout'); }}
              className="mt-3 w-full rounded-full px-5 py-2 bg-[#22624a] text-white hover:bg-[#14532d] transition disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
