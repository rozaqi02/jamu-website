import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartCtx = createContext(null);
const LS_KEY = 'cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
    catch { return []; }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const add = (product, qty = 1) => {
    if (!product?.id) return;
    setItems(prev => {
      const ix = prev.findIndex(p => p.id === product.id);
      if (ix >= 0) {
        const cp = [...prev];
        cp[ix] = { ...cp[ix], qty: Math.min((cp[ix].qty || 1) + qty, 999) };
        return cp;
      }
      return [...prev, { id: product.id, name: product.name, price: Number(product.price||0), image: product.image, qty }];
    });
  };
  const updateQty = (id, qty) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, Math.min(Number(qty)||1, 999)) } : i));
  };
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((a,b)=>a+(b.qty||1),0), [items]);
  const total = useMemo(() => items.reduce((a,b)=>a + Number(b.price||0)*(b.qty||1),0), [items]);

  const value = { items, add, updateQty, remove, clear, count, total, isOpen, setOpen };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
