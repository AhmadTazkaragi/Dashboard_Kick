"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        stock_qty: Number(form.stock_qty || 0),
        regular_price: Number(form.regular_price || 0),
        sale_price: Number(form.sale_price || 0),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    router.push("/dashboard/all-products");
  };

  return (
    <div className="px-4 sm:px-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <p className="text-sm text-black/60">Home &gt; All Products &gt; Add New Product</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Left Form */}
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

            <button
              onClick={onSubmit}
              className="bg-black text-white text-sm px-5 py-2 rounded-md"
            >
              SAVE
            </button>
          </div>

          {/* Right Gallery */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-40">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&auto=format&fit=crop"
                alt="Product"
                width={300}
                height={200}
                className="object-contain"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Product Gallery</h3>
              <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center text-xs text-gray-500">
                Drop your image here, or browse
                <br />Jpeg, png are allowed
              </div>
            </div>

            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-lg p-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg" />
                  <div className="flex-1 text-xs text-gray-600">Product thumbnail.png</div>
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">✓</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button className="bg-red-600 text-white text-xs px-6 py-2 rounded-md">DELETE</button>
              <button className="border border-gray-300 text-xs px-6 py-2 rounded-md">CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}