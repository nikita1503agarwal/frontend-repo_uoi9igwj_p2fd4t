import { useMemo } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart({ items, onInc, onDec, onRemove, onCheckout }) {
  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );

  return (
    <aside className="bg-white rounded-2xl shadow-xl p-5 sticky top-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3">سبد خرید</h3>
      {items.length === 0 ? (
        <p className="text-gray-500">هنوز آیتمی اضافه نشده است.</p>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{it.title}</p>
                <p className="text-sm text-gray-500">{(it.price).toLocaleString()} تومان</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onDec(it.id)} className="p-1 rounded bg-gray-100">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center">{it.quantity}</span>
                <button onClick={() => onInc(it.id)} className="p-1 rounded bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={() => onRemove(it.id)} className="p-1.5 rounded bg-red-50 text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="pt-4 border-t flex items-center justify-between">
            <span className="font-bold text-gray-900">مبلغ کل</span>
            <span className="font-extrabold text-orange-600">{total.toLocaleString()} تومان</span>
          </div>
          <button
            onClick={() => onCheckout(total)}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl font-semibold"
          >
            ثبت سفارش
          </button>
        </div>
      )}
    </aside>
  );
}
