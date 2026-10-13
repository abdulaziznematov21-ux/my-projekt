
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { productId } = await params;

  try {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products/${productId}`
    );

    if (!res.ok) {
      return {
        title: "Mahsulot topilmadi | Nursulton",
        description: "Ushbu mahsulot haqida ma'lumot topilmadi.",
      };
    }

    const post = await res.json();

    return {
      title: `${post.title} | Nursulton`,
      description: post.description,
    };
  } catch {
    return {
      title: "Nursulton | Onlayn do'kon",
      description: "Eng sara mahsulotlar",
    };
  }
}

export default async function SinglePage({ params }) {
  const { productId } = await params;

  let product = null;

  try {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products/${productId}`
    );

    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Mahsulotni olishda xatolik:", error);
  }

  if (!product || !product.id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Mahsulot topilmadi</h2>
        <Link
          href="/products"
          className="text-indigo-600 underline"
        >
          ← Orqaga qaytish
        </Link>
      </div>
    );
  }

  const image =
    product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : "https://placehold.co/500x500?text=Product";

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
      <Link
        href="/products"
        className="inline-block mb-6 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
      >
        ← Orqaga qaytish
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl border border-gray-200 shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-center">
          <img
            src={image}
            alt={product.title}
            className="w-full h-80 object-contain rounded-2xl"
          />
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-wider text-indigo-600 font-semibold">
              {product.category?.name || "Kategoriya"}
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">
              {product.title}
            </h1>

            <p className="text-gray-600 leading-7 mt-4">
              {product.description}
            </p>
          </div>

          <div className="border-t pt-5 flex items-center justify-between gap-4">
            <span className="text-3xl font-extrabold text-indigo-600">
              ${product.price}
            </span>

            <button
              type="button"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Savatga qo'shish
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
