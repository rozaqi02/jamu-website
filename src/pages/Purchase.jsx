import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Purchase() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);

  // load order + cek bukti
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: orderData, error: orderErr } = await supabase
        .from("orders")
        .select("id, order_number, total_amount, customer_name, customer_email")
        .eq("order_number", orderNumber)
        .single();

      if (orderErr || !orderData) {
        setLoadError("Order tidak ditemukan.");
        setLoading(false);
        return;
      }
      setOrder(orderData);

      const { data: proofData } = await supabase
        .from("payment_proofs")
        .select("id, proof_url")
        .eq("order_id", orderData.id)
        .maybeSingle();

      if (proofData) {
        setAlreadyUploaded(true);
        setMessage("✅ Bukti pembayaran sudah dikirim sebelumnya.");
      }
      setLoading(false);
    })();
  }, [orderNumber]);

  // handle pilih file + preview
  function handleFileChange(e) {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  }

  // submit upload
  async function onSubmit(e) {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!order) return;
    if (!file) {
      setMessage("❌ Silakan pilih gambar bukti transfer (PNG/JPG).");
      setIsError(true);
      return;
    }
    if (!/^image\/(png|jpeg)$/.test(file.type)) {
      setMessage("❌ Format harus PNG atau JPG.");
      setIsError(true);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("❌ Ukuran file maksimal 5MB.");
      setIsError(true);
      return;
    }

    setSending(true);
    try {
      const cleanName = file.name.replace(/\s+/g, "_").toLowerCase();
      const path = `${order.order_number}/${Date.now()}-${cleanName}`;

      const { error: upErr } = await supabase.storage
        .from("proofs")
        .upload(path, file, {
          upsert: false,
          cacheControl: "3600",
          contentType: file.type,
        });

      if (upErr) {
        setMessage(upErr.message || "❌ Gagal upload bukti (storage).");
        setIsError(true);
        setSending(false);
        return;
      }

      const { data: pub } = supabase.storage.from("proofs").getPublicUrl(path);
      const url = pub?.publicUrl;
      if (!url) {
        setMessage("❌ Gagal membuat URL bukti.");
        setIsError(true);
        setSending(false);
        return;
      }

      const { error: insErr } = await supabase.from("payment_proofs").insert({
        order_id: order.id,
        proof_url: url,
        original_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
      });

      if (insErr) {
        setMessage(
          insErr.message ||
            "⚠️ Upload berhasil, tapi gagal menyimpan metadata bukti."
        );
        setIsError(true);
        setSending(false);
        return;
      }

      setMessage(
        "✅ Bukti pembayaran sudah terkirim. Admin akan memeriksa sesegera mungkin."
      );
      setIsError(false);
      setAlreadyUploaded(true);
      setPreview(null);
      setFile(null);
    } catch (err) {
      setMessage("❌ Terjadi kesalahan jaringan.");
      setIsError(true);
    } finally {
      setSending(false);
    }
  }

  if (loading) return <div className="pt-24 text-center">Memuat…</div>;
  if (loadError) {
    return (
      <div className="max-w-2xl mx-auto pt-24 px-4 text-center">
        <p className="mb-4">{loadError}</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-full px-5 py-2 bg-[#22624a] text-white hover:bg-[#14532d] transition"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-24 px-4 pb-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Konfirmasi Pembayaran
      </h1>

      <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-900">
        {/* Order Summary */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">No. Order</span>
            <span>{order.order_number}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Total Pembayaran</span>
            <span className="text-lg font-semibold text-green-700">
              Rp {Number(order.total_amount || 0).toLocaleString("id-ID")}
            </span>
          </div>
          <div className="text-xs opacity-80 mt-2">
            Transfer ke: <br />
            <strong>BANK BCA 123456789 a.n. PT Jamu Sugih Waras</strong>
          </div>
        </div>

        {/* Notifikasi */}
        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-sm ${
              isError
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}

        {!alreadyUploaded ? (
          <form onSubmit={onSubmit} className="space-y-4">
            {/* File input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload bukti transfer
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                required
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#22624a] file:text-white hover:file:bg-[#14532d] cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format PNG/JPG, maksimal 5MB.
              </p>
            </div>

            {/* Preview */}
            {preview && (
              <div className="mt-3">
                <p className="text-xs font-medium mb-2">Preview:</p>
                <img
                  src={preview}
                  alt="Preview bukti transfer"
                  className="max-h-64 rounded-md border"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={sending || alreadyUploaded}
              className="w-full rounded-full px-5 py-2 bg-[#22624a] text-white font-medium hover:bg-[#14532d] transition disabled:opacity-60"
            >
              {sending ? "Mengirim…" : "Kirim Bukti Pembayaran"}
            </button>
          </form>
        ) : (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="rounded-full px-6 py-2 bg-[#22624a] text-white font-medium hover:bg-[#14532d] transition"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
