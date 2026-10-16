import { ProductStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProductDTO } from "@/types/product";

const productInclude = {
  images: { orderBy: { sortOrder: "asc" as const } },
  categories: { include: { category: true } },
  inventory: true,
} satisfies Prisma.ProductInclude;

type ProductWithRelations = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

export function toProductDTO(product: ProductWithRelations): ProductDTO {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    brand: product.brand,
    format: product.format,
    shortDescription: product.shortDescription,
    description: product.description,
    composition: product.composition,
    nutritionInfo: product.nutritionInfo,
    usageInfo: product.usageInfo,
    precautions: product.precautions,
    priceMinor: product.priceMinor,
    currency: product.currency,
    isDemo: product.isDemo,
    featured: product.featured,
    category: product.categories[0]
      ? { name: product.categories[0].category.name, slug: product.categories[0].category.slug }
      : null,
    images: product.images.map(({ url, alt }) => ({ url, alt })),
    stock: Math.max(0, (product.inventory?.quantity ?? 0) - (product.inventory?.reserved ?? 0)),
  };
}

export async function getProducts() {
  const products = await prisma.product.findMany({
    where: { status: ProductStatus.ACTIVE },
    include: productInclude,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return products.map(toProductDTO);
}

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { status: ProductStatus.ACTIVE, featured: true },
    include: productInclude,
    take: 3,
    orderBy: { createdAt: "asc" },
  });
  return products.map(toProductDTO);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug, status: ProductStatus.ACTIVE },
    include: productInclude,
  });
  return product ? toProductDTO(product) : null;
}

export async function getCategoryProducts(slug: string) {
  const products = await prisma.product.findMany({
    where: {
      status: ProductStatus.ACTIVE,
      categories: { some: { category: { slug } } },
    },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });
  return products.map(toProductDTO);
}
