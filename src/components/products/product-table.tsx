"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/api/products";
import type { ProductRecord } from "@/lib/products";

type ProductTableProps = {
  products: ProductRecord[];
  showActions?: boolean;
};

export function ProductTable({ products, showActions = false }: ProductTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (productId: number) => {
    if (deletingId !== null) return;
    setDeletingId(productId);
    try {
      await deleteProduct(productId);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-400">
        暂无商品数据。
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10 text-left">
        <thead className="bg-slate-900/80 text-sm uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-4">商品名称</th>
            <th className="px-4 py-4">分类</th>
            <th className="px-4 py-4">价格</th>
            <th className="px-4 py-4">库存</th>
            <th className="px-4 py-4">描述</th>
            {showActions ? <th className="px-4 py-4">操作</th> : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-slate-900/60 text-sm text-slate-200">
          {products.map((product) => (
            <tr key={product.id} className="align-top transition hover:bg-white/5">
              <td className="px-4 py-4 font-medium text-white">{product.name}</td>
              <td className="px-4 py-4 text-cyan-300">{product.category}</td>
              <td className="px-4 py-4">¥{product.price.toFixed(2)}</td>
              <td className="px-4 py-4">{product.stock}</td>
              <td className="px-4 py-4 text-slate-300">{product.description}</td>
              {showActions ? (
                <td className="px-4 py-4">
                  <button
                    disabled={deletingId === product.id}
                    onClick={() => void handleDelete(product.id)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-slate-200 transition hover:border-rose-400/40 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === product.id ? "删除中..." : "删除"}
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
