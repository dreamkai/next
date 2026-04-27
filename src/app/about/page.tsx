import { listProducts } from "@/lib/products";
import { ProductTable } from "@/components/products/product-table";

export default async function AboutPage() {
  const products = await listProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
              About
            </span>
            <h1 className="text-3xl font-semibold text-white">商品列表展示</h1>
            <p className="text-sm text-slate-400">当前数据来自 MySQL，共 {products.length} 条记录。</p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10">
          <ProductTable products={products} />
        </section>
      </div>
    </main>
  );
}
