// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", stock: 0, price: 0, image_url: "" });

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    const { data } = await supabase
      .from("products")
      .select("id,name,stock,price,image_url")
      .order("name");
    setProducts(data || []);
  }

  function startEdit(p) {
    setEditing(p.id);
    setForm(p);
  }

  async function saveEdit() {
    await supabase.from("products").update(form).eq("id", editing);
    setEditing(null);
    loadProducts();
  }

  return (
    <div className="max-w-4xl mx-auto pt-28 px-4">
      <h1 className="text-2xl font-bold mb-6">Kelola Produk</h1>
      {products.map((p) => (
        <div key={p.id} className="flex items-center justify-between rounded border p-3 mb-3 bg-white dark:bg-gray-900">
          {editing === p.id ? (
            <div className="flex-1 space-y-2">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded" />
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full p-2 border rounded" />
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full p-2 border rounded" />
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="URL Gambar" className="w-full p-2 border rounded" />
              <div className="flex gap-2">
                <button onClick={saveEdit} className="px-3 py-1 bg-green-600 text-white rounded">Simpan</button>
                <button onClick={() => setEditing(null)} className="px-3 py-1 bg-gray-400 text-white rounded">Batal</button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                {p.image_url && <img src={p.image_url} alt={p.name} className="w-12 h-12 object-cover rounded" />}
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm">Stok: {p.stock}</div>
                  <div className="text-sm">Rp {Number(p.price).toLocaleString("id-ID")}</div>
                </div>
              </div>
              <button onClick={() => startEdit(p)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
