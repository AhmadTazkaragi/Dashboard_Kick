import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Product = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  brand?: string;
  sku?: string;
  stock_qty?: number;
  regular_price?: number;
  sale_price?: number;
  tags?: string[];
  imageUrl?: string;
  created_at?: string;
};

const dataPath = path.join(process.cwd(), "data", "products.json");

async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

async function writeProducts(products: Product[]) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}

// ⚠️ لاحظ إضافة Promise وانتظارها
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // هنا الحل
  const products = await readProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // هنا الحل
  const body = await req.json();
  const products = await readProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  products[idx] = {
    ...products[idx],
    ...body,
    stock_qty: Number(body.stock_qty ?? products[idx].stock_qty ?? 0),
    regular_price: Number(body.regular_price ?? products[idx].regular_price ?? 0),
    sale_price: Number(body.sale_price ?? products[idx].sale_price ?? 0),
    tags: Array.isArray(body.tags) ? body.tags : products[idx].tags || [],
  };

  await writeProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // هنا الحل
  const products = await readProducts();
  const next = products.filter((p) => p.id !== id);
  await writeProducts(next);
  return NextResponse.json({ ok: true });
}