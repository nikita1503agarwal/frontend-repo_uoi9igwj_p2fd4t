import { ShoppingCart } from "lucide-react";

export default function Hero({ onStartOrder }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center text-center bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 px-6 py-20">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          سفارش آنلاین کترینگ
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed">
          منوی روز را ببینید، آیتم‌ها را به سبد اضافه کنید و سفارش‌تان را به سادگی ثبت کنید.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onStartOrder} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
            <ShoppingCart className="w-5 h-5" />
            شروع سفارش
          </button>
        </div>
      </div>
    </section>
  );
}
