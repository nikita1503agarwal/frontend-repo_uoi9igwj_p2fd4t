import { useMemo, useState } from "react";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";

function App() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const inc = (id) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
  const dec = (id) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p)));
  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const total = useMemo(() => cart.reduce((s, it) => s + it.price * it.quantity, 0), [cart]);

  const onCheckoutSuccess = () => {
    setOpen(false);
    setCart([]);
    alert("سفارش شما با موفقیت ثبت شد!");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
      <Hero onStartOrder={() => window.scrollTo({ top: 600, behavior: "smooth" })} />
      <div className="px-6 pb-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Menu onAdd={addToCart} />
        </div>
        <div className="lg:col-span-1">
          <Cart
            items={cart}
            onInc={inc}
            onDec={dec}
            onRemove={removeItem}
            onCheckout={() => setOpen(true)}
          />
        </div>
      </div>

      <CheckoutModal open={open} onClose={() => setOpen(false)} items={cart} total={total} onSuccess={onCheckoutSuccess} />
    </div>
  );
}

export default App;
