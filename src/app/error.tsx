"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-400 text-2xl">!</span>
        </div>
        <h1 className="font-heading text-xl sm:text-2xl text-qalb-black mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-qalb-black/50 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
