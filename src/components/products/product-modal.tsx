"use client";

import { useState, type FormEvent } from "react";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  description: "",
};

type Props = {
  open: boolean;
  saving: boolean;
  message: string;
  onClose: () => void;
  onSubmit: (payload: {
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
  }) => Promise<boolean>;
};

export function ProductModal({ open, saving, message, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isSuccess = await onSubmit({
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim(),
    });
    if (isSuccess) {
      setForm(emptyForm);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/40">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-cyan-300">页面内弹窗</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">新增商品</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            关闭
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 md:col-span-1">
            <span className="text-sm text-slate-300">商品名称</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60"
            />
          </label>
          <label className="grid gap-2 md:col-span-1">
            <span className="text-sm text-slate-300">分类</span>
            <input
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">价格</span>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">库存</span>
            <input
              type="number"
              min="0"
              step="1"
              required
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60"
            />
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm text-slate-300">商品描述</span>
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60"
            />
          </label>

          {message ? <p className="md:col-span-2 text-sm text-cyan-300">{message}</p> : null}

          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              取消
            </button>
            <button
              disabled={saving}
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "保存中..." : "保存商品"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
