import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Qalb Fragrances | Premium Perfumery",
    template: "%s | The Qalb Fragrances",
  },
  description:
    "Fine Fragrances. Familiar Souls. Discover premium long-lasting perfumes at Qalb Fragrances.",
  openGraph: {
    title: "The Qalb Fragrances | Premium Perfumery",
    description:
      "Fine Fragrances. Familiar Souls. Discover premium long-lasting perfumes.",
    siteName: "The Qalb Fragrances",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-qalb-cream antialiased">
        <CartProvider>
          <CheckoutProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <BackToTop />
            </ToastProvider>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}
