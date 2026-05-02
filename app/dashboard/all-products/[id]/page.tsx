"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
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
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) return;

      setForm({
        ...emptyForm,
        ...data,
        tags: Array.isArray(data?.tags) ? data.tags.join(", ") : data?.tags || "",
      });
    })();
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    if (!id) return;

    const payload = {
      ...form,
      stock_qty: Number(form.stock_qty || 0),
      regular_price: Number(form.regular_price || 0),
      sale_price: Number(form.sale_price || 0),
      tags: String(form.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) {
      alert("حدث خطأ أثناء التعديل");
      return;
    }

    router.push("/dashboard/all-products");
    router.refresh();
  };

  const onDelete = async () => {
    if (!id) return;
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("حدث خطأ أثناء الحذف");
      return;
    }

    router.push("/dashboard/all-products");
    router.refresh();
  };

  if (!form) return null;

  return (
    <div className="px-4 sm:px-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-sm text-black/60">Home &gt; All Products &gt; Edit</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input name="name" value={form.name} onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea name="description" value={form.description || ""} onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-28" />
          </div>

          <div>
            <label className="text-sm font-medium">Image URL</label>
            <input name="imageUrl" value={form.imageUrl || ""} onChange={onChange} className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onSubmit} className="bg-black text-white text-sm px-5 py-2 rounded-md">
              SAVE CHANGES
            </button>
            <button onClick={onDelete} className="bg-red-600 text-white text-sm px-5 py-2 rounded-md">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}