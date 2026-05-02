import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

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

export async function GET() {
  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body?.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const products = await readProducts();
  const newProduct: Product = {
    id: randomUUID(),
    name: body.name,
    description: body.description || "",
    category: body.category || "",
    brand: body.brand || "",
    sku: body.sku || "",
    stock_qty: Number(body.stock_qty || 0),
    regular_price: Number(body.regular_price || 0),
    sale_price: Number(body.sale_price || 0),
    tags: Array.isArray(body.tags) ? body.tags : [],
    imageUrl: body.imageUrl || "",
    created_at: new Date().toISOString(),
  };

  products.unshift(newProduct);
  await writeProducts(products);

  return NextResponse.json(newProduct, { status: 201 });
}