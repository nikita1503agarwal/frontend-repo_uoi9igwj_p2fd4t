import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function CheckoutModal({ open, onClose, items, total, onSuccess }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async () => {
    setLoading(true);
    try {
      const payload = {
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        notes: form.notes || null,
        items: items.map((it) => ({
          item_id: it.id,
          title: it.title,
          price: it.price,
          quantity: it.quantity,
        })),
      };
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "خطا در ثبت سفارش");
      onSuccess(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">تکمیل اطلاعات</h3>
          <button onClick={onClose} className="text-gray-500">بستن</button>
        </div>
        <div className="space-y-3">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="نام و نام خانوادگی" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="شماره تماس" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} />
          <textarea className="w-full border rounded-lg px-3 py-2" placeholder="آدرس تحویل" value={form.address} onChange={(e)=>setForm({...form, address: e.target.value})} />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="توضیحات (اختیاری)" value={form.notes} onChange={(e)=>setForm({...form, notes: e.target.value})} />
          <div className="flex items-center justify-between pt-2">
            <span className="text-gray-600">مبلغ قابل پرداخت</span>
            <span className="font-extrabold text-orange-600">{total.toLocaleString()} تومان</span>
          </div>
          <button disabled={loading} onClick={submit} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl font-semibold">
            {loading ? "در حال ارسال..." : "ثبت نهایی سفارش"}
          </button>
        </div>
      </div>
    </div>
  );
}
