import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-qalb-cream">
      <span className="font-heading text-8xl sm:text-9xl text-qalb-black/10">404</span>
      <h1 className="font-heading text-2xl sm:text-3xl text-qalb-black mt-4 mb-2">
        Page Not Found
      </h1>
      <p className="text-qalb-black/50 text-sm sm:text-base mb-6 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
