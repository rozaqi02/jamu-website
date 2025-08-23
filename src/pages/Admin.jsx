import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('id,name,stock,price')
        .order('name', { ascending: true });
      setProducts(data || []);
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-28 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin – Kelola Stok</h1>
      {products.map(p => (
        <div key={p.id} className="flex items-center justify-between rounded border p-3 bg-white dark:bg-gray-900">
          <div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm opacity-70">Harga: Rp {Number(p.price||0).toLocaleString('id-ID')}</div>
          </div>
          <div className="text-sm">Stok: {p.stock}</div>
        </div>
      ))}
      {!products.length && <div className="opacity-70">Tidak ada produk.</div>}
    </div>
  );
}
