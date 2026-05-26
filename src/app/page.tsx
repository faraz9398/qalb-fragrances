import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import NewsletterSection from "@/components/NewsletterSection";
import { getAllProducts } from "@/lib/products";

export default async function Home() {
  const products = await getAllProducts();
  const featuredProducts = products.filter((p) => p.featured);
  const allProducts = products;

  return (
    <>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-qalb-gold text-xs tracking-[0.2em] uppercase font-body">
            Curated Selection
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-qalb-black mt-2">
            Featured Fragrances
          </h2>
          <div className="w-12 h-0.5 bg-qalb-gold/40 mx-auto mt-4" />
        </div>
        <ProductGrid products={featuredProducts} />
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-qalb-black/60 hover:text-qalb-gold transition-colors font-semibold"
          >
            View All Products
            <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

      {allProducts.length > 0 && (
        <section className="bg-qalb-black/5 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <span className="text-qalb-gold text-xs tracking-[0.2em] uppercase font-body">
                  Our Story
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-qalb-black mt-2 mb-4">
                  Fine Fragrances. <br />
                  <span className="text-qalb-gold">Familiar Souls.</span>
                </h2>
                <p className="text-qalb-black/60 text-sm sm:text-base leading-relaxed">
                  Imagine if each fragrance is a carefully crafted symphony of notes that
                  tells a story — your story. We believe that the power of scent goes
                  beyond the senses; it touches the soul, evoking emotions that words often
                  fail to express.
                </p>
                <p className="text-qalb-black/60 text-sm sm:text-base leading-relaxed mt-3">
                  In a bottle of QALB, you don&apos;t just find a fragrance; you find a
                  piece of yourself, a reminder of the magic in the simplest of moments.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-qalb-black/10">
                  <Image src={allProducts[0]?.images[0] || ""} alt="Qalb Fragrance" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-qalb-black/10 mt-6">
                  <Image src={allProducts[1]?.images[0] || ""} alt="Qalb Fragrance" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-qalb-black/10 -mt-3">
                  <Image src={allProducts[2]?.images[0] || ""} alt="Qalb Fragrance" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-qalb-black/10 mt-3">
                  <Image src={allProducts[3]?.images[0] || ""} alt="Qalb Fragrance" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </>
  );
}
