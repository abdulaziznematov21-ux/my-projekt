import React from 'react';

export const metadata = {
  title: "nursulton ",
  description: "Eng sara ",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Biz haqimizda <span className="text-blue-600">(About)</span>
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Bu yerda bizning kompaniya haqida ma'lumotlar bo'ladi.
        </p>
      </div>
    </div>
  );
}