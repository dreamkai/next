import { AddProduct } from "@/components/products/addProduct";
import { ProductTable } from "@/components/products/product-table";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await listProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
                商品列表页
              </span>
            
            </div>
        
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">商品列表</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-400">
                共 {products.length} 条记录
              </div>
              <AddProduct />
            </div>
          </div>
          <ProductTable products={products} showActions />
        </section>
      </div>
    </main>
  );
}
