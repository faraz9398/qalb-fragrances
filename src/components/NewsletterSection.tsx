"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="relative py-16 sm:py-20 bg-qalb-black overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-qalb-gold/2 blur-[100px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {subscribed ? (
          <div className="opacity-0 animate-[fadeInUp_0.5s_ease_forwards]">
            <div className="w-14 h-14 rounded-full bg-qalb-gold/10 flex items-center justify-center mx-auto mb-4">
              <Send size={22} className="text-qalb-gold" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-qalb-cream mb-2">
              You&apos;re In!
            </h3>
            <p className="text-qalb-cream/50 text-sm sm:text-base">
              Welcome to the Qalb family. Expect exclusives and first looks.
            </p>
          </div>
        ) : (
          <>
            <span className="text-qalb-gold/60 text-xs tracking-[0.2em] uppercase font-body">
              Stay Connected
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-qalb-cream mt-2 mb-2">
              Join the Inner Circle
            </h3>
            <p className="text-qalb-cream/50 text-sm sm:text-base mb-6">
              Be the first to know about new drops, exclusive offers, and fragrance stories.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-qalb-dark border border-qalb-cream/10 rounded-md text-qalb-cream text-sm placeholder-qalb-cream/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-qalb-gold text-qalb-black text-sm font-semibold rounded-md hover:bg-qalb-gold-light transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Send size={15} />
                Subscribe
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
