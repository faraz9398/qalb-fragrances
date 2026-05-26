import { Product } from "@/types";
import {
  getProducts as fetchSanityProducts,
  getProductBySlug as fetchSanityProductBySlug,
} from "./sanity";
import { products as localProducts } from "@/data/products";

function toProduct(raw: any): Product {
  return {
    id: raw._id ?? raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description || "",
    price: raw.price,
    salePrice: raw.salePrice,
    images: raw.images || [],
    category: raw.category || "",
    inStock: raw.inStock ?? true,
    featured: raw.featured ?? false,
    volume: raw.volume,
    notes: raw.notes,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const data = await fetchSanityProducts();
    if (data && data.length > 0) return data.map(toProduct);
  } catch {}
  return localProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await fetchSanityProductBySlug(slug);
    if (data) return toProduct(data);
  } catch {}
  return localProducts.find((p) => p.slug === slug) || null;
}

export function getCategories(products: Product[]): string[] {
  const set = new Set(products.map((p) => p.category).filter(Boolean));
  return ["All", ...set];
}
