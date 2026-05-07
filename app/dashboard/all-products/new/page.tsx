"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    sku: "",
    stock_qty: "",
    regular_price: "",
    sale_price: "",
    tags: "",
    imageUrl: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    const { error } = await supabase.from("products").insert({
      name: form.name,
      description: form.description,
      category: form.category,
      brand: form.brand,
      sku: form.sku,
      stock_qty: Number(form.stock_qty || 0),
      regular_price: Number(form.regular_price || 0),
      sale_price: Number(form.sale_price || 0),
      tags: String(form.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageurl: form.imageUrl,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard/all-products");
    router.refresh();
  };

  return (
    <div className="px-4 sm:px-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <p className="text-sm text-black/60">Home &gt; All Products &gt; Add New Product</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <input name="name" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea name="description" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-28" />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <input name="category" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="text-sm font-medium">Brand Name</label>
              <input name="brand" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">SKU</label>
                <input name="sku" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Stock Quantity</label>
                <input name="stock_qty" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Regular Price</label>
                <input name="regular_price" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Sale Price</label>
                <input name="sale_price" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <input name="tags" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="text-sm font-medium">Image URL</label>
              <input name="imageUrl" onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>

            <button onClick={onSubmit} className="bg-black text-white text-sm px-5 py-2 rounded-md">
              SAVE
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 h-40" />
        </div>
      </div>
    </div>
  );
}