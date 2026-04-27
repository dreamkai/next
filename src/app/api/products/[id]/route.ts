import { NextResponse } from "next/server";
import { removeProduct } from "@/lib/products";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json({ error: "无效的商品 ID" }, { status: 400 });
    }

    const deleted = await removeProduct(productId);
    if (!deleted) {
      return NextResponse.json({ error: "商品不存在" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "删除商品失败" },
      { status: 500 },
    );
  }
}
