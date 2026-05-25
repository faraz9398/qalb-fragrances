import Link from "next/link";
import { Heart } from "lucide-react";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-qalb-black text-qalb-cream/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-qalb-gold rounded-full" />
              <span className="font-heading text-xl text-qalb-cream tracking-wider">
                QALB
              </span>
            </div>
            <p className="text-sm leading-relaxed text-qalb-cream/50">
              Fine Fragrances. Familiar Souls.
              <br />
              Premium inspired perfumery crafted for those who seek distinction.
            </p>
          </div>

          <div>
            <h4 className="text-qalb-cream text-xs tracking-[0.15em] uppercase mb-4 font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm hover:text-qalb-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-qalb-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm hover:text-qalb-gold transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-qalb-cream text-xs tracking-[0.15em] uppercase mb-4 font-semibold">
              Policies
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm cursor-default">Shipping Policy</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Exchange Policy</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Refund & Return Policy</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Privacy Policy</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-qalb-cream text-xs tracking-[0.15em] uppercase mb-4 font-semibold">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-qalb-cream/20 flex items-center justify-center hover:border-qalb-gold hover:text-qalb-gold transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-qalb-cream/20 flex items-center justify-center hover:border-qalb-gold hover:text-qalb-gold transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-qalb-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} The Qalb Fragrances. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400" /> by Qalb
          </p>
        </div>
      </div>
    </footer>
  );
}
