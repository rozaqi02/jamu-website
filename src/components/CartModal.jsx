import { useState } from 'react';

function CartModal({ isOpen, onClose, cartItems }) {
  const handleSubmit = () => {
    const message = cartItems
      .map((item) => `• ${item.name} (${item.variant}) x${item.quantity}`)
      .join('%0A');
    const waLink = `https://wa.me/6282245964007?text=Halo%20saya%20ingin%20pesan%20produk:%0A${message}`;
    window.open(waLink, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-white">Keranjang</h2>
        <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {cartItems.length === 0 ? (
            <li className="text-gray-600 dark:text-gray-300">Keranjang kosong.</li>
          ) : (
            cartItems.map((item, i) => (
              <li key={i} className="text-sm text-gray-800 dark:text-gray-200">
                {item.name} ({item.variant}) x{item.quantity}
              </li>
            ))
          )}
        </ul>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            Tutup
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Kirim via WA
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
