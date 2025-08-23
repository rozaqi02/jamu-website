import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";

function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Checkout() {
  const params = useQueryParams();
  const navigate = useNavigate();

  const { items: cartItems = [], clear: clearCart } = useCart();
  const isCartMode = (cartItems?.length || 0) > 0;

  const pid = params.get("pid");
  const initialQty = Number(params.get("qty") || 1);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(initialQty > 0 ? initialQty : 1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("pria");

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Ambil produk tunggal (fallback) jika bukan cart mode
  useEffect(() => {
    (async () => {
      if (isCartMode) {
        setLoading(false);
        setLoadError("");
        return;
      }
      if (!pid) {
        setLoadError("Parameter produk tidak ditemukan.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setLoadError("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(pid))
        .single();

      if (error || !data) {
        setLoadError("Produk tidak ditemukan.");
      } else {
        setProduct(data);
        setQty((q) => Math.max(1, Math.min(Number(q) || 1, data.stock || 1)));
      }
      setLoading(false);
    })();
  }, [pid, isCartMode]);

  const subtotalCart = isCartMode
    ? cartItems.reduce(
        (sum, it) => sum + Number(it.price || 0) * Number(it.qty || 1),
        0
      )
    : 0;

  const subtotalSingle = !isCartMode
    ? Number(product?.price || 0) * Number(qty || 1)
    : 0;

  const totalAmount = isCartMode ? subtotalCart : subtotalSingle;

  async function onSubmit(e) {
    e.preventDefault();
    if (sending) return;

    if (!name || !email) {
      alert("Nama dan email wajib diisi.");
      return;
    }
    if (!/^08\d{8,11}$/.test(phone)) {
      alert(
        "Nomor HP harus mulai 08 dan panjang total 10–13 digit (contoh: 08xxxxxxxxxx)."
      );
      return;
    }
    if (!isCartMode && !product) {
      alert("Produk tidak ditemukan.");
      return;
    }

    setSending(true);
    try {
      const orderNumber =
        "ORD-" +
        new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14) +
        "-" +
        Math.random().toString(36).slice(2, 6).toUpperCase();

      const orderPayload = {
        order_number: orderNumber,
        customer_name: name,
        customer_email: email,
        customer_phone: phone || null,
        customer_gender: gender || null,
        total_amount: Number(totalAmount || 0),
        status: "pending",
      };

      const { data: orderRow, error: orderErr } = await supabase
        .from("orders")
        .insert(orderPayload)
        .select("id, order_number")
        .single();

      if (orderErr) {
        console.error("Insert orders error:", orderErr);
        alert(orderErr.message || "Gagal membuat order.");
        setSending(false);
        return;
      }

      const lineItems = isCartMode
        ? cartItems.map((it) => ({
            order_id: orderRow.id,
            product_id: it.id,
            product_name: it.name,
            qty: Number(it.qty || 1),
            price: Number(it.price || 0),
          }))
        : [
            {
              order_id: orderRow.id,
              product_id: product.id,
              product_name: product.name,
              qty: Number(qty || 1),
              price: Number(product.price || 0),
            },
          ];

      let itemsErr = null;
      if (lineItems.length > 0) {
        const res = await supabase.from("order_items").insert(lineItems);
        itemsErr = res.error || null;
      }

      if (itemsErr) {
        console.error("Insert order_items error:", itemsErr);
        alert(itemsErr.message || "Gagal menyimpan item pesanan.");
        setSending(false);
        return;
      }

      try {
        clearCart?.();
      } catch {}

      navigate(`/purchase/${orderRow.order_number}`);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setSending(false);
    }
  }

  if (loading) return <div className="pt-24 text-center">Memuat…</div>;
  if (!isCartMode && loadError) {
    return (
      <div className="max-w-3xl mx-auto pt-24 px-4 text-center">
        <p className="mb-4">{loadError}</p>
        <button
          onClick={() => navigate("/produk")}
          className="rounded-full px-5 py-2 bg-[#22624a] text-white hover:bg-[#14532d]"
        >
          Kembali ke Produk
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-24 px-4 pb-36">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-900">
        {/* Ringkasan Belanja */}
        <div className="mb-6">
          {isCartMode ? (
            <>
              <h2 className="text-lg font-semibold mb-3">Ringkasan Keranjang</h2>
              <div className="space-y-3">
                {cartItems.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-start gap-3 border-b pb-3"
                  >
                    {it.image && (
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-gray-500">Qty: {it.qty}</div>
                    </div>
                    <div className="text-sm font-semibold">
                      Rp{" "}
                      {(
                        Number(it.price || 0) * Number(it.qty || 1)
                      ).toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right font-bold mt-3">
                Total: Rp {subtotalCart.toLocaleString("id-ID")}
              </div>
            </>
          ) : (
            <div className="flex items-start gap-4">
              {product?.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              )}
              <div>
                <div className="font-medium">{product?.name}</div>
                <div className="text-sm text-gray-700">
                  Rp {Number(product?.price || 0).toLocaleString("id-ID")}
                </div>
                <div className="text-xs text-gray-500">
                  Stok: {product?.stock}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Data Pembeli */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nama</label>
            <input
              className="w-full rounded border px-3 py-2 bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded border px-3 py-2 bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">No. HP</label>
            <input
              type="tel"
              className="w-full rounded border px-3 py-2 bg-transparent"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              required
              pattern="^08\d{8,11}$"
              title="Nomor HP harus mulai 08 dan 10–13 digit"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Jenis Kelamin</label>
            <select
              className="w-full rounded border px-3 py-2 bg-transparent"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
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
                  const v = Math.max(
                    1,
                    Math.min(Number(e.target.value) || 1, product?.stock ?? 1)
                  );
                  setQty(v);
                }}
              />
              <span className="ml-2 text-sm text-gray-600">
                Subtotal:{" "}
                <strong>
                  Rp {(Number(product?.price || 0) * qty).toLocaleString("id-ID")}
                </strong>
              </span>
            </div>
          )}

          <div className="sticky bottom-6">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex rounded-full px-5 py-2 bg-[#22624a] text-white hover:bg-[#14532d] transition disabled:opacity-60"
            >
              {sending ? "Mengirim…" : "Buat Pesanan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
