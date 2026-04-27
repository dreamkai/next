import type { ProductRecord } from "@/lib/products";

export type CreateProductPayload = Omit<ProductRecord, "id">;

