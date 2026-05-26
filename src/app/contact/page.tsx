"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-qalb-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-[fadeInUp_0.5s_ease_forwards]">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-green-600" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl text-qalb-black mb-2">Message Sent!</h1>
          <p className="text-qalb-black/50 text-sm sm:text-base">
            Thank you for reaching out. We&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-6 text-sm text-qalb-gold hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qalb-cream">
      <div className="bg-qalb-black py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-qalb-cream">Get in Touch</h1>
          <p className="text-qalb-cream/50 text-sm sm:text-base mt-1">We&apos;d love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="px-4 py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="px-4 py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
              />
              <textarea
                placeholder="Your Message *"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase font-semibold rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-heading text-lg text-qalb-black mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-qalb-gold mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-qalb-black/80">Email</p>
                    <a href="mailto:hello@qalbfragrances.com" className="text-sm text-qalb-black/50 hover:text-qalb-gold transition-colors">
                      hello@qalbfragrances.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-qalb-gold mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-qalb-black/80">Phone</p>
                    <p className="text-sm text-qalb-black/50">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-qalb-gold mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-qalb-black/80">Location</p>
                    <p className="text-sm text-qalb-black/50">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-qalb-black rounded-xl p-6 shadow-sm">
              <h3 className="font-heading text-lg text-qalb-cream mb-2">Stay Connected</h3>
              <p className="text-sm text-qalb-cream/50">
                Follow us on social media for the latest drops, offers, and fragrance stories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
