import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Pay() {
  const q = useQuery();
  const orderNumber = q.get('order');
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!orderNumber) return;
      const { data: o } = await supabase.from('orders').select('*').eq('order_number', orderNumber).single();
      setOrder(o || null);
      if (o) {
        const { data: its } = await supabase.from('order_items').select('*').eq('order_id', o.id);
        setItems(its || []);
      }
    })();
  }, [orderNumber]);

  const onUpload = async (e) => {
    e.preventDefault();
    if (!order) return;
    if (!file) return alert('Pilih file bukti (PNG/JPG) dulu.');

    const ext = file.name.split('.').pop().toLowerCase();
    if (!['png','jpg','jpeg'].includes(ext)) return alert('Format harus PNG/JPG.');

    setUploading(true);
    // path: proofs/orders/ORD-XXXX/ts.ext
    const path = `orders/${order.order_number}/${Date.now()}.${ext}`;
    const { data: up, error: e1 } = await supabase.storage.from('proofs').upload(path, file, {
      cacheControl: '3600', upsert: false, contentType: file.type
    });
    if (e1) { setUploading(false); return alert('Upload gagal.'); }

    const { data: pub } = supabase.storage.from('proofs').getPublicUrl(up.path);

    // simpan record bukti
    const { error: e2 } = await supabase.from('payment_proofs').insert([{
      order_id: order.id, proof_url: pub.publicUrl
    }]);
    if (e2) { setUploading(false); return alert('Gagal simpan bukti.'); }

    // update status order → awaiting review (atau langsung 'paid' kalau mau)
    await supabase.from('orders').update({ status: 'paid' }).eq('id', order.id);

    setUploading(false);
    alert('Bukti terkirim! Admin akan memverifikasi.');
  };

  if (!orderNumber) return <div className="pt-24 text-center">Order tidak ditemukan.</div>;
  if (!order) return <div className="pt-24 text-center">Memuat order…</div>;

  return (
    <div className="max-w-3xl mx-auto pt-24 px-4 pb-28">
      <h1 className="text-2xl font-bold mb-2">Pembayaran</h1>
      <div className="text-sm opacity-80 mb-4">Order No: <strong>{order.order_number}</strong></div>

      <div className="rounded-lg shadow p-4 bg-white dark:bg-gray-900 mb-6">
        <div className="font-semibold mb-1">Transfer ke:</div>
        <ul className="text-sm">
          <li>Bank: BCA</li>
          <li>Atas Nama: Zaqii Sheilla Ananda</li>
          <li>No. Rekening: 3850866511</li>
        </ul>
        <div className="mt-2">Total: <strong>Rp {Number(order.total_amount).toLocaleString('id-ID')}</strong></div>
      </div>

      <div className="rounded-lg shadow p-4 bg-white dark:bg-gray-900 mb-6">
        <div className="font-semibold mb-2">Rincian</div>
        <ul className="text-sm space-y-1">
          {items.map(it => (
            <li key={it.id}>{it.product_name} x{it.qty} — Rp {(Number(it.price)*it.qty).toLocaleString('id-ID')}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={onUpload} className="rounded-lg shadow p-4 bg-white dark:bg-gray-900 space-y-3">
        <div>
          <label className="block text-sm mb-1">Upload Bukti (PNG/JPG)</label>
          <input type="file" accept="image/png,image/jpeg" onChange={e=>setFile(e.target.files?.[0] || null)} />
        </div>
        <button disabled={uploading} className="rounded-full px-5 py-2 bg-[#22624a] text-white hover:bg-[#14532d] transition">
          {uploading ? 'Mengirim…' : 'Kirim Bukti Pembayaran'}
        </button>
      </form>
    </div>
  );
}
