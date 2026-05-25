import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-qalb-black">
      <div className="absolute inset-0 bg-gradient-to-br from-qalb-black via-qalb-dark to-qalb-black" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-qalb-gold/3 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-qalb-gold/2 blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease_forwards]">
          <span className="inline-block text-qalb-gold/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-6 font-body">
            Fine Fragrances. Familiar Souls.
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-qalb-cream leading-tight mb-4 sm:mb-6">
            The Essence of
            <br />
            <span className="text-qalb-gold">Distinction</span>
          </h1>
          <p className="text-qalb-cream/50 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Premium inspired perfumery crafted for those who seek the extraordinary.
            Discover scents that tell your story.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-qalb-gold text-qalb-black text-sm tracking-wider uppercase font-semibold rounded-md hover:bg-qalb-gold-light transition-all duration-300"
            >
              Explore Collection
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-qalb-cream/20 text-qalb-cream text-sm tracking-wider uppercase rounded-md hover:border-qalb-gold/50 hover:text-qalb-gold transition-all duration-300"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full border border-qalb-cream/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-qalb-gold/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
