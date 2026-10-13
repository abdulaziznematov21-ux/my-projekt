"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-lg font-medium text-slate-400 animate-pulse">Yuklanmoqda...</p>
      </div>
    );
  }

  

  return (
    <main className="min-h-screen bg-white text-slate-900 max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black border-b border-slate-100 pb-4">
        Bizning Mahsulotlar
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            href={`/products/${product.id}`}
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-black hover:shadow-lg flex flex-col justify-between group cursor-pointer block"
          >
            <div className="relative h-48 w-full overflow-hidden bg-white">
              <img 
                src={product.images?.[0]} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
              />
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between bg-white border-t border-slate-100">
              <h3 className="font-semibold text-slate-900 text-base line-clamp-1 mb-2 group-hover:text-black transition-colors">
                {product.title}
              </h3>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-black">
                  ${product.price}
                </span>
                <span className="text-xs text-black font-semibold bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                  Batafsil →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}