import request from "@/lib/request";
import type { CreateProductPayload } from "@/types/products";

export const createProduct = (data: CreateProductPayload) => {
  return request.post("/api/products", data);
};

export const deleteProduct = (id: number) => {
  return request.delete(`/api/products/${id}`);
};

