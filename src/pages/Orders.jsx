// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_number,
        customer_name,
        customer_email,
        total_amount,
        status,
        payment_proofs(proof_url)
      `)
      .order("id", { ascending: false });

    if (!error) setOrders(data || []);
  }

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Orderan</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 border">No. Order</th>
              <th className="px-3 py-2 border">Customer</th>
              <th className="px-3 py-2 border">Total</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Bukti Bayar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="text-center">
                <td className="px-3 py-2 border">{o.order_number}</td>
                <td className="px-3 py-2 border">
                  {o.customer_name} <br /> <span className="opacity-70">{o.customer_email}</span>
                </td>
                <td className="px-3 py-2 border">Rp {Number(o.total_amount).toLocaleString("id-ID")}</td>
                <td className="px-3 py-2 border">{o.status}</td>
                <td className="px-3 py-2 border">
                  {o.payment_proofs?.[0]?.proof_url ? (
                    <a
                      href={o.payment_proofs[0].proof_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Lihat Bukti
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
            {!orders.length && (
              <tr>
                <td colSpan="5" className="text-center py-4 opacity-70">
                  Belum ada orderan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
