"use client";

import Link from "next/link";
import { Check, Package, ShoppingBag } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

export default function OrderConfirmationPage() {
  const { orderId, shipping } = useCheckout();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <Check size={32} className="text-green-500" />
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl text-qalb-black mb-2">
          Thank You, {shipping.firstName}!
        </h1>
        <p className="text-sm sm:text-base text-qalb-black/50 mb-6">
          Your order has been placed successfully.
        </p>

        {orderId && (
          <div className="bg-qalb-black/5 rounded-lg p-4 mb-6 inline-block">
            <p className="text-xs text-qalb-black/40 uppercase tracking-wider">Order Reference</p>
            <p className="font-mono text-sm sm:text-base font-semibold text-qalb-black mt-1">{orderId}</p>
          </div>
        )}

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm text-left mb-6 sm:mb-8">
          <h3 className="font-heading text-base sm:text-lg text-qalb-black mb-3">Shipping Details</h3>
          <div className="text-sm text-qalb-black/60 space-y-1">
            <p>{shipping.firstName} {shipping.lastName}</p>
            <p>{shipping.address}</p>
            <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
            <p>{shipping.email}</p>
            <p>{shipping.phone}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase font-semibold rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-qalb-black/10 text-qalb-black/60 text-sm tracking-wider uppercase rounded-md hover:border-qalb-black/30 transition-all"
          >
            <Package size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
