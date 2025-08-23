// src/pages/Purchase.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Purchase() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr('');
      const { data, error } = await supabase
        .from('orders')
        .select('id, order_number, total_amount, status')
        .eq('order_number', orderNumber)
        .single();

      if (error || !data) {
        setErr('Pesanan tidak ditemukan.');
      } else {
        setOrder(data);
      }
      setLoading(false);
    })();
  }, [orderNumber]);

  async function onUpload(e) {
    e.preventDefault();
    if (!order) return;
    if (!file) {
      alert('Pilih file bukti transfer (PNG/JPG) terlebih dahulu.');
      return;
    }
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['png', 'jpg', 'jpeg'].includes(ext)) {
      alert('Format harus PNG/JPG.');
      return;
    }

    setUploading(true);
    try {
      const path = `${orderNumber}/${Date.now()}.${ext}`;

      // 1) Upload ke Storage (bucket "proofs" harus ada & public)
      const { error: upErr } = await supabase
        .storage
        .from('proofs')
        .upload(path, file, { cacheControl: '3600', upsert: true, contentType: file.type });

      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage.from('proofs').getPublicUrl(path);
      const fileUrl = urlData?.publicUrl;

      // 2) Simpan ke tabel payment_proofs (pastikan tabel ada dengan RLS aman)
      const { error: insErr } = await supabase
        .from('payment_proofs')
        .insert({
          order_id: order.id,
          file_url: fileUrl,
        });

      if (insErr) throw insErr;

      // 3) Update status order
      const { error: updErr } = await supabase
        .from('orders')
        .update({ status: 'proof_submitted' })
        .eq('id', order.id);

      if (updErr) throw updErr;

      alert('Bukti pembayaran terkirim. Kami akan verifikasi ya!');
      navigate(`/purchase/${orderNumber}?submitted=1`);
    } catch (e) {
      console.error(e);
      alert(e.message || 'Gagal mengunggah bukti pembayaran.');
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <div className="pt-24 text-center">Memuat…</div>;
  if (err) {
    return (
      <div className="max-w-3xl mx-auto pt-24 px-4 text-center">
        <p className="mb-4">{err}</p>
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
    <div className="max-w-3xl mx-auto pt-24 px-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>

      <div className="rounded-lg shadow p-4 bg-white dark:bg-gray-900 transition-colors space-y-4">
        <div className="text-sm">
          <div>No. Order: <strong>{order.order_number}</strong></div>
          <div>Total: <strong>Rp {Number(order.total_amount || 0).toLocaleString('id-ID')}</strong></div>
          <div>Status: <strong>{order.status}</strong></div>
        </div>

        <div className="p-3 rounded border">
          <div className="font-semibold mb-1">Rekening Pembayaran</div>
          <div>Bank BCA — 1234567890 a.n. PT Jamu Sugih Waras</div>
          <div className="text-xs opacity-70">*Kirim dalam 20 menit agar pesanan tidak hangus.</div>
        </div>

        <form onSubmit={onUpload} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Upload bukti transfer (PNG/JPG)</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex rounded-full px-5 py-2 bg-[#22624a] text-white hover:bg-[#14532d] transition disabled:opacity-60"
          >
            {uploading ? 'Mengunggah…' : 'Kirim Bukti Pembayaran'}
          </button>
        </form>
      </div>
    </div>
  );
}
