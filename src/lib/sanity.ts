import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { env } from "./env";

export const client = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  apiVersion: env.SANITY_API_VERSION,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

export async function getProducts() {
  return client.fetch(`*[_type == "product"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    salePrice,
    "images": images[].asset->url,
    category,
    volume,
    inStock,
    featured,
    seoTitle,
    seoDescription
  }`);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      salePrice,
      "images": images[].asset->url,
      category,
      volume,
      inStock,
      featured,
      seoTitle,
      seoDescription
    }`,
    { slug }
  );
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getPage(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  );
}
