import { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Menu({ onAdd }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API}/api/menu`);
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-600">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> در حال بارگذاری منو...
      </div>
    );
  }

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">منوی امروز</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
            {it.image_url && (
              <img src={it.image_url} alt={it.title} className="h-40 w-full object-cover rounded-lg" />
            )}
            <div className="flex-1 mt-3">
              <h3 className="text-lg font-semibold text-gray-900">{it.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{it.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold text-orange-600">{it.price.toLocaleString()} تومان</span>
                <button onClick={() => onAdd(it)} className="inline-flex items-center gap-1 bg-gray-900 hover:bg-black text-white px-3 py-1.5 rounded-lg">
                  <Plus className="w-4 h-4" /> افزودن
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
