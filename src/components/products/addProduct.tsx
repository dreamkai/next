"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/api/products";
import { ProductModal } from "@/components/products/product-modal";
import type { CreateProductPayload } from "@/types/products";

export function AddProduct() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (payload: CreateProductPayload) => {
    setSaving(true);
    setMessage("");

    try {
      await createProduct(payload);

      setMessage("商品已新增。");
      setIsModalOpen(false);
      router.refresh();
      return true;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "提交失败");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
      >
        新增商品
      </button>

      <ProductModal
        open={isModalOpen}
        saving={saving}
        message={message}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}