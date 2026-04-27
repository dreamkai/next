import prisma from "@/lib/db";

export type ProductRecord = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
};

type ProductRow = Awaited<ReturnType<typeof prisma.product.findMany>>[number];

export async function listProducts() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return products.map((product: ProductRow) => ({
    ...product,
    price: Number(product.price),
  }));
}

export async function addProduct(product: Omit<ProductRecord, "id">) {
  const createdProduct = await prisma.product.create({
    data: product,
  });

  return {
    ...createdProduct,
    price: Number(createdProduct.price),
  };
}

export async function removeProduct(id: number) {
  const result = await prisma.product.deleteMany({
    where: { id },
  });

  return result.count > 0;
}
