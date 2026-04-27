import { NextResponse } from "next/server";
import { addProduct, listProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await listProducts();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "获取商品失败" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const name = String(body?.name ?? "").trim();
    const category = String(body?.category ?? "").trim();
    const description = String(body?.description ?? "").trim();
    const price = Number(body?.price);
    const stock = Number(body?.stock);

    if (!name || !category || !description || Number.isNaN(price) || Number.isNaN(stock)) {
      return NextResponse.json({ error: "请填写完整的商品信息" }, { status: 400 });
    }

    const product = await addProduct({ name, category, description, price, stock });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "保存商品失败" },
      { status: 500 },
    );
  }
}
