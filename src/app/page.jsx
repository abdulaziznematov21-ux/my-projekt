"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";

import { PlusCircle, ShoppingBag, DollarSign, Image as ImageIcon, Trash2, Sparkles } from "lucide-react";
import { api } from "../../convex/_generated/api";

export default function HomePage() {
  const products = useQuery(api.products.getProducts);
  const addProduct = useMutation(api.products.addProduct);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);

  // Noutbukdan rasmni o'qib, Base64 formatga o'tkazish
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    setLoading(true);
    try {
      await addProduct({
        title,
        price: Number(price),
        description,
        imageUrl: imageBase64,
      });

      // Formani tozalash
      setTitle("");
      setPrice("");
      setDescription("");
      setImageBase64("");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden">
      
      {/* Orqa fon uchun yorug'lik effektlari (Ambient Glow) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 pt-12 relative z-10">
        
        {/* Sarlavha qismi */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4 backdrop-blur-md">
            <Sparkles size={16} /> Premium Katalog Boshqaruvi
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            Mahsulotlar Vitrini
          </h1>
          <p className="text-slate-400 mt-2 max-w-lg mx-auto">
            Eng sara mahsulotlaringizni qo'shing, noutbukdan rasmlarini yuklang va real vaqt rejimida boshqaring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chap qism: Mahsulot qo'shish formasi */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl shadow-2xl sticky top-8">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-indigo-300">
                <PlusCircle size={22} /> Yangi Mahsulot
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Mahsulot nomi</label>
                  <input
                    type="text"
                    placeholder="Masalan: MacBook Pro M3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Narxi ($)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-slate-500 text-sm">$</span>
                    <input
                      type="number"
                      placeholder="1299"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Tavsifi</label>
                  <textarea
                    placeholder="Mahsulot haqida qisqacha ma'lumot..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-600 resize-none"
                  />
                </div>

                {/* Noutbukdan rasm yuklash */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Rasm yuklash (Noutbukdan)</label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 cursor-pointer bg-slate-950/30 transition-all group">
                    <ImageIcon className="text-slate-500 group-hover:text-indigo-400 mb-1 transition-colors" size={24} />
                    <span className="text-xs text-slate-400 group-hover:text-slate-300">
                      {imageBase64 ? "Rasm tanlandi (O'zgartirish)" : "Kompyuterdan rasm tanlang"}
                    </span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  {imageBase64 && (
                    <div className="mt-2 relative w-full h-20 rounded-lg overflow-hidden border border-slate-800">
                      <img src={imageBase64} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Qo'shilmoqda..." : "Mahsulotni Qo'shish"}
                </button>
              </form>
            </div>
          </div>

          {/* O'ng qism: Mahsulotlar Kartochkalari (Cards) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="text-indigo-400" size={24} /> Mahsulotlar Ro'yxati
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
                {products ? `${products.length} ta mahsulot` : "Yuklanmoqda..."}
              </span>
            </div>

            {products === undefined ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 4].map((n) => (
                  <div key={n} className="bg-slate-900/40 border border-slate-800/60 rounded-3xl h-72 animate-pulse"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-12 text-center">
                <ShoppingBag size={48} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-400 font-medium">Hozircha hech qanday mahsulot mavjud emas.</p>
                <p className="text-slate-600 text-sm mt-1">Chap tarafdagi forma orqali birinchi mahsulotingizni qo'shing!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Rasm qismi */}
                      <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-700">
                            <ImageIcon size={40} />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-indigo-400 font-bold text-sm shadow-lg">
                          ${item.price}
                        </div>
                      </div>

                      {/* Ma'lumot qismi */}
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Pastki qismi (Footer info) */}
                    <div className="px-5 pb-5 pt-2 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-500">
                      <span>ID: {item._id.slice(-6)}</span>
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-medium">Mavjud</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}