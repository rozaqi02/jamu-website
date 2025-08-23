// src/pages/Checkout.jsx
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useCart } from '../context/CartContext';

// Ambil query params (?pid=&qty=) untuk fallback single-product
function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Checkout() {
  const params = useQueryParams();
  const navigate = useNavigate();

  // === GLOBAL CART (multi-produk)
  const { items: cartItems = [], clear: clearCart } = useCart();
  const isCartMode = (cartItems?.length || 0) > 0;

  // === FALLBACK SINGLE-PRODUCT (pakai pid & qty dari URL)
  const pid = params.get('pid');
  const initialQty = Number(params.get('qty') || 1);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(initialQty > 0 ? initialQty : 1);

  // Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('pria'); // 'pria' | 'wanita' | 'lainnya'

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // Ambil produk tunggal jika BUKAN cart mode
  useEffect(() => {
    (async () => {
      if (isCartMode) {
        setLoading(false);
        setLoadError('');
        return;
      }
      if (!pid) {
        setLoadError('Parameter produk tidak ditemukan.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setLoadError('');

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', Number(pid))
        .single();

      if (error || !data) {
        setLoadError('Produk tidak ditemukan.');
      } else {
        setProduct(data);
        setQty((q) => Math.max(1, Math.min(Number(q) || 1, data.stock || 1)));
      }
      setLoading(false);
    })();
  }, [pid, isCartMode]);

  // Hitung total
  const subtotalCart = isCartMode
    ? cartItems.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 1), 0)
    : 0;

  const subtotalSingle = !isCartMode
    ? Number(product?.price || 0) * Number(qty || 1)
    : 0;

  const totalAmount = isCartMode ? subtotalCart : subtotalSingle;

  async function onSubmit(e) {
    e.preventDefault();
    if (sending) return; // cegah double-submit

    if (!name || !email) {
      alert('Nama dan email wajib diisi.');
      return;
    }
    if (!isCartMode && !product) {
      alert('Produk tidak ditemukan.');
      return;
    }

    setSending(true);
    try {
      // Nomor order sederhana
      const orderNumber =
        'ORD-' +
        new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14) +
        '-' +
        Math.random().toString(36).slice(2, 6).toUpperCase();

      const orderPayload = {
        order_number: orderNumber,
        customer_name: name,
        customer_email: email,
        customer_phone: phone || null,
        customer_gender: gender || null,
        total_amount: Number(totalAmount || 0),
        status: 'pending', // PASTIKAN cocok dgn CHECK di tabel orders
      };

      // 1) Insert ke orders
      const { data: orderRow, error: orderErr } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select('id, order_number')
        .single();

      if (orderErr) {
        console.error('Insert orders error:', orderErr);
        alert(orderErr.message || 'Gagal membuat order.');
        setSending(false);
        return;
      }

      // 2) Siapkan items untuk order_items
      //    PENTING: gunakan 'qty' (bukan 'quantity') supaya cocok dengan skema DB kamu
      const lineItems = isCartMode
        ? cartItems.map((it) => ({
            order_id: orderRow.id,
            product_id: it.id,
            product_name: it.name,            // kalau kolom ini NOT NULL
            qty: Number(it.qty || 1),         // <<<<<< kunci perbaikan
            price: Number(it.price || 0),
          }))
        : [{
            order_id: orderRow.id,
            product_id: product.id,
            product_name: product.name,       // kalau kolom ini NOT NULL
            qty: Number(qty || 1),            // <<<<<< kunci perbaikan
            price: Number(product.price || 0),
          }];

      // 3) Insert ke order_items
      let itemsErr = null;
      if (lineItems.length > 0) {
        const res = await supabase.from('order_items').insert(lineItems);
        itemsErr = res.error || null;
      }

      if (itemsErr) {
        console.error('Insert order_items error:', itemsErr);
        alert(itemsErr.message || 'Gagal menyimpan item pesanan.');
        // JANGAN clear cart / navigate kalau gagal menyimpan items
        setSending(false);
        return;
      }

      // 4) Kosongkan keranjang jika ada (hanya setelah semua sukses)
      try { clearCart?.(); } catch {}

      // 5) Pindah ke halaman purchase
      navigate(`/purchase/${orderRow.order_number}`);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setSending(false);
    }
  }

  // Loading / error state
  if (loading) return <div className="pt-24 text-center">Memuat…</div>;
  if (!isCartMode && loadError) {
    return (
      <div className="max-w-3xl mx-auto pt-24 px-4 text-center">
        <p className="mb-4">{loadError}</p>
        <button
          onClick={() => navigate('/produk')}
          className="rounded-full px-5 py-2 bg-[#22624a] text-white hover:bg-[#14532d] transition"
        >
          Kembali ke Produk
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-24 px-4 pb-36">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="rounded-lg shadow p-4 bg-white dark:bg-gray-900 transition-colors">
        {isCartMode ? (
          <div className="mb-4 space-y-3">
            {cartItems.map((it) => (
              <div key={it.id} className="flex items-start gap-3 border-b pb-3">
                {it.image && (
                  <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded" loading="lazy" />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-xs opacity-80">Qty: {it.qty}</div>
                </div>
                <div className="text-sm">
                  Rp {(Number(it.price || 0) * Number(it.qty || 1)).toLocaleString('id-ID')}
                </div>
              </div>
            ))}
            <div className="text-right font-semibold">
              Total: Rp {subtotalCart.toLocaleString('id-ID')}
            </div>
          </div>
        ) : (
          <div className="mb-4 flex items-start gap-4">
            {product?.image_url && (
              <img src={product.image_url} alt={product.name} className="w-24 h-24 object-cover rounded-lg" loading="lazy" />
            )}
            <div>
              <div className="font-semibold">{product?.name}</div>
              <div className="text-sm opacity-80">Rp {Number(product?.price || 0).toLocaleString('id-ID')}</div>
              <div className="text-xs opacity-70">Stok: {product?.stock}</div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nama</label>
            <input className="w-full rounded border px-3 py-2 bg-transparent" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full rounded border px-3 py-2 bg-transparent" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">No. HP</label>
            <input type="tel" className="w-full rounded border px-3 py-2 bg-transparent" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08xxxx" />
          </div>
          <div>
            <label className="block text-sm mb-1">Jenis Kelamin</label>
            <select className="w-full rounded border px-3 py-2 bg-transparent" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="pria">Pria</option>
              <option value="wanita">Wanita</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          {!isCartMode && (
            <div>
              <label className="block text-sm mb-1">Jumlah</label>
              <input
                type="number"
                min="1"
                max={product?.stock ?? 1}
                className="w-24 rounded border px-3 py-2 bg-transparent"
                value={qty}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(Number(e.target.value) || 1, product?.stock ?? 1));
                  setQty(v);
                }}
              />
              <span className="ml-2 text-sm opacity-70">
                Subtotal: <strong>Rp {(Number(product?.price || 0) * qty).toLocaleString('id-ID')}</strong>
              </span>
            </div>
          )}

          <div className="sticky bottom-6">
            <button type="submit" disabled={sending} className="inline-flex rounded-full px-5 py-2 bg-[#22624a] text-white hover:bg-[#14532d] transition disabled:opacity-60">
              {sending ? 'Mengirim…' : 'Buat Pesanan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
