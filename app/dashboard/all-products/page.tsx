"use client";

import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: string;
  name: string;
  type?: string;
  regular_price?: number;
  sale_price?: number;
  sales?: number;
  remaining?: number;
  imageUrl?: string;
  category?: string;
  brand?: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("Delete failed");
      return;
    }
    setOpenId(null);
    load();
  };

  return (
    <div className="px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-sm text-black/60">Home &gt; All Products</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              className="outline-none text-sm placeholder:text-gray-400 w-40"
              placeholder="Search"
            />
          </div>
          <Link
            href="/dashboard/all-products/new"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Plus size={16} />
            ADD NEW PRODUCT
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#F2F3F5] flex items-center justify-center overflow-hidden">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-500">IMG</span>
                    )}
                  </div>
                  <div className="leading-tight">
                    <h3 className="font-semibold text-sm">{p.name}</h3>
                    <p className="text-xs text-black/60 mt-0.5">
                      {p.category || "Sneaker"}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      {p.sale_price
                        ? `$${p.sale_price.toFixed(2)}`
                        : p.regular_price
                        ? `$${p.regular_price.toFixed(2)}`
                        : "$0.00"}
                    </p>
                  </div>
                </div>

                <button
                  className="p-1 cursor-pointer"
                  onClick={() => setOpenId(openId === p.id ? null : p.id)}
                >
                  <MoreHorizontal size={16} className="text-gray-400" />
                </button>

                {openId === p.id && (
                  <div className="absolute right-3 top-10 bg-white border border-gray-200 rounded-lg shadow-md text-sm z-10">
                    <Link
                      href={`/dashboard/all-products/${p.id}`}
                      className="block px-4 py-2 hover:bg-gray-50"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <h4 className="text-xs font-semibold text-black/70">Summary</h4>
                <p className="text-xs text-black/50 leading-snug mt-1">
                  Long distance running requires a lot from athletes.
                </p>
              </div>

              <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-black/60">Sales</span>
                  <span className="font-semibold">{p.sales ?? 0}</span>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full">
                  <div className="h-1 w-[55%] bg-orange-400 rounded-full" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-black/60">Remaining Products</span>
                  <span className="font-semibold">{p.remaining ?? 0}</span>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full">
                  <div className="h-1 w-[30%] bg-orange-400 rounded-full" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
